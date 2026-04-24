'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

export type PomodoroMode = 'focus' | 'short' | 'long';

interface SessionRecord {
  date: string;
  count: number;
}

/** Play a pleasant completion chime using Web Audio API */
function playCompletionChime() {
  try {
    const ctx = new AudioContext();

    // Play a 3-note ascending chime: C5 → E5 → G5
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.2);
      osc.stop(ctx.currentTime + i * 0.2 + 0.8);
    });

    // Final chord
    setTimeout(() => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = 1046.50; // C6
      osc2.frequency.value = 783.99;  // G5
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.5);
      osc2.stop(ctx.currentTime + 1.5);
    }, 700);
  } catch {
    // Web Audio not available
  }
}

export function usePomodoro() {
  const [focusMin]  = useLocalStorage<number>(STORAGE_KEYS.POMODORO_MIN, 25);
  const [breakMin]  = useLocalStorage<number>(STORAGE_KEYS.BREAK_MIN, 5);
  const [sessions, setSessions] = useLocalStorage<SessionRecord>(
    STORAGE_KEYS.SESSIONS,
    { date: '', count: 0 }
  );

  const [mode, setMode]           = useState<PomodoroMode>('focus');
  const [running, setRunning]     = useState(false);
  const [timeLeft, setTimeLeft]   = useState<number>(focusMin * 60);
  const [completed, setCompleted] = useState(false);

  // Store each mode's remaining time independently
  const savedTimesRef = useRef<Record<PomodoroMode, number>>({
    focus: focusMin * 60,
    short: breakMin * 60,
    long: 15 * 60,
  });
  const hasStartedRef = useRef<Record<PomodoroMode, boolean>>({
    focus: false,
    short: false,
    long: false,
  });
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef       = useRef<PomodoroMode>(mode);

  // Keep modeRef in sync
  useEffect(() => { modeRef.current = mode; }, [mode]);

  // Total seconds for a given mode
  const getTotalSeconds = useCallback((m: PomodoroMode): number => {
    if (m === 'focus') return focusMin * 60;
    if (m === 'short') return breakMin * 60;
    return 15 * 60;
  }, [focusMin, breakMin]);

  // Initialize savedTimes when settings change (only for modes that haven't started)
  useEffect(() => {
    if (!hasStartedRef.current.focus) {
      savedTimesRef.current.focus = focusMin * 60;
      if (mode === 'focus') setTimeLeft(focusMin * 60);
    }
    if (!hasStartedRef.current.short) {
      savedTimesRef.current.short = breakMin * 60;
      if (mode === 'short') setTimeLeft(breakMin * 60);
    }
  }, [focusMin, breakMin, mode]);

  // Countdown tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        // Save current time to ref
        savedTimesRef.current[modeRef.current] = next;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setCompleted(true);
          hasStartedRef.current[modeRef.current] = false;
          savedTimesRef.current[modeRef.current] = getTotalSeconds(modeRef.current);
          handleComplete();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const handleComplete = useCallback(() => {
    // Play joyful chime
    playCompletionChime();

    // Increment session count if focus mode
    if (modeRef.current === 'focus') {
      const today = new Date().toISOString().split('T')[0];
      setSessions((prev) => ({
        date: today,
        count: prev.date === today ? prev.count + 1 : 1,
      }));
    }

    // Browser notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('🎉 ZenFocus', {
          body: modeRef.current === 'focus'
            ? '⚡ Focus session complete! Take a break.'
            : '🧘 Break done. Back to work!',
          icon: '/favicon.ico',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  }, [setSessions]);

  const start = useCallback(() => {
    setCompleted(false);
    hasStartedRef.current[modeRef.current] = true;
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    clearInterval(intervalRef.current!);
    // Save current timeLeft to the mode's saved time
    setTimeLeft((prev) => {
      savedTimesRef.current[modeRef.current] = prev;
      return prev;
    });
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setCompleted(false);
    const total = getTotalSeconds(modeRef.current);
    hasStartedRef.current[modeRef.current] = false;
    savedTimesRef.current[modeRef.current] = total;
    setTimeLeft(total);
  }, [getTotalSeconds]);

  const switchMode = useCallback((m: PomodoroMode) => {
    // Save current mode's remaining time before switching
    clearInterval(intervalRef.current!);

    setTimeLeft((prev) => {
      savedTimesRef.current[modeRef.current] = prev;
      return prev;
    });

    if (running) setRunning(false);

    // Switch to new mode and restore its saved time
    setMode(m);
    modeRef.current = m;
    setCompleted(false);
    setTimeLeft(savedTimesRef.current[m]);
  }, [running]);

  // Today's session count
  const today = new Date().toISOString().split('T')[0];
  const todayCount = sessions.date === today ? sessions.count : 0;

  const totalSeconds = getTotalSeconds(mode);
  const progress = 1 - timeLeft / totalSeconds;

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return {
    mode, running, timeLeft, completed, progress,
    minutes, seconds, todayCount,
    start, pause, reset, switchMode,
    focusMin, breakMin,
  };
}
