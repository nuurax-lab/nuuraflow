'use client';

import { useEffect, useState, useRef } from 'react';
import { getRandomQuote } from '@/lib/quotes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import type { UserRole } from '@/lib/storage';

export default function QuoteCard() {
  const [role] = useLocalStorage<UserRole>(STORAGE_KEYS.USER_ROLE, 'developer');
  const [quote, setQuote] = useState('');
  const [fade, setFade]   = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get a new quote, avoiding repeats
  const rotateQuote = (currentRole: UserRole) => {
    setFade(false);
    setTimeout(() => {
      setQuote(getRandomQuote(currentRole));
      setFade(true);
    }, 400);
  };

  // Initial quote
  useEffect(() => {
    setQuote(getRandomQuote(role));
  }, [role]);

  // Rotate every 60 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      rotateQuote(role);
    }, 60_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [role]);

  return (
    <>
      {/* Quote marks icon */}
      <span style={{
        fontSize: 24,
        color: '#1A1FFF',
        marginBottom: 16,
        fontFamily: 'serif',
        lineHeight: 1,
      }}>
        ❝
      </span>

      {/* Quote text with fade animation */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        fontWeight: 400,
        lineHeight: '160%',
        color: 'rgba(255,255,255,0.9)',
        fontStyle: 'italic',
        maxWidth: 280,
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all 0.4s ease',
        minHeight: 48,
      }}>
        {quote ? `"${quote}"` : '"The best code is written in a calm mind."'}
      </p>

      {/* Role indicator pill */}
      <div style={{
        marginTop: 16,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 48, height: 1,
          background: 'rgba(255,255,255,0.1)',
        }} />
        <span style={{
          fontSize: 9,
          fontFamily: "'DM Mono', monospace",
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {role === 'student' ? '📚 Student' : '💻 Developer'}
        </span>
      </div>
    </>
  );
}
