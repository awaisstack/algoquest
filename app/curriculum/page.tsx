'use client';

import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import { curriculum, phases } from '@/data/curriculum';
import { useRef } from 'react';

export default function CurriculumPage() {
  const router = useRouter();
  const { progress, isLoading } = useProgress();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Show loading state while progress is being fetched
  if (isLoading) {
    return (
      <div
        ref={containerRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)'
        }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: '1rem' }}>Loading curriculum...</div>
      </div>
    );
  }

  const getWeekProgress = (weekNumber: number) => {
    const week = curriculum.find(w => w.weekNumber === weekNumber);
    if (!week) return 0;

    const allProblems = week.days.flatMap(d => d.topics.flatMap(t => t.problems));
    if (allProblems.length === 0) return 0;

    const solved = allProblems.filter(p => progress.problems[p.id]?.solved).length;
    return Math.round((solved / allProblems.length) * 100);
  };

  const totalProblems = curriculum.flatMap(w => w.days.flatMap(d => d.topics.flatMap(t => t.problems))).length;
  const solvedProblems = Object.values(progress.problems).filter(p => p.solved).length;
  const overallProgress = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  const phaseColors: Record<string, string> = {
    'pre-phase': 'hsl(0, 0%, 50%)',
    'phase-a': 'hsl(220, 70%, 60%)',
    'phase-b': 'hsl(280, 70%, 60%)',
    'phase-c': 'hsl(340, 70%, 60%)'
  };

  return (
    <main ref={containerRef} style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Fixed Navigation */}
      <motion.nav
        style={{
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            ← Back
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
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
          }}>A</div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#000',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>AlgoQuest</span>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: '#fff',
            border: '2px solid #000',
            boxShadow: '3px 3px 0px #000',
            color: '#000',
            padding: '10px 20px',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#000';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#000';
          }}
        >
          Dashboard
        </button>
      </motion.nav>

      {/* Hero Header */}
      <motion.header
        style={{
          paddingTop: 'calc(80px + var(--space-12))',
          paddingBottom: 'var(--space-10)',
          paddingLeft: 'var(--space-6)',
          paddingRight: 'var(--space-6)',
          background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%)',
          position: 'relative',
          opacity: headerOpacity
        }
        }
      >
        {/* Grid background */}
        < div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
        }} />

        < div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 'var(--space-8)' }}
          >
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: 'var(--space-3)',
              color: 'var(--text-primary)'
            }}>28-Week Curriculum</h1>
            <p style={{
              color: 'var(--text-tertiary)',
              fontSize: '1.125rem',
              maxWidth: '600px'
            }}>Master data structures and algorithms with a structured, proven roadmap</p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-8)'
            }}
          >
            {[
              { value: `${overallProgress}%`, label: 'Complete' },
              { value: `${solvedProblems}`, label: 'Problems' },
              { value: `Lv.${progress.level}`, label: 'Level' },
              { value: `${progress.streak.current}🔥`, label: 'Streak' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                style={{
                  padding: '24px',
                  background: '#fff',
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#000',
                  lineHeight: 1
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: '8px',
                  fontWeight: 700
                }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div >
      </motion.header >

      {/* Phases */}
      < div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6) var(--space-16)'
      }}>
        {
          phases.map((phase, phaseIndex) => {
            const phaseWeeks = curriculum.filter(w => w.phase === phase.id);
            const phaseColor = phaseColors[phase.id] || '#fff';

            return (
              <motion.section
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: phaseIndex * 0.1 }}
                style={{ marginBottom: 'var(--space-12)' }}
              >
                {/* Phase Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)'
                }}>
                  <div style={{
                    width: '6px',
                    height: '40px',
                    background: '#000',
                    boxShadow: '2px 0px 0px #000'
                  }} />
                  <div>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#000',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}>{phase.title}</h2>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#000',
                      fontWeight: 600
                    }}>{phase.description}</p>
                  </div>
                </div>

                {/* Week Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--space-4)'
                }}>
                  {phaseWeeks.map((week, i) => {
                    const weekProgress = getWeekProgress(week.weekNumber);
                    const isComplete = weekProgress === 100;

                    return (
                      <motion.div
                        key={week.weekNumber}
                        onClick={() => router.push(`/week/${week.weekNumber}`)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          padding: '24px',
                          background: '#fff',
                          border: '3px solid #000',
                          boxShadow: '5px 5px 0px #000',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                      >
                        {/* Top indicator */}
                        {isComplete && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            fontSize: '20px'
                          }}>✓</div>
                        )}

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 'var(--space-3)'
                        }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>{week.weekNumber === 0 ? week.title : `WEEK ${week.weekNumber}`}</span>
                          {isComplete && (
                            <span style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: 'rgba(48, 209, 88, 0.2)',
                              color: '#30d158',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.625rem'
                            }}>✓</span>
                          )}
                          {week.isBossWeek && !isComplete && (
                            <span style={{ fontSize: '0.875rem' }}>🏆</span>
                          )}
                        </div>

                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: 800,
                          marginBottom: '8px',
                          color: '#000'
                        }}>{week.title}</h3>

                        <p style={{
                          fontSize: '0.875rem',
                          color: '#000',
                          marginBottom: '16px',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontWeight: 500
                        }}>{week.focus}</p>

                        {/* Progress bar */}
                        <div style={{
                          height: '4px',
                          background: '#e0e0e0',
                          border: '1px solid #000',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${weekProgress}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{
                              height: '100%',
                              background: '#000'
                            }}
                          />
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#000',
                          marginTop: '8px',
                          fontWeight: 700
                        }}>{weekProgress}% COMPLETE</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })
        }
      </div >
    </main >
  );
}
