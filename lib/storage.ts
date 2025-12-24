// ===================================
// AlgoQuest - localStorage Utilities
// Bulletproof data persistence with export/import
// ===================================

export interface ProblemProgress {
    solved: boolean;
    solvedAt?: string;
    attempts: number;
    timeSpent: number; // minutes
    difficulty: 'easy' | 'medium' | 'hard';
    firstAttemptSuccess: boolean;
    resolves: { date: string; success: boolean }[];
    nextResolveDate?: string;
}

export interface Postmortem {
    id: string;
    problemId: string;
    problemTitle: string;
    date: string;
    pattern: string;
    firstAttempt: string;
    whereIFroze: string;
    correctIdea: string;
    timeComplexity: string;
    spaceComplexity: string;
    edgeCases: string;
    mistakeCategory: 'pattern' | 'implementation' | 'tests' | 'language';
    resolveDates: string[];
}

export interface MockInterview {
    id: string;
    date: string;
    duration: number; // minutes
    problems: string[];
    passed: boolean;
    notes: string;
}

export interface DailyLog {
    date: string;
    problemsSolved: number;
    timeSpent: number;
    energyScore: number; // 1-10
    streakMaintained: boolean;
}

export interface UserProgress {
    version: string;
    exportedAt?: string;

    // Profile
    profile: {
        name: string;
        startDate: string;
        preferredTrack: '2-week' | '3-week';
        language: string;
    };

    // Progress
    currentWeek: number;
    currentDay: number;
    completedWeeks: number[];
    completedDays: Record<number, number[]>; // weekNumber -> [dayNumbers]
    watchedVideos: Record<string, boolean>; // topicId -> watched

    // Gamification
    xp: number;
    level: number;
    streak: {
        current: number;
        longest: number;
        lastActiveDate: string;
        frozenUntil?: string;
    };
    achievements: string[];

    // Problem tracking
    problems: Record<string, ProblemProgress>;

    // Postmortems
    postmortems: Postmortem[];

    // Mock interviews
    mockInterviews: MockInterview[];

    // Daily logs
    dailyLogs: DailyLog[];

    // Topic mastery
    topicMastery: Record<string, {
        level: 'unranked' | 'bronze' | 'silver' | 'gold' | 'platinum';
        problemsSolved: number;
        resolvesCompleted: number;
        firstAttemptRate: number;
    }>;

    // Daily quests
    dailyQuests: {
        date: string;
        quests: { id: string; progress: number; completed: boolean }[];
    };

    // Settings
    settings: {
        soundEnabled: boolean;
        notificationsEnabled: boolean;
        pomodoroLength: number;
        breakLength: number;
    };
}

const STORAGE_KEY = 'algoquest_progress';
const VERSION = '2.0';

// Default progress state
export const defaultProgress: UserProgress = {
    version: VERSION,
    profile: {
        name: '',
        startDate: new Date().toISOString(),
        preferredTrack: '2-week',
        language: 'python'
    },
    currentWeek: 0,
    currentDay: 1,
    completedWeeks: [],
    completedDays: {},
    watchedVideos: {},
    xp: 0,
    level: 1,
    streak: {
        current: 0,
        longest: 0,
        lastActiveDate: ''
    },
    achievements: [],
    problems: {},
    postmortems: [],
    mockInterviews: [],
    dailyLogs: [],
    topicMastery: {},
    dailyQuests: {
        date: new Date().toISOString().split('T')[0],
        quests: []
    },
    settings: {
        soundEnabled: true,
        notificationsEnabled: true,
        pomodoroLength: 50,
        breakLength: 10
    }
};

// Load progress from localStorage
export function loadProgress(): UserProgress {
    if (typeof window === 'undefined') return defaultProgress;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return defaultProgress;

        const parsed = JSON.parse(stored) as UserProgress;

        // Fix corrupted profile.name (if it's an object instead of a string)
        if (parsed.profile && typeof parsed.profile.name === 'object' && parsed.profile.name !== null) {
            const corruptedName = parsed.profile.name as any;
            parsed.profile = {
                ...parsed.profile,
                name: corruptedName.name || corruptedName.toString() || ''
            };
        }

        // Version migration if needed
        if (parsed.version !== VERSION) {
            return migrateProgress(parsed);
        }

        return parsed;
    } catch (error) {
        console.error('Error loading progress:', error);
        return defaultProgress;
    }
}

// Save progress to localStorage
export function saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}



// Migrate old progress versions
function migrateProgress(oldProgress: UserProgress): UserProgress {
    // For now, just merge with defaults
    return {
        ...defaultProgress,
        ...oldProgress,
        version: VERSION
    };
}

