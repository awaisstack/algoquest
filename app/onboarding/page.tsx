'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';

type Step = 'welcome' | 'name' | 'confirm';

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile } = useProgress();

  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');

  const handleComplete = () => {
    // Default to 2-week track and python since these features aren't active yet
    setProfile(name, '2-week', 'python');
    router.push('/curriculum');
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: 'var(--space-6)'
            }}>👋</div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              marginBottom: 'var(--space-3)',
              color: 'var(--text-primary)'
            }}>Welcome to AlgoQuest</h1>
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-8)',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              A 28-week journey to master data structures and algorithms. Let's set up your profile.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setStep('name')}
            >
              Let's Go
            </button>
          </div>
        );

      case 'name':
        return (
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: 'var(--space-2)',
              color: 'var(--text-primary)'
            }}>What's your name?</h2>
            <p style={{
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-6)'
            }}>We'll use this to personalize your experience.</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                marginBottom: 'var(--space-6)',
                width: '100%',
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-ghost"
                onClick={() => setStep('welcome')}
              >Back</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep('confirm')}
                disabled={!name.trim()}
                style={{ flex: 1 }}
              >Continue</button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: 'var(--space-6)'
            }}>🚀</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: 'var(--space-2)',
              color: 'var(--text-primary)'
            }}>Ready, {name}?</h2>
            <p style={{
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-6)'
            }}>
              Your journey to FAANG starts now.
            </p>

            <div style={{
              padding: 'var(--space-5)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-primary)',
              marginBottom: 'var(--space-6)',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)'
              }}>Your Journey</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  • 28 weeks structured curriculum
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  • 100+ curated problems
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  • XP, achievements, and progress tracking
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-ghost"
                onClick={() => setStep('name')}
              >Back</button>
              <button
                className="btn btn-primary"
                onClick={handleComplete}
                style={{ flex: 1 }}
              >Start Learning</button>
            </div>
          </div>
        );
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
