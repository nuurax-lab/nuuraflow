'use client';

/**
 * Background — Fixed aurora gradient mesh backdrop.
 * Purely decorative, no props needed.
 */
export default function Background() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      background: '#0A0E2A',
    }}>
      <div className="aurora-blob" style={{ width: 500, height: 500, background: '#1A1FFF', top: -100, left: -100 }} />
      <div className="aurora-blob" style={{ width: 400, height: 400, background: '#00C1CA', bottom: -100, right: -100 }} />
      <div className="aurora-blob" style={{ width: 300, height: 300, background: '#bfc2ff', top: '30%', left: '60%' }} />
    </div>
  );
}
