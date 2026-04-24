'use client';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

interface GoalData {
  date: string;
  text: string;
  done: boolean;
}

const TODAY = () => new Date().toISOString().split('T')[0];

export default function DailyGoal() {
  const [goal, setGoal] = useLocalStorage<GoalData>(STORAGE_KEYS.GOAL, {
    date: '', text: '', done: false,
  });
  const [input,   setInput]   = useState('');
  const [editing, setEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const today   = TODAY();
  const isToday = goal.date === today;
  const hasGoal = isToday && goal.text.trim() !== '';

  const confirm = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setGoal({ date: today, text: trimmed, done: false });
    setInput('');
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter')  confirm();
    if (e.key === 'Escape') { setInput(''); setEditing(false); }
  };

  const toggleDone = () => {
    if (!hasGoal) return;
    setGoal(prev => ({ ...prev, done: !prev.done }));
  };

  if (!mounted) return null;

  return (
    <>
      {/* Label */}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}>
        DAILY FOCUS
      </span>

      {/* Goal display / input */}
      {(!hasGoal || editing) ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your goal and press Enter..."
            maxLength={120}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              color: '#e3e1f0',
              fontSize: 16,
              fontStyle: 'italic',
              fontFamily: "'Inter', sans-serif",
              padding: '8px 0',
              outline: 'none',
            }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <p
            onClick={toggleDone}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              lineHeight: '160%',
              color: goal.done ? 'rgba(255,255,255,0.4)' : '#fff',
              fontStyle: 'italic',
              textDecoration: goal.done ? 'line-through' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {goal.text}
          </p>
        </div>
      )}

      {/* Bottom edit prompt — matches code.html exactly */}
      {!editing && (
        <div
          onClick={() => { setInput(hasGoal ? goal.text : ''); setEditing(true); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#43dde6',
            fontSize: 12,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          <Pencil size={14} />
          {hasGoal ? 'Edit goal' : "What's the ONE thing you'll ship today?"}
        </div>
      )}
    </>
  );
}
