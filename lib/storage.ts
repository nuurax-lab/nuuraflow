// lib/storage.ts — NuuraFlow localStorage key constants
export const STORAGE_KEYS = {
  NAME:          'nuuraflow_name',
  USER_ROLE:     'nuuraflow_role',       // 'student' | 'developer'
  YT_URL:        'nuuraflow_yt_url',
  POMODORO_MIN:  'nuuraflow_pomodoro_min',
  BREAK_MIN:     'nuuraflow_break_min',
  SESSIONS:      'nuuraflow_sessions',      // { date: string, count: number }
  GOAL:          'nuuraflow_goal',          // { date: string, text: string, done: boolean }
  TODOS:         'nuuraflow_todos',         // { id: string, text: string, done: boolean, createdAt: number }[]
  NOTES:         'nuuraflow_notes',
  MUSIC_PLAYING: 'nuuraflow_music_playing',
  VOLUME:        'nuuraflow_volume',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export type UserRole = 'student' | 'developer';