// Check and update streak
export function updateStreak(progress: UserProgress): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.streak.lastActiveDate;

    if (!lastActive) {
        // First activity
        return {
            ...progress,
            streak: {
                ...progress.streak,
                current: 1,
                longest: Math.max(1, progress.streak.longest),
                lastActiveDate: today
            }
        };
    }

    const lastDate = new Date(lastActive);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        // Same day, no change
        return progress;
    } else if (diffDays === 1) {
        // Consecutive day
        const newStreak = progress.streak.current + 1;
        return {
            ...progress,
            streak: {
                ...progress.streak,
                current: newStreak,
                longest: Math.max(newStreak, progress.streak.longest),
                lastActiveDate: today
            }
        };
    } else {
        // Streak broken
        return {
            ...progress,
            streak: {
                ...progress.streak,
                current: 1,
                lastActiveDate: today
            }
        };
    }
}

// Add XP and check for level up
export function addXP(progress: UserProgress, amount: number): { progress: UserProgress; leveledUp: boolean; newLevel?: number } {
    const newXP = progress.xp + amount;

    // Calculate new level
    let newLevel = progress.level;
    let xpForNextLevel = Math.floor(100 * Math.pow(1.15, newLevel - 1));

    while (newXP >= xpForNextLevel && newLevel < 50) {
        newLevel++;
        xpForNextLevel = Math.floor(100 * Math.pow(1.15, newLevel - 1));
    }

    const leveledUp = newLevel > progress.level;

    return {
        progress: {
            ...progress,
            xp: newXP,
            level: newLevel
        },
        leveledUp,
        newLevel: leveledUp ? newLevel : undefined
    };
}

// Check for new achievements
export function checkAchievements(progress: UserProgress): { progress: UserProgress; newAchievements: string[] } {
    const newAchievements: string[] = [];
    const existingAchievements = new Set(progress.achievements);

    const totalSolved = Object.values(progress.problems).filter(p => p.solved).length;
    const hardSolved = Object.values(progress.problems).filter(p => p.solved && p.difficulty === 'hard').length;

    // Check various achievements
    if (totalSolved >= 1 && !existingAchievements.has('first-blood')) {
        newAchievements.push('first-blood');
    }
    if (totalSolved >= 10 && !existingAchievements.has('problems-10')) {
        newAchievements.push('problems-10');
    }
    if (totalSolved >= 50 && !existingAchievements.has('problems-50')) {
        newAchievements.push('problems-50');
    }
    if (totalSolved >= 100 && !existingAchievements.has('problems-100')) {
        newAchievements.push('problems-100');
    }
    if (hardSolved >= 1 && !existingAchievements.has('first-hard')) {
        newAchievements.push('first-hard');
    }
    if (progress.streak.current >= 7 && !existingAchievements.has('streak-7')) {
        newAchievements.push('streak-7');
    }
    if (progress.streak.current >= 30 && !existingAchievements.has('streak-30')) {
        newAchievements.push('streak-30');
    }
    if (progress.mockInterviews.length >= 1 && !existingAchievements.has('first-mock')) {
        newAchievements.push('first-mock');
    }
    if (progress.mockInterviews.length >= 10 && !existingAchievements.has('mock-10')) {
        newAchievements.push('mock-10');
    }

    return {
        progress: {
            ...progress,
            achievements: [...progress.achievements, ...newAchievements]
        },
        newAchievements
    };
}

// Calculate topic mastery level
export function calculateMasteryLevel(problemsSolved: number, resolvesCompleted: number, firstAttemptRate: number): 'unranked' | 'bronze' | 'silver' | 'gold' | 'platinum' {
    if (problemsSolved === 0) return 'unranked';
    if (problemsSolved >= 5 && firstAttemptRate >= 0.8 && resolvesCompleted >= 3) return 'platinum';
    if (problemsSolved >= 5 && firstAttemptRate >= 0.6) return 'gold';
    if (problemsSolved >= 3 && resolvesCompleted >= 1) return 'silver';
    return 'bronze';
}

// Get problems due for re-solve
export function getDueResolves(progress: UserProgress): string[] {
    const today = new Date();

    return Object.entries(progress.problems)
        .filter(([_, p]) => {
            if (!p.nextResolveDate) return false;
            return new Date(p.nextResolveDate) <= today;
        })
        .map(([id]) => id);
}

// Schedule next re-solve (spaced repetition)
export function scheduleResolve(lastResolveDate: string, resolveCount: number): string {
    const base = new Date(lastResolveDate);

    // First resolve: 48-72 hours, Second: 3-4 weeks
    const daysToAdd = resolveCount === 0 ? 3 : 25;

    base.setDate(base.getDate() + daysToAdd);
    return base.toISOString().split('T')[0];
}
