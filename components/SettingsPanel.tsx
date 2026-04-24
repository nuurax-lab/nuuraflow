'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, Save, ExternalLink } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import type { UserRole } from '@/lib/storage';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [name,     setName]     = useLocalStorage<string>(STORAGE_KEYS.NAME, '');
  const [role,     setRole]     = useLocalStorage<UserRole>(STORAGE_KEYS.USER_ROLE, 'developer');
  const [ytUrl,    setYtUrl]    = useLocalStorage<string>(STORAGE_KEYS.YT_URL, '');
  const [focusMin, setFocusMin] = useLocalStorage<number>(STORAGE_KEYS.POMODORO_MIN, 25);
  const [breakMin, setBreakMin] = useLocalStorage<number>(STORAGE_KEYS.BREAK_MIN, 5);

  const [draftName,  setDraftName]  = useState('');
  const [draftRole,  setDraftRole]  = useState<UserRole>('developer');
  const [draftUrl,   setDraftUrl]   = useState('');
  const [draftFocus, setDraftFocus] = useState(25);
  const [draftBreak, setDraftBreak] = useState(5);
  const [toast,      setToast]      = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setDraftName(name);
      setDraftRole(role);
      setDraftUrl(ytUrl);
      setDraftFocus(focusMin);
      setDraftBreak(breakMin);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const save = useCallback(() => {
    setName(draftName.trim());
    setRole(draftRole);
    setYtUrl(draftUrl.trim());
    setFocusMin(Math.min(90, Math.max(10, draftFocus)));
    setBreakMin(Math.min(30, Math.max(3, draftBreak)));
    setToast(true);
    setTimeout(() => { setToast(false); onClose(); }, 1200);
  }, [draftName, draftRole, draftUrl, draftFocus, draftBreak, setName, setRole, setYtUrl, setFocusMin, setBreakMin, onClose]);

  if (!mounted) return null;

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '10px 14px',
    color: '#e3e1f0', fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif", fontSize: 11,
    fontWeight: 500, color: 'rgba(255,255,255,0.35)',
    marginBottom: 6, display: 'block',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif", fontSize: 11,
    fontWeight: 600, letterSpacing: '0.15em',
    textTransform: 'uppercase' as const, color: '#bfc2ff', marginBottom: 16,
  };

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: open ? 'rgba(10,14,42,0.6)' : 'transparent',
        backdropFilter: open ? 'blur(4px)' : 'none',
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s',
      }} onClick={onClose} />

      {/* Slide-in Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        height: '100%', zIndex: 50,
        display: 'flex', flexDirection: 'column',
        width: 'min(380px, 100vw)',
        background: 'rgba(10,14,42,0.97)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(24px)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(26,31,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>⚙️</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>Settings</span>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
          ><X size={16} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Personal */}
          <div style={{ marginBottom: 28 }}>
            <p style={sectionLabelStyle}>👤 Personal</p>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Your Name</label>
              <input type="text" value={draftName} onChange={e => setDraftName(e.target.value)}
                placeholder="Enter your name" maxLength={40} style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(191,194,255,0.3)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
            </div>

            {/* Role Selection */}
            <label style={labelStyle}>I am a...</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {(['student', 'developer'] as UserRole[]).map(r => {
                const isActive = draftRole === r;
                const emoji = r === 'student' ? '📚' : '💻';
                const label = r === 'student' ? 'Student' : 'Developer';
                return (
                  <button key={r} onClick={() => setDraftRole(r)} style={{
                    padding: '12px 14px', borderRadius: 12,
                    background: isActive ? 'rgba(26,31,255,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1.5px solid ${isActive ? 'rgba(26,31,255,0.35)' : 'rgba(255,255,255,0.06)'}`,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif",
                  }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span>{label}</span>
                    {isActive && (
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#1A1FFF',
                        boxShadow: '0 0 8px rgba(26,31,255,0.5)',
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>
              Quotes will be personalized based on your role.
            </p>
          </div>

          {/* Music */}
          <div style={{ marginBottom: 28 }}>
            <p style={sectionLabelStyle}>🎵 Music</p>
            <label style={labelStyle}>YouTube Playlist / Video URL</label>
            <input type="url" value={draftUrl} onChange={e => setDraftUrl(e.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..." style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(191,194,255,0.3)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>
              Supports playlists & single videos. Audio only.
            </p>
            <button onClick={() => window.open(draftUrl || 'https://www.youtube.com/watch?v=jfKfPfyJRdk', '_blank')}
              style={{
                marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 10,
                background: 'rgba(26,31,255,0.1)', border: '1px solid rgba(26,31,255,0.2)',
                color: '#bfc2ff', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,31,255,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,31,255,0.1)'; }}
            ><ExternalLink size={12} /> Test URL</button>
          </div>

          {/* Pomodoro */}
          <div style={{ marginBottom: 16 }}>
            <p style={sectionLabelStyle}>⏱ Pomodoro</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Focus (min)</label>
                <input type="number" min={10} max={90} value={draftFocus}
                  onChange={e => setDraftFocus(Number(e.target.value))} style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(191,194,255,0.3)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
              </div>
              <div>
                <label style={labelStyle}>Break (min)</label>
                <input type="number" min={3} max={30} value={draftBreak}
                  onChange={e => setDraftBreak(Number(e.target.value))} style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(191,194,255,0.3)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={save} style={{
            width: '100%', padding: '12px 0', borderRadius: 12,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'linear-gradient(135deg, #1A1FFF, #3b3fff)',
            color: '#fff', border: 'none', cursor: 'pointer',
            transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(26,31,255,0.3)',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          ><Save size={15} /> Save Settings</button>
        </div>
      </div>

      {/* Toast */}
      <div style={{
        position: 'fixed', bottom: 32, left: '50%', zIndex: 60,
        padding: '10px 24px', borderRadius: 12,
        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13,
        background: 'rgba(26,31,255,0.12)', border: '1px solid rgba(191,194,255,0.2)',
        color: '#bfc2ff', backdropFilter: 'blur(12px)',
        transform: toast ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
        opacity: toast ? 1 : 0, pointerEvents: 'none', transition: 'all 0.3s',
      }}>Settings saved ✓</div>
    </>
  );
}
