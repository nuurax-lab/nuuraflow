'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      width: '100%',
      padding: '16px 100px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
    }}>
      {/* Left — Copyright */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: 'rgba(255,255,255,0.2)',
        margin: 0,
      }}>
        © {year}{' '}
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}>
          <span style={{ color: 'rgba(26,31,255,0.6)' }}>ZEN</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>FOCUS</span>
        </span>
        {' '}— All rights reserved by{' '}
        <a
          href="https://www.nuurax.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(191,194,255,0.5)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#bfc2ff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(191,194,255,0.5)'; }}
        >
          Nuurax
        </a>
      </p>

      {/* Right — Legal links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/privacy" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.15)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.15)'; }}
        >
          Privacy Policy
        </Link>

        <span style={{ color: 'rgba(255,255,255,0.06)' }}>|</span>

        <Link href="/tos" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.15)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.15)'; }}
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
