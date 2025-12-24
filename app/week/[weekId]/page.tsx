'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import { curriculum, ACHIEVEMENTS } from '@/data/curriculum';

export default function WeekPage() {
  const params = useParams();
  const router = useRouter();
  const {
    progress,
    markProblemSolved,
    markDayComplete,
    markVideoWatched,
    lastAchievement,
    lastLevelUp,
    clearNotifications
  } = useProgress();

  const weekId = parseInt(params.weekId as string);
  const week = curriculum.find(w => w.weekNumber === weekId);
  const [selectedDay, setSelectedDay] = useState(1);
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);

  if (!week) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)'
      }}>
        Week not found
      </div>
    );
  }

  const currentDay = week.days.find(d => d.dayNumber === selectedDay) || week.days[0];

  const isProblemSolved = (problemId: string) => {
    return progress.problems[problemId]?.solved || false;
  };

  const handleSolveProblem = (problemId: string, difficulty: 'easy' | 'medium' | 'hard') => {
    if (!isProblemSolved(problemId)) {
      // Defaulting timeSpent to 15 mins (900s) and firstAttempt to true for now
      // ideally this comes from the problem solver UI
      markProblemSolved(problemId, difficulty, 900, true);
    }
  };

  const isDayCompleted = (dId: number) => {
    return progress.completedDays?.[weekId]?.includes(dId) || false;
  };

  const isResourceCompleted = (rId: string) => {
    return progress.watchedVideos?.[rId] || false;
  };

  const isVideoWatched = (tId: string) => {
    return progress.watchedVideos?.[tId] || false;
  };

  const achievement = lastAchievement ? ACHIEVEMENTS.find(a => a.id === lastAchievement) : null;

  return (
    <main style={{ minHeight: '100vh', paddingTop: '70px' }}>
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
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
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
          }}>W</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{weekId === 0 ? 'Prerequisites' : `WEEK ${weekId}`}</span>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {weekId > 0 && (
            <button
              onClick={() => router.push(`/week/${weekId - 1}`)}
              style={{
                background: '#fff',
                color: '#000',
                border: '2px solid #000',
                boxShadow: '2px 2px 0px #000',
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
            >← {weekId - 1}</button>
          )}
          {weekId < 24 && (
            <button
              onClick={() => router.push(`/week/${weekId + 1}`)}
              style={{
                background: '#fff',
                color: '#000',
                border: '2px solid #000',
                boxShadow: '2px 2px 0px #000',
                padding: '8px 16px',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
            >{weekId + 1} →</button>
          )}
        </div>
      </nav>

      {/* Notifications */}
      <AnimatePresence>
        {(lastAchievement || lastLevelUp) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 200,
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              color: 'black',
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(255, 165, 0, 0.4)',
              cursor: 'pointer'
            }}
            onClick={clearNotifications}
          >
            {lastLevelUp ? `🎉 Level Up! You are now Level ${lastLevelUp}!` : `🏆 Achievement Unlocked: ${achievement?.title || 'New Achievement'}!`}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        {/* Week Info */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span style={{
            display: 'inline-block',
            padding: 'var(--space-1) var(--space-3)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-3)'
          }}>{week.weekNumber === 0 ? 'Prerequisites' : `Week ${week.weekNumber}`}</span>

          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            marginBottom: '8px',
            color: '#000',
            textTransform: 'uppercase'
          }}>{week.title}</h1>

          <p style={{
            fontSize: '1rem',
            color: '#000',
            marginBottom: '24px',
            fontWeight: 500
          }}>{week.focus}</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)'
          }}>
            <div style={{
              padding: '20px',
              background: '#fff',
              border: '2px solid #000',
              boxShadow: '3px 3px 0px #000'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#000', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>DAILY GOAL</div>
              <div style={{ fontSize: '0.875rem', color: '#000', fontWeight: 600 }}>{week.dailyGoal}</div>
            </div>
            <div style={{
              padding: '20px',
              background: '#fff',
              border: '2px solid #000',
              boxShadow: '3px 3px 0px #000'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#000', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>PROBLEMS/DAY</div>
              <div style={{ fontSize: '0.875rem', color: '#000', fontWeight: 600 }}>{week.problemsPerDay}</div>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-2)'
        }}>
          {week.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              style={{
                padding: '12px 20px',
                background: selectedDay === day.dayNumber ? '#000' : '#fff',
                color: selectedDay === day.dayNumber ? '#fff' : '#000',
                border: '2px solid #000',
                boxShadow: selectedDay === day.dayNumber ? '3px 3px 0px #000' : '2px 2px 0px #000',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transition: 'all 0.1s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                if (selectedDay !== day.dayNumber) {
                  e.currentTarget.style.background = '#e0e0e0';
                }
              }}
              onMouseOut={(e) => {
                if (selectedDay !== day.dayNumber) {
                  e.currentTarget.style.background = '#fff';
                }
              }}
            >
              {day.dayNumber}
              {isDayCompleted(day.dayNumber) && (
                <span style={{ fontSize: '0.9em' }}>✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Day Content */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{
            padding: '24px',
            background: '#fff',
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                textTransform: 'uppercase'
              }}>{currentDay.title}</h2>

              <button
                onClick={() => markDayComplete(weekId, currentDay.dayNumber, !isDayCompleted(currentDay.dayNumber))}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #000',
                  background: isDayCompleted(currentDay.dayNumber) ? '#000' : '#fff',
                  color: isDayCompleted(currentDay.dayNumber) ? '#fff' : '#000',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  boxShadow: '2px 2px 0px #000',
                  textTransform: 'uppercase',
                  transition: 'all 0.1s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isDayCompleted(currentDay.dayNumber) ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>

            {currentDay.isRestDay && (
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem' }}>
                Rest day! Take a break, exercise, and recharge for the next day.
              </p>
            )}

            {currentDay.isLightDay && (
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem' }}>
                Light day - focus on review and consolidation.
              </p>
            )}

            {currentDay.goals.length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#000',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}>TODAY'S GOALS</h3>
                <ul style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}>
                  {currentDay.goals.map((goal, i) => (
                    <li key={i} style={{
                      fontSize: '0.9375rem',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 500
                    }}>
                      <span style={{ color: '#000' }}>•</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Topics */}
          {currentDay.topics.map((topic) => (
            <div
              key={topic.id}
              style={{
                padding: '24px',
                background: '#fff',
                border: '3px solid #000',
                boxShadow: '4px 4px 0px #000',
                marginBottom: '16px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-4)'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    color: '#000'
                  }}>{topic.title}</h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#000',
                    fontWeight: 500
                  }}>{topic.description}</p>

                  {/* Resources List */}
                  {topic.resources && topic.resources.length > 0 && (
                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>LEARNING RESOURCES</div>
                      {topic.resources.map(resource => (
                        <div key={resource.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#fff',
                          padding: '12px 16px',
                          border: '2px solid #000',
                          boxShadow: '2px 2px 0px #000'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.2em' }}>
                              {resource.type === 'concept' ? '📚' : resource.type === 'guide' ? '🛠️' : '▶️'}
                            </span>
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#000' }}>{resource.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#000', fontWeight: 500 }}>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • {resource.duration}</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => setVideoModal({ url: resource.url, title: resource.title })}
                              style={{
                                background: '#000',
                                color: '#fff',
                                border: '2px solid #000',
                                padding: '6px 12px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                              }}
                            >
                              Watch
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#000', cursor: 'pointer', fontWeight: 600 }}>
                              <input
                                type="checkbox"
                                checked={isResourceCompleted(resource.id)}
                                onChange={(e) => markVideoWatched(resource.id, e.target.checked)}
                                style={{ cursor: 'pointer' }}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Legacy Video Support (Single) */}
                {!topic.resources && topic.videoUrl && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <button
                      onClick={() => setVideoModal({ url: topic.videoUrl!, title: topic.videoTitle! })}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-2) var(--space-3)',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#60a5fa',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>▶</span> Watch Video
                    </button>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={isVideoWatched(topic.id)}
                        onChange={(e) => markVideoWatched(topic.id, e.target.checked)}
                        style={{ cursor: 'pointer' }}
                      />
                      Watched
                    </label>
                  </div>
                )}
              </div>

              {topic.problems.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#000',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                  }}>PRACTICE PROBLEMS</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {topic.problems.map((problem) => (
                      <div
                        key={problem.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px 20px',
                          background: '#fff',
                          border: '2px solid #000',
                          boxShadow: '3px 3px 0px #000',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                          <span className={`badge-${problem.difficulty}`} style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '4px 8px',
                            textTransform: 'uppercase',
                            background: problem.difficulty === 'easy' ? '#e0e0e0' : problem.difficulty === 'medium' ? '#d0d0d0' : '#c0c0c0',
                            border: '1px solid #000',
                            color: '#000'
                          }}>{problem.difficulty}</span>
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.875rem',
                              color: '#000',
                              textDecoration: 'none',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontWeight: 600
                            }}
                          >
                            {problem.title}
                          </a>
                          <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                            {problem.patterns.slice(0, 2).map(pattern => (
                              <span key={pattern} style={{
                                fontSize: '0.625rem',
                                padding: '2px 6px',
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-muted)'
                              }}>{pattern}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleSolveProblem(problem.id, problem.difficulty)}
                          disabled={isProblemSolved(problem.id)}
                          style={{
                            padding: '10px 16px',
                            background: isProblemSolved(problem.id) ? '#000' : '#fff',
                            color: isProblemSolved(problem.id) ? '#fff' : '#000',
                            border: '2px solid #000',
                            boxShadow: isProblemSolved(problem.id) ? 'none' : '2px 2px 0px #000',
                            cursor: isProblemSolved(problem.id) ? 'default' : 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            textTransform: 'uppercase'
                          }}
                        >
                          {isProblemSolved(problem.id) ? '✓ Solved' : 'Mark Solved'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {currentDay.topics.length === 0 && !currentDay.isRestDay && !currentDay.isLightDay && (
            <p style={{
              color: 'var(--text-tertiary)',
              textAlign: 'center',
              padding: 'var(--space-8)'
            }}>
              No specific topics for this day. Focus on your goals!
            </p>
          )}
        </motion.div>
      </div>

      {/* Video Modal */}
      {
        videoModal && (
          <div
            onClick={() => setVideoModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 'var(--space-6)',
              cursor: 'pointer'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '900px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'default'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-4) var(--space-5)',
                borderBottom: '1px solid var(--border-primary)'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>{videoModal.title}</h3>
                <button
                  onClick={() => setVideoModal(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    padding: 'var(--space-2)'
                  }}
                >×</button>
              </div>
              <div style={{ aspectRatio: '16/9' }}>
                <iframe
                  src={videoModal.url}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )
      }
    </main >
  );
}
