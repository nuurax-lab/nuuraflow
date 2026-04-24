'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * SSR-safe localStorage hook with cross-component sync.
 * When one component updates a key, all other components
 * using the same key re-render with the new value.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, [key]);

  // Listen for cross-component sync events (same tab)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === key) {
        // Use setTimeout to avoid "Cannot update component while rendering another"
        setTimeout(() => setState(detail.value), 0);
      }
    };
    window.addEventListener('localstorage-sync', handler);

    // Also listen for cross-tab storage events
    const storageHandler = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try { setState(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('localstorage-sync', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
          // Dispatch async to avoid React render-phase conflicts
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent('localstorage-sync', { detail: { key, value: next } })
            );
          }, 0);
        } catch {
          // ignore write errors
        }
        return next;
      });
    },
    [key]
  );

  return [state, setValue];
}
