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
          <span style={{ color: 'rgba(26,31,255,0.6)' }}>NUURA</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>FLOW</span>
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

      {/* Right — Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a
          href="https://github.com/nuurax-lab/nuuraflow"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.15)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.15)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>

        <span style={{ color: 'rgba(255,255,255,0.06)' }}>|</span>

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
