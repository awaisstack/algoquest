'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import { LEVELS, ACHIEVEMENTS } from '@/data/curriculum';
import UserMenu from '@/components/user-menu';

export default function DashboardPage() {
  const router = useRouter();
  const { progress, isLoading } = useProgress();
  const [last7Days, setLast7Days] = useState<Array<{ date: string; day: string; solved: number }>>([]);
  const [mounted, setMounted] = useState(false);

  // Move date calculations to useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      const dayLog = progress.dailyLogs.find(l => l.date === dateStr);
      return {
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        solved: dayLog?.problemsSolved || 0
      };
    });
    setLast7Days(days);
  }, [progress.dailyLogs]);

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading dashboard...</div>;
  }

  // Calculate stats
  const totalSolved = Object.values(progress.problems).filter(p => p.solved).length;
  const easySolved = Object.values(progress.problems).filter(p => p.solved && p.difficulty === 'easy').length;
  const mediumSolved = Object.values(progress.problems).filter(p => p.solved && p.difficulty === 'medium').length;
  const hardSolved = Object.values(progress.problems).filter(p => p.solved && p.difficulty === 'hard').length;

  const firstAttemptSuccesses = Object.values(progress.problems).filter(p => p.firstAttemptSuccess).length;
  const successRate = totalSolved > 0 ? Math.round((firstAttemptSuccesses / totalSolved) * 100) : 0;
  const totalResolves = Object.values(progress.problems).reduce((acc, p) => acc + p.resolves.length, 0);

  // Level info
  const currentLevel = LEVELS.find(l => l.level === progress.level) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.level === progress.level + 1);
  const xpForCurrentLevel = progress.level > 1 ? LEVELS[progress.level - 2]?.xpRequired || 0 : 0;
  const xpProgress = nextLevel
    ? Math.round(((progress.xp - xpForCurrentLevel) / (nextLevel.xpRequired - xpForCurrentLevel)) * 100)
    : 100;

  // Achievements
  const earnedAchievements = ACHIEVEMENTS.filter(a => progress.achievements.includes(a.id));

  const maxSolved = mounted && last7Days.length > 0 ? Math.max(...last7Days.map(d => d.solved), 1) : 1;

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Fixed Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '2px solid #000'
      }}>
        <button
          onClick={() => router.push('/curriculum')}
          style={{
            background: 'none',
            border: 'none',
            color: '#000',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
        >← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#fff',
            border: '2px solid #000',
            boxShadow: '3px 3px 0px #000'
          }}>Q</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Dashboard</span>
        </div>

        <UserMenu />


      </nav>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px var(--space-6) var(--space-8)',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 'var(--space-8)'
      }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <header>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#000',
              marginBottom: 'var(--space-2)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}>
              Welcome Back{progress.profile.name ? `, ${progress.profile.name}` : ''}
            </h1>
            <p style={{ color: '#000', fontSize: '1.1rem', fontWeight: 600 }}>
              Day {progress.currentDay} of {progress.currentWeek === 0 ? 'Prerequisites' : `Week ${progress.currentWeek}`} • {progress.level} Level
            </p>
          </header>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-4)'
          }}>
            <StatCard label="Problems Solved" value={totalSolved} icon="🧩" />
            <StatCard label="Success Rate" value={`${successRate}%`} icon="🎯" />
            <StatCard label="Current Streak" value={`${progress.streak.current} days`} icon="🔥" />
            <StatCard label="Total Resolves" value={totalResolves} icon="🔄" />
          </div>

          {/* Activity Chart */}
          <section className="card-gradient" style={{ padding: 'var(--space-6)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Activity</h3>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Last 7 Days</div>
            </div>

            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px', paddingBottom: '20px' }}>
              {mounted && last7Days.map((day, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '100%',
                    height: `${(day.solved / maxSolved) * 150}px`,
                    background: day.solved > 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '8px 8px 0 0',
                    minHeight: '4px',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day.day[0]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Achievements */}
          <section>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Recent Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              {earnedAchievements.slice(0, 3).map(ach => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-gradient"
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{ach.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ach.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ach.description}</div>
                  </div>
                </motion.div>
              ))}
              {earnedAchievements.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                  Keep solving problems to unlock achievements!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
        >
          {/* Level Progress */}
          <div className="card-gradient" style={{ padding: 'var(--space-6)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontWeight: 600 }}>Level {progress.level}</span>
              <span style={{ color: 'var(--text-muted)' }}>{progress.xp} XP</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: `${xpProgress}%`, height: '100%', background: 'var(--accent-primary)', borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {nextLevel ? `${nextLevel.title} in ${nextLevel.xpRequired - progress.xp} XP` : 'Max Level Reached!'}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/week/${progress.currentWeek}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
                background: '#000',
                border: '2px solid #000',
                boxShadow: '4px 4px 0px #000',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>📚</span>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>Continue Learning</div>
                <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>Week {progress.currentWeek}</div>
              </div>
            </motion.button>

            <button
              onClick={() => router.push('/curriculum')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🗺️</span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>View Curriculum</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>28 weeks roadmap</div>
              </div>
            </button>


          </div>
        </motion.div>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.2 }}
      className="card-gradient"
      style={{
        padding: 'var(--space-5)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle shine effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
        animation: 'shimmer 3s infinite',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div style={{
        fontSize: '1.75rem',
        fontWeight: 800,
        color: typeof value === 'number' && value > 0 ? 'transparent' : 'var(--text-primary)',
        letterSpacing: '-0.02em',
        background: typeof value === 'number' && value > 0
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'none',
        WebkitBackgroundClip: typeof value === 'number' && value > 0 ? 'text' : 'none',
        WebkitTextFillColor: typeof value === 'number' && value > 0 ? 'transparent' : 'var(--text-primary)',
        backgroundClip: typeof value === 'number' && value > 0 ? 'text' : 'none'
      }}>
        {value}
      </div>
    </motion.div>
  );
}
