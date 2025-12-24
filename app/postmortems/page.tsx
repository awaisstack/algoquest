'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/lib/progress-context';

export default function PostmortemsPage() {
  const router = useRouter();
  const { progress, addPostmortem } = useProgress();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    problemTitle: '',
    patterns: '',
    whatTried: '',
    whereStuck: '',
    correctIdea: '',
    timeComplexity: '',
    spaceComplexity: '',
    category: 'pattern' as 'pattern' | 'implementation' | 'edge-case' | 'language'
  });

  const handleSubmit = () => {
    if (!form.problemTitle.trim()) return;

    addPostmortem({
      date: new Date().toISOString(),
      problemId: form.problemTitle.toLowerCase().replace(/\s+/g, '-'),
      problemTitle: form.problemTitle,
      pattern: form.patterns,
      firstAttempt: form.whatTried,
      whereIFroze: form.whereStuck,
      correctIdea: form.correctIdea,
      timeComplexity: form.timeComplexity,
      spaceComplexity: form.spaceComplexity,
      edgeCases: '',
      mistakeCategory: form.category === 'edge-case' ? 'tests' : form.category as any,
      resolveDates: []
    });

    setForm({
      problemTitle: '',
      patterns: '',
      whatTried: '',
      whereStuck: '',
      correctIdea: '',
      timeComplexity: '',
      spaceComplexity: '',
      category: 'pattern'
    });
    setShowForm(false);
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--space-6)'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            className="btn btn-ghost"
            onClick={() => router.push('/dashboard')}
            style={{ cursor: 'pointer' }}
          >
            ← Dashboard
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            style={{ cursor: 'pointer' }}
          >
            + New Postmortem
          </button>
        </div>
      </header>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6)'
      }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
          color: 'var(--text-primary)'
        }}>Postmortems</h1>
        <p style={{
          color: 'var(--text-tertiary)',
          marginBottom: 'var(--space-8)'
        }}>
          Track and learn from problems you struggled with.
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}>
          <div style={{
            padding: 'var(--space-5)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-primary)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {progress.postmortems.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total
            </div>
          </div>
          {['pattern', 'implementation', 'edge-case', 'language'].map(cat => (
            <div key={cat} style={{
              padding: 'var(--space-5)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-primary)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {progress.postmortems.filter(p => {
                  const target = cat === 'edge-case' ? 'tests' : cat;
                  return p.mistakeCategory === target;
                }).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {cat.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>

        {/* List */}
        {progress.postmortems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-16)',
            color: 'var(--text-tertiary)'
          }}>
            <p>No postmortems yet. Add one when you struggle with a problem!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {[...progress.postmortems].reverse().map(pm => (
              <div key={pm.id} style={{
                padding: 'var(--space-5)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-primary)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-3)'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>{pm.problemTitle}</h3>
                  <span style={{
                    fontSize: '0.6875rem',
                    padding: 'var(--space-1) var(--space-2)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase'
                  }}>{pm.mistakeCategory === 'tests' ? 'edge case' : pm.mistakeCategory}</span>
                </div>

                {pm.pattern && (
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-3)',
                    flexWrap: 'wrap'
                  }}>
                    {pm.pattern.split(',').map(p => (
                      <span key={p} style={{
                        fontSize: '0.6875rem',
                        padding: '2px 8px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-tertiary)'
                      }}>{p}</span>
                    ))}
                  </div>
                )}

                {pm.correctIdea && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Correct approach:</strong> {pm.correctIdea}
                  </p>
                )}

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  {new Date(pm.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-6)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflow: 'auto',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-primary)'
            }}
          >
            <div style={{
              padding: 'var(--space-5)',
              borderBottom: '1px solid var(--border-primary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>New Postmortem</h2>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1.25rem'
                }}
              >×</button>
            </div>

            <div style={{ padding: 'var(--space-5)' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>Problem Title *</label>
                <input
                  value={form.problemTitle}
                  onChange={(e) => setForm({ ...form, problemTitle: e.target.value })}
                  placeholder="e.g., Two Sum"
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>Patterns (comma-separated)</label>
                <input
                  value={form.patterns}
                  onChange={(e) => setForm({ ...form, patterns: e.target.value })}
                  placeholder="e.g., hashmap, two-pointers"
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>What did you try?</label>
                <textarea
                  value={form.whatTried}
                  onChange={(e) => setForm({ ...form, whatTried: e.target.value })}
                  placeholder="Describe your approach..."
                  rows={2}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>Correct Approach</label>
                <textarea
                  value={form.correctIdea}
                  onChange={(e) => setForm({ ...form, correctIdea: e.target.value })}
                  placeholder="What's the right way to solve it?"
                  rows={2}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                >
                  <option value="pattern">Pattern Recognition</option>
                  <option value="implementation">Implementation</option>
                  <option value="edge-case">Edge Cases</option>
                  <option value="language">Language/Syntax</option>
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-6)'
              }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowForm(false)}
                  style={{ flex: 1 }}
                >Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!form.problemTitle.trim()}
                  style={{ flex: 1 }}
                >Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
