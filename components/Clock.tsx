'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

function getGreeting(hour: number, name: string): string {
  const n = name ? `, ${name}` : '';
  if (hour >= 5 && hour < 12) return `Good morning${n} ☀️`;
  if (hour >= 12 && hour < 17) return `Good afternoon${n} 🌤️`;
  if (hour >= 17 && hour < 21) return `Good evening${n} 🌆`;
  if (hour >= 21 && hour < 24) return `Night owl mode${n} 🦉`;
  // 0–4 AM — deep night
  return `Burning midnight oil${n} 🌙`;
}

export default function Clock() {
  const [name] = useLocalStorage<string>(STORAGE_KEYS.NAME, '');
  const [now, setNow]     = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !now) {
    return (
      <div>
        <span style={{ fontFamily: "'Space Grotesk'", fontSize: 96, fontWeight: 900, color: '#fff', opacity: 0 }}>00:00</span>
      </div>
    );
  }

  const h24 = now.getHours();
  const h12 = h24 % 12 || 12;
  const hh  = h12.toString().padStart(2, '0');
  const mm  = now.getMinutes().toString().padStart(2, '0');
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const greeting = getGreeting(h24, name);

  // Calculate estimated finish based on pomodoro (placeholder)
  const finishTime = new Date(now.getTime() + 25 * 60 * 1000);
  const finishStr  = finishTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

  return (
    <>
      {/* Label + Greeting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.05em',
          lineHeight: '100%',
          color: '#c5c4db',
          textTransform: 'uppercase',
        }}>
          CURRENT FLOW SESSION
        </span>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          fontWeight: 400,
          lineHeight: '160%',
          color: '#fff',
        }}>
          {greeting}
        </h2>
      </div>

      {/* Massive Clock */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{
          fontSize: 96,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#fff',
          lineHeight: 1,
        }}>
          {hh}
        </span>
        <span style={{
          fontSize: 96,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          color: '#1A1FFF',
          lineHeight: 1,
          margin: '0 8px',
          animation: 'pulse-colon 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}>
          :
        </span>
        <span style={{
          fontSize: 96,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#fff',
          lineHeight: 1,
        }}>
          {mm}
        </span>
        <span style={{
          fontSize: 22,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1,
          marginLeft: 12,
          alignSelf: 'flex-end',
          paddingBottom: 8,
        }}>
          {ampm}
        </span>
      </div>

      {/* EST. FINISH pill */}
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{
          padding: '4px 12px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 9999,
          fontSize: 10,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.05em',
        }}>
          EST. FINISH {finishStr}
        </span>
      </div>
    </>
  );
}
