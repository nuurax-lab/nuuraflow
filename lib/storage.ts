// lib/storage.ts — ZenFocus localStorage key constants
export const STORAGE_KEYS = {
  NAME:          'zenfocus_name',
  USER_ROLE:     'zenfocus_role',       // 'student' | 'developer'
  YT_URL:        'zenfocus_yt_url',
  POMODORO_MIN:  'zenfocus_pomodoro_min',
  BREAK_MIN:     'zenfocus_break_min',
  SESSIONS:      'zenfocus_sessions',      // { date: string, count: number }
  GOAL:          'zenfocus_goal',          // { date: string, text: string, done: boolean }
  TODOS:         'zenfocus_todos',         // { id: string, text: string, done: boolean, createdAt: number }[]
  NOTES:         'zenfocus_notes',
  MUSIC_PLAYING: 'zenfocus_music_playing',
  VOLUME:        'zenfocus_volume',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export type UserRole = 'student' | 'developer';
