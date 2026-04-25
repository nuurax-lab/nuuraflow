'use client';

import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';

import Background    from '@/components/Background';
import Clock         from '@/components/Clock';
import PomodoroTimer from '@/components/PomodoroTimer';
import MusicPlayer   from '@/components/MusicPlayer';
import DailyGoal     from '@/components/DailyGoal';
import TodoList      from '@/components/TodoList';
import QuoteCard     from '@/components/QuoteCard';
import AffiliateBanner from '@/components/AffiliateBanner';
import SettingsPanel from '@/components/SettingsPanel';
import Footer        from '@/components/Footer';

export default function Dashboard() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted,      setMounted]      = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Background />
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* ── Top Nav Bar ── */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 100px',
            height: 56,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            flexShrink: 0,
          }}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: '1.25rem',
            letterSpacing: '0.18em',
          }}>
            <span style={{ color: '#1A1FFF' }}>NUURA</span>
            <span style={{ color: '#fff' }}>FLOW</span>
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <MusicPlayer />
            <button
              id="settings-btn"
              onClick={() => setSettingsOpen(true)}
              className="glass-card"
              style={{
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                transition: 'transform 0.5s ease',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(90deg)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)'; }}
              title="Settings"
              aria-label="Open settings"
            >
              <Settings size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
            </button>
          </div>
        </header>

        {/* ── Main Bento Grid ── */}
        <main
          style={{
            flex: 1,
            width: '100%',
            margin: '0 auto',
            padding: '24px 100px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto auto',
            gap: 18,
            alignContent: 'stretch',
          }}
        >
          <section className="glass-card focus-glow"
            style={{ gridColumn: 'span 2', padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
            <Clock />
          </section>

          <section className="glass-card focus-glow"
            style={{ gridColumn: 'span 1', gridRow: 'span 2', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PomodoroTimer />
          </section>

          <section className="glass-card"
            style={{ gridColumn: 'span 1', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '4px solid #43dde6' }}>
            <DailyGoal />
          </section>

          {/* Strategic affiliate recommendation */}
          <section className="glass-card"
            style={{ gridColumn: 'span 1', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <AffiliateBanner />
          </section>

          <section id="todo-section" className="glass-card"
            style={{ gridColumn: 'span 2', padding: '20px' }}>
            <TodoList />
          </section>

          <section className="glass-card"
            style={{ gridColumn: 'span 1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'rgba(26, 31, 255, 0.05)' }}>
            <QuoteCard />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
