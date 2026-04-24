'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PlusCircle, Trash2, Check, GripVertical, X } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';

export default function TodoList() {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput]         = useState('');
  const [mounted, setMounted]     = useState(false);
  const [dragIdx, setDragIdx]     = useState<number | null>(null);
  const [overIdx, setOverIdx]     = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos, doneCount, totalCount } = useTodos();

  useEffect(() => { setMounted(true); }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleAdd = useCallback(() => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
      // Keep input open for rapid entry
    }
  }, [input, addTodo]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') { setShowInput(false); setInput(''); }
  };

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    if (input.trim()) handleAdd();
    setShowInput(false);
    setInput('');
  };

  // Drag-and-drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    // Make drag image semi-transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.4';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      reorderTodos(dragIdx, overIdx);
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(index);
  };

  const handleDragLeave = () => {
    // Don't reset overIdx here — it causes flicker
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIdx !== null && dragIdx !== index) {
      reorderTodos(dragIdx, index);
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  if (!mounted) return null;

  const displayTodos = todos.slice(0, 10);

  return (
    <>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}>TASK LIST</span>
          {totalCount > 0 && (
            <span style={{
              padding: '2px 8px',
              background: 'rgba(26,31,255,0.2)',
              color: '#1A1FFF',
              fontSize: 10, fontWeight: 700,
              borderRadius: 9999,
              textTransform: 'uppercase',
            }}>
              {doneCount} OF {totalCount} DONE
            </span>
          )}
        </div>

        <button
          onClick={showInput ? closeInput : openInput}
          style={{
            color: showInput ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: showInput ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = showInput ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)'; }}
          title={showInput ? 'Close' : 'Add task'}
        >
          <PlusCircle size={20} />
        </button>
      </div>

      {/* Inline Add Field — animated slide-down */}
      <div style={{
        maxHeight: showInput ? 60 : 0,
        opacity: showInput ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginBottom: showInput ? 12 : 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px', borderRadius: 12,
          background: 'rgba(26,31,255,0.06)',
          border: '1px solid rgba(26,31,255,0.15)',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#1A1FFF',
            boxShadow: '0 0 8px rgba(26,31,255,0.4)',
            flexShrink: 0,
          }} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What needs to be done?"
            maxLength={120}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
            }}
          />
          {input.trim() && (
            <button onClick={handleAdd} style={{
              padding: '4px 12px', borderRadius: 8,
              background: '#1A1FFF', color: '#fff',
              fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#3b3fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1FFF'; }}
            >Add</button>
          )}
        </div>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto', maxHeight: 260 }}>
        {displayTodos.length === 0 && !showInput && (
          <p style={{
            textAlign: 'center', fontSize: 13,
            color: 'rgba(255,255,255,0.2)', padding: '24px 0',
            fontFamily: "'Inter', sans-serif",
          }}>
            No tasks yet. Click + to add one.
          </p>
        )}

        {displayTodos.map((todo, index) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              background: overIdx === index && dragIdx !== null && dragIdx !== index
                ? 'rgba(26,31,255,0.1)'
                : todo.done
                  ? 'rgba(255,255,255,0.03)'
                  : 'transparent',
              transition: 'all 0.2s',
              cursor: 'grab',
              borderTop: overIdx === index && dragIdx !== null && dragIdx !== index
                ? '2px solid rgba(26,31,255,0.4)'
                : '2px solid transparent',
            }}
            onMouseEnter={e => {
              if (dragIdx === null && !todo.done) {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              }
            }}
            onMouseLeave={e => {
              if (dragIdx === null) {
                (e.currentTarget as HTMLElement).style.background = todo.done ? 'rgba(255,255,255,0.03)' : 'transparent';
              }
            }}
          >
            {/* Drag handle */}
            <div style={{
              color: 'rgba(255,255,255,0.1)',
              cursor: 'grab',
              flexShrink: 0,
              display: 'flex', alignItems: 'center',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.1)'; }}
            >
              <GripVertical size={14} />
            </div>

            {/* Circular checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{
                width: 20, height: 20, borderRadius: '50%',
                border: todo.done ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                background: todo.done ? '#bfc2ff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              {todo.done && <Check size={12} color="#0100ac" strokeWidth={3} />}
            </button>

            {/* Task text */}
            <span style={{
              flex: 1,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, fontWeight: 400, lineHeight: '140%',
              color: todo.done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
              textDecoration: todo.done ? 'line-through' : 'none',
              transition: 'all 0.25s',
            }}>
              {todo.text}
            </span>

            {/* Delete */}
            <button
              onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
              style={{
                color: 'transparent', background: 'none', border: 'none',
                cursor: 'pointer', transition: 'color 0.2s', padding: 2, flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,100,100,0.6)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'transparent'; }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
