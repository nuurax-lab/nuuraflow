import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — ZenFocus',
  description: 'Privacy Policy for ZenFocus by Nuurax.',
};

export default function PrivacyPage() {
  const sectionStyle: React.CSSProperties = { marginBottom: 32 };
  const headingStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700, fontSize: 20, color: '#fff',
    marginBottom: 12,
  };
  const textStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14, lineHeight: '175%',
    color: 'rgba(255,255,255,0.55)',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0E2A',
      padding: '60px 100px', maxWidth: 800, margin: '0 auto',
    }}>
      <Link href="/" style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
        fontSize: '1.25rem', letterSpacing: '0.18em', textDecoration: 'none',
        display: 'inline-block', marginBottom: 40,
      }}>
        <span style={{ color: '#1A1FFF' }}>ZEN</span>
        <span style={{ color: '#fff' }}>FOCUS</span>
      </Link>

      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800, fontSize: 32, color: '#fff',
        marginBottom: 8,
      }}>Privacy Policy</h1>
      <p style={{ ...textStyle, marginBottom: 40, color: 'rgba(255,255,255,0.3)' }}>
        Last updated: April 25, 2026
      </p>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>1. Introduction</h2>
        <p style={textStyle}>
          Welcome to ZenFocus, a product by Nuurax. Your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you use ZenFocus.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>2. Information We Collect</h2>
        <p style={textStyle}>
          ZenFocus is a fully client-side application. <strong style={{ color: 'rgba(255,255,255,0.75)' }}>We do not collect, store,
          or transmit any personal data to our servers.</strong> All your data — including your name, tasks, goals,
          and preferences — is stored exclusively in your browser&apos;s localStorage on your device.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>3. Cookies & Local Storage</h2>
        <p style={textStyle}>
          ZenFocus uses browser localStorage to save your settings and progress. This data never leaves your
          device and can be cleared at any time by clearing your browser data.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>4. Third-Party Services</h2>
        <p style={textStyle}>
          ZenFocus embeds YouTube videos for ambient music playback. YouTube&apos;s own privacy policy applies to
          that service. We also display affiliate links to Hostinger — clicking these links takes you to
          Hostinger&apos;s website, which has its own privacy practices.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>5. Analytics</h2>
        <p style={textStyle}>
          We may use privacy-friendly analytics (such as Vercel Analytics) to understand general usage patterns.
          No personally identifiable information is collected through these tools.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>6. Changes to This Policy</h2>
        <p style={textStyle}>
          We may update this Privacy Policy from time to time. Changes will be reflected on this page with an
          updated &quot;Last updated&quot; date.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>7. Contact</h2>
        <p style={textStyle}>
          If you have questions about this policy, please contact us at{' '}
          <a href="https://www.nuurax.com" target="_blank" rel="noopener noreferrer"
            style={{ color: '#bfc2ff', textDecoration: 'underline' }}>
            www.nuurax.com
          </a>.
        </p>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 24, marginTop: 40,
      }}>
        <Link href="/" style={{ color: '#bfc2ff', fontSize: 13, textDecoration: 'none' }}>
          ← Back to ZenFocus
        </Link>
      </div>
    </div>
  );
}
