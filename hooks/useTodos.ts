'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEYS.TODOS, []);

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const newTodo: Todo = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: trimmed,
        done: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [...prev, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.done));
  }, [setTodos]);

  const reorderTodos = useCallback(
    (fromIndex: number, toIndex: number) => {
      setTodos((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        return updated;
      });
    },
    [setTodos]
  );

  const doneCount = todos.filter((t) => t.done).length;
  const totalCount = todos.length;

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, reorderTodos, doneCount, totalCount };
}
