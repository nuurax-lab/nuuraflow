'use client';

import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { usePomodoro, PomodoroMode } from '@/hooks/usePomodoro';

const RING_R = 80;
const RING_C = 2 * Math.PI * RING_R; // ≈ 502.4

export default function PomodoroTimer() {
  const {
    mode, running, completed, progress,
    minutes, seconds, todayCount,
    start, pause, reset, switchMode,
  } = usePomodoro();

  const [mounted,   setMounted]   = useState(false);
  const [goldFlash, setGoldFlash] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (completed) {
      setGoldFlash(true);
      const t = setTimeout(() => setGoldFlash(false), 2000);
      return () => clearTimeout(t);
    }
  }, [completed]);

  const strokeOffset = RING_C * (1 - progress);

  if (!mounted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ width: 192, height: 192, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      {/* Focus / Break tabs */}
      <div
        style={{
          display: 'flex', width: '100%', justifyContent: 'center',
          padding: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 12,
          marginBottom: 24,
        }}
      >
        {(['focus', 'short'] as PomodoroMode[]).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            style={{
              flex: 1,
              padding: '8px 0',
              fontSize: 12,
              fontWeight: mode === m ? 700 : 500,
              borderRadius: 8,
              background: mode === m ? '#1A1FFF' : 'transparent',
              color: mode === m ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.2s',
            }}
          >
            {m === 'focus' ? 'Focus' : 'Break'}
          </button>
        ))}
      </div>

      {/* SVG Ring Timer — 192×192 */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <svg width="192" height="192" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx="96" cy="96" r={RING_R}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="96" cy="96" r={RING_R}
            fill="transparent"
            stroke={goldFlash ? '#D4A017' : '#1A1FFF'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={strokeOffset}
            style={{
              transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease',
              filter: goldFlash ? 'drop-shadow(0 0 12px rgba(212,160,23,0.6))' : 'none',
            }}
          />
        </svg>

        {/* Center text */}
        <div style={{
          position: 'absolute',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 48,
            lineHeight: '120%',
            color: '#fff',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {minutes}:{seconds}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}>
            REMAINING
          </span>
        </div>
      </div>

      {/* Pause + Reset buttons — side by side glass cards */}
      <div style={{ display: 'flex', gap: 16, width: '100%' }}>
        <button
          onClick={running ? pause : start}
          className="glass-card"
          style={{
            flex: 1,
            padding: '12px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            borderColor: 'rgba(255,255,255,0.2)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.045)'; }}
        >
          {running
            ? <><Pause size={14} /> Pause</>
            : <><Play  size={14} /> {completed ? 'Again' : 'Start'}</>
          }
        </button>
        <button
          onClick={reset}
          className="glass-card"
          style={{
            flex: 1,
            padding: '12px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            borderColor: 'rgba(255,255,255,0.2)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.045)'; }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
