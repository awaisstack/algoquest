'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/lib/progress-context';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserMenu() {
    const { user } = useProgress();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        setIsOpen(false);

        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }

        // Failsafe: Clear local storage
        localStorage.removeItem('algoquest-auth-token');
        Object.keys(localStorage).forEach(key => {
            if (key.includes('supabase') || key.includes('sb-')) {
                localStorage.removeItem(key);
            }
        });

        window.location.href = '/';
    };

    return (
        <div style={{ position: 'relative' }}>
            {user ? (
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        background: '#fff',
                        padding: '8px 16px',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000'
                    }}
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#fff'
                    }}>
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#000', fontWeight: 700 }}>
                        {user.email?.split('@')[0]}
                    </span>
                </div>
            ) : (
                <button
                    onClick={() => router.push('/login')}
                    style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Sign In
                </button>
            )}

            <AnimatePresence>
                {isOpen && user && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '180px',
                            background: '#fff',
                            border: '2px solid #000',
                            boxShadow: '4px 4px 0px #000',
                            padding: '8px',
                            zIndex: 100
                        }}
                    >
                        <button
                            onClick={handleSignOut}
                            style={{
                                width: '100%',
                                padding: '10px',
                                textAlign: 'center',
                                background: '#fff',
                                border: '2px solid #000',
                                color: '#000',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                textTransform: 'uppercase'
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
                            Log Out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
