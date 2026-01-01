'use client';

// ===================================
// AlgoQuest - Progress Context
// React context for global state management
// ===================================

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
    UserProgress,
    loadProgress,
    saveProgress,
    defaultProgress,
    updateStreak,
    addXP,
    checkAchievements,
    scheduleResolve,
    ProblemProgress,
    Postmortem,
    MockInterview
} from './storage';
import { XP_VALUES } from '@/data/curriculum';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface ProgressContextType {
    user: User | null;
    progress: UserProgress;
    isLoading: boolean;

    // Profile
    setProfile: (name: string, track: '2-week' | '3-week', language: string) => void;

    // Navigation
    setCurrentWeek: (week: number) => void;
    setCurrentDay: (day: number) => void;
    completeWeek: (week: number) => void;

    // Problems
    markProblemSolved: (problemId: string, difficulty: 'easy' | 'medium' | 'hard', timeSpent: number, firstAttempt: boolean) => void;
    markResolve: (problemId: string, success: boolean) => void;

    // Postmortems
    addPostmortem: (postmortem: Omit<Postmortem, 'id'>) => void;

    // Mock interviews
    addMockInterview: (mock: Omit<MockInterview, 'id'>) => void;

    // Daily log
    logDaily: (energyScore: number) => void;
    markDayComplete: (weekId: number, dayId: number, completed: boolean) => void; // [NEW]
    markVideoWatched: (topicId: string, watched: boolean) => void; // [NEW]

    // Gamification events
    lastAchievement: string | null;
    lastLevelUp: number | null;
    clearNotifications: () => void;

}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState<UserProgress>(defaultProgress);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [lastAchievement, setLastAchievement] = useState<string | null>(null);
    const [lastLevelUp, setLastLevelUp] = useState<number | null>(null);

    // Ref to track the last processed user ID to avoid stale closure issues
    const lastProcessedUserId = React.useRef<string | undefined>(undefined);

    // 1. Initialize Auth and Data
    useEffect(() => {
        // Safety timeout: unique ID to clear if auth loads fast
        const safetyTimer = setTimeout(() => {
            setIsLoading(prev => {
                if (prev) {
                    console.warn('Auth listener timed out, forcing unlock');
                    return false;
                }
                return prev;
            });
        }, 8000);

        // We use onAuthStateChange as the SINGLE source of truth
        // This handles both initial load (INITIAL_SESSION) and subsequent changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            console.log('Auth state changed:', _event);
            const newUser = session?.user || null;

            // OPTIMIZATION: Check against REF, not state (which is stale in this closure)
            // If user ID hasn't changed, skip re-fetch.
            if (newUser?.id === lastProcessedUserId.current && _event !== 'INITIAL_SESSION') {
                console.log('Auth changed but user is same (Ref Check), skipping re-fetch');
                return;
            }

            // Update the ref
            lastProcessedUserId.current = newUser?.id;

            setUser(newUser);

            // CRITICAL: Re-fetch the correct user's data on auth change
            setIsLoading(true);
            let newProgress = defaultProgress;

            try {
                if (newUser) {
                    // Fetch with 2s timeout to prevent hanging
                    const fetchPromise = supabase
                        .from('user_progress')
                        .select('data')
                        .eq('user_id', newUser.id)
                        .single();

                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), 15000)
                    );

                    let data = null;
                    try {
                        const result = await Promise.race([fetchPromise, timeoutPromise]) as any;
                        data = result.data;
                    } catch (e) {
                        console.warn('Supabase fetch timed out or failed, falling back to local:', e);
                    }

                    if (data && data.data && data.data.xp > 0) {
                        console.log('Auth changed: Loaded progress from Cloud for user:', newUser.id);
                        // Merge with defaultProgress to ensure all fields exist
                        newProgress = {
                            ...defaultProgress,
                            ...data.data,
                            completedDays: data.data.completedDays || {},
                            watchedVideos: data.data.watchedVideos || {}
                        };
                    } else {
                        // Cloud Empty or Missing: Check for local data
                        console.log('Auth changed: Cloud data empty or missing. Checking local...');
                        const local = loadProgress();

                        if (local.xp > 0) {
                            console.log('Auth changed: Found local data, syncing to Cloud (Healing)');
                            newProgress = local;
                            await supabase
                                .from('user_progress')
                                .upsert({ user_id: newUser.id, data: local });
                        } else if (data && data.data) {
                            // Stick with empty cloud data if no local data
                            newProgress = data.data;
                        } else {
                            // Totally new user
                            await supabase
                                .from('user_progress')
                                .insert({ user_id: newUser.id, data: newProgress });
                        }
                    }
                } else {
                    // Signed out - reset to localStorage (guest mode)
                    console.log('Auth changed: Signed out, loading local progress');
                    newProgress = loadProgress();
                }

                setProgress(newProgress);
            } catch (err) {
                console.error('Auth change error:', err);
            } finally {
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 2. Save Progress (Cloud AND Local for backup)
    useEffect(() => {
        if (!isLoading) {
            // ALWAYS save to local storage as a backup cache
            // This ensures that if cloud fetch fails/times out, we have data to fallback to
            saveProgress(progress);

            if (user) {
                // LOGGED IN: Sync to cloud as well
                const sync = async () => {
                    const { error } = await supabase
                        .from('user_progress')
                        .upsert({
                            user_id: user.id,
                            data: progress,
                            updated_at: new Date().toISOString()
                        });
                    if (error) {
                        console.error('Supabase Sync Error:', error);
                    } else {
                        console.log('Progress synced to cloud for user:', user.id);
                    }
                };
                sync();
            }
        }
    }, [progress, isLoading, user]);

    const setProfile = useCallback((name: string, track: '2-week' | '3-week', language: string) => {
        setProgress(prev => ({
            ...prev,
            profile: {
                ...prev.profile,
                name,
                preferredTrack: track,
                language,
                startDate: prev.profile.startDate || new Date().toISOString()
            }
        }));
    }, []);

    const setCurrentWeek = useCallback((week: number) => {
        setProgress(prev => ({ ...prev, currentWeek: week }));
    }, []);

    const setCurrentDay = useCallback((day: number) => {
        setProgress(prev => ({ ...prev, currentDay: day }));
    }, []);

    const completeWeek = useCallback((week: number) => {
        setProgress(prev => {
            if (prev.completedWeeks.includes(week)) return prev;
            return {
                ...prev,
                completedWeeks: [...prev.completedWeeks, week]
            };
        });
    }, []);

    const markProblemSolved = useCallback((
        problemId: string,
        difficulty: 'easy' | 'medium' | 'hard',
        timeSpent: number,
        firstAttempt: boolean
    ) => {
        setProgress(prev => {
            const existing = prev.problems[problemId];
            const isNewSolve = !existing?.solved;

            // Update problem progress
            const newProblem: ProblemProgress = {
                solved: true,
                solvedAt: new Date().toISOString(),
                attempts: (existing?.attempts || 0) + 1,
                timeSpent: (existing?.timeSpent || 0) + timeSpent,
                difficulty,
                firstAttemptSuccess: existing ? existing.firstAttemptSuccess : firstAttempt,
                resolves: existing?.resolves || [],
                nextResolveDate: isNewSolve ? scheduleResolve(new Date().toISOString(), 0) : existing?.nextResolveDate
            };

            let updated: UserProgress = {
                ...prev,
                problems: {
                    ...prev.problems,
                    [problemId]: newProblem
                }
            };

            // Update streak
            updated = updateStreak(updated);

            // Add XP for new solve
            if (isNewSolve) {
                const xpAmount = XP_VALUES[difficulty] + (firstAttempt ? 5 : 0);
                const { progress: xpProgress, leveledUp, newLevel } = addXP(updated, xpAmount);
                updated = xpProgress;

                if (leveledUp && newLevel) {
                    setLastLevelUp(newLevel);
                }
            }

            // Check achievements
            const { progress: achProgress, newAchievements } = checkAchievements(updated);
            updated = achProgress;

            if (newAchievements.length > 0) {
                setLastAchievement(newAchievements[0]);
            }

            return updated;
        });
    }, []);

    const markResolve = useCallback((problemId: string, success: boolean) => {
        setProgress(prev => {
            const existing = prev.problems[problemId];
            if (!existing) return prev;

            const newResolves = [...existing.resolves, { date: new Date().toISOString(), success }];
            const nextResolveDate = success ? scheduleResolve(new Date().toISOString(), newResolves.length) : existing.nextResolveDate;

            let updated: UserProgress = {
                ...prev,
                problems: {
                    ...prev.problems,
                    [problemId]: {
                        ...existing,
                        resolves: newResolves,
                        nextResolveDate
                    }
                }
            };

            // Add XP for re-solve
            if (success) {
                const { progress: xpProgress, leveledUp, newLevel } = addXP(updated, XP_VALUES.resolve);
                updated = xpProgress;
                if (leveledUp && newLevel) {
                    setLastLevelUp(newLevel);
                }
            }

            return updated;
        });
    }, []);

    const addPostmortem = useCallback((postmortem: Omit<Postmortem, 'id'>) => {
        setProgress(prev => {
            const id = `pm-${Date.now()}`;
            let updated: UserProgress = {
                ...prev,
                postmortems: [...prev.postmortems, { ...postmortem, id }]
            };

            // Add XP
            const { progress: xpProgress } = addXP(updated, XP_VALUES.postmortem);
            return xpProgress;
        });
    }, []);

    const addMockInterview = useCallback((mock: Omit<MockInterview, 'id'>) => {
        setProgress(prev => {
            const id = `mock-${Date.now()}`;
            let updated: UserProgress = {
                ...prev,
                mockInterviews: [...prev.mockInterviews, { ...mock, id }]
            };

            // Add XP
            const { progress: xpProgress } = addXP(updated, XP_VALUES.mock);
            updated = xpProgress;

            // Check achievements
            const { progress: achProgress, newAchievements } = checkAchievements(updated);
            if (newAchievements.length > 0) {
                setLastAchievement(newAchievements[0]);
            }

            return achProgress;
        });
    }, []);

    const logDaily = useCallback((energyScore: number) => {
        setProgress(prev => {
            const today = new Date().toISOString().split('T')[0];
            const existingLog = prev.dailyLogs.find(l => l.date === today);

            const todaySolved = Object.values(prev.problems).filter(
                p => p.solvedAt?.startsWith(today)
            ).length;

            const todayTime = Object.values(prev.problems)
                .filter(p => p.solvedAt?.startsWith(today))
                .reduce((acc, p) => acc + p.timeSpent, 0);

            const newLog = {
                date: today,
                problemsSolved: todaySolved,
                timeSpent: todayTime,
                energyScore,
                streakMaintained: prev.streak.current > 0
            };

            if (existingLog) {
                return {
                    ...prev,
                    dailyLogs: prev.dailyLogs.map(l => l.date === today ? newLog : l)
                };
            }

            return {
                ...prev,
                dailyLogs: [...prev.dailyLogs, newLog]
            };
        });
    }, []);

    const markDayComplete = useCallback((weekId: number, dayId: number, completed: boolean) => {
        setProgress(prev => {
            const currentWeekCompleted = prev.completedDays[weekId] || [];
            if (completed && currentWeekCompleted.includes(dayId)) return prev;
            if (!completed && !currentWeekCompleted.includes(dayId)) return prev;

            let newCompletedDays = { ...prev.completedDays };
            if (completed) {
                newCompletedDays[weekId] = [...(newCompletedDays[weekId] || []), dayId];
            } else {
                newCompletedDays[weekId] = newCompletedDays[weekId].filter(d => d !== dayId);
            }

            let updated: UserProgress = {
                ...prev,
                completedDays: newCompletedDays
            };

            // If marking complete, update streak and add XP
            if (completed) {
                updated = updateStreak(updated);
                const { progress: xpProgress, leveledUp, newLevel } = addXP(updated, XP_VALUES.dailyGoal); // Bonus for finishing day
                updated = xpProgress;

                if (leveledUp && newLevel) {
                    setLastLevelUp(newLevel);
                }
            }

            return updated;
        });
    }, []);

    const markVideoWatched = useCallback((topicId: string, watched: boolean) => {
        setProgress(prev => {
            if (prev.watchedVideos[topicId] === watched) return prev;

            let updated: UserProgress = {
                ...prev,
                watchedVideos: {
                    ...prev.watchedVideos,
                    [topicId]: watched
                }
            };

            // Add small XP for watching video
            if (watched) {
                const { progress: xpProgress, leveledUp, newLevel } = addXP(updated, 15); // Small bonus
                updated = xpProgress;

                if (leveledUp && newLevel) {
                    setLastLevelUp(newLevel);
                }
            }

            return updated;
        });
    }, []);

    const clearNotifications = useCallback(() => {
        setLastAchievement(null);
        setLastLevelUp(null);
    }, []);



    return (
        <ProgressContext.Provider value={{
            user,
            progress,
            isLoading,
            setProfile,
            setCurrentWeek,
            setCurrentDay,
            completeWeek,
            markProblemSolved,
            markResolve,
            addPostmortem,
            addMockInterview,
            logDaily,
            markDayComplete,
            markVideoWatched,
            lastAchievement,
            lastLevelUp,
            clearNotifications,

        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}
