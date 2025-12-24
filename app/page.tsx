'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useProgress } from '@/lib/progress-context';
import { useTheme } from '@/lib/theme-context';
import UserMenu from '@/components/user-menu';

export default function HomePage() {
  const router = useRouter();
  const { progress, isLoading, user } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [terminalText, setTerminalText] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);

    // Typewriter effect for terminal
    const text = '$ npm install @algoquest/mastery';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Check hasStarted with a safe fallback
  // If user is logged in, we assume they have started or will be healed, so send to curriculum/dashboard
  const hasStarted = (progress?.profile?.name !== '') || (!!user);

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: '1rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Animated Floating Dots Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0
      }} className="bg-dots" />

      {/* Floating Particles (Game Aesthetic) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 1, 0],
            y: -100,
            x: Math.random() * 50 - 25
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${10 + Math.random() * 80}%`,
            top: '100%',
            width: '8px',
            height: '8px',
            background: 'black',
            borderRadius: '50%'
          }}
        />
      ))}

      {/* Navigation */}
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
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: `2px solid #000`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: '#fff',
            border: '2px solid #000',
            boxShadow: '4px 4px 0px #000' // Mini game button logo
          }}>A</div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#000',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase'
          }}>AlgoQuest</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => router.push('/curriculum')}
            style={{
              background: 'none',
              border: 'none',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >Curriculum</button>

          <UserMenu />
        </div>
      </nav>

      {/* Hero Content Wrapper - Flex Grow to push footer down */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px 0', // Padding top for nav, 0 bottom to let footer sit tight
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1000px',
          width: '100%',
          textAlign: 'center',
          // Move content slightly up visually as requested
          marginBottom: '20px'
        }}>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '11px',
              padding: '14px 32px',
              background: '#fff',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
              marginBottom: '20px',
              fontSize: '1.07rem',
              fontWeight: 700,
              color: '#000',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <span style={{
              width: '11px',
              height: '11px',
              background: '#000'
            }} />
            440 Problems • 28 Weeks
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.8rem, 7.9vw, 5.6rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              marginBottom: '12px',
              color: '#000',
              textTransform: 'uppercase'
            }}
          >
            Zero to FAANG
            <span style={{ display: 'block', fontSize: '0.5em', marginTop: '8px', fontWeight: 700 }}>in 28 Weeks</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: 'clamp(1.125rem, 1.7vw, 1.4rem)',
              color: '#444',
              lineHeight: 1.5,
              marginBottom: '24px',
              maxWidth: '600px',
              margin: '0 auto 24px',
              fontWeight: 500
            }}
          >
            Master DSA through pattern recognition.
            <br />Build unstoppable problem-solving skills.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '0'
            }}
          >
            <motion.button
              onClick={() => router.push(hasStarted ? '/curriculum' : '/onboarding')}
              className="btn-game"
              style={{
                padding: '22px 54px',
                fontSize: '1.27rem'
              }}
            >
              {hasStarted ? 'CONTINUE JOURNEY' : 'BEGIN JOURNEY'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '20px 32px',
        borderTop: 'none', // Removed border for cleaner look in single viewport
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        flexShrink: 0 // Ensure footer doesn't shrink
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.7rem',
            color: '#fff'
          }}>A</div>
          <span style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}>AlgoQuest</span>
        </div>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-tertiary)'
        }}>
          Built for engineers, by engineers. Open source and free forever.
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          marginTop: '4px'
        }}>
          © {new Date().getFullYear()} AlgoQuest. Master DSA. Land your dream job.
        </p>
      </footer>

      <style jsx>{`
        @keyframes mesh-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
