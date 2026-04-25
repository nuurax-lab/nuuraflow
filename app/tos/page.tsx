import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — NuuraFlow',
  description: 'Terms of Service for NuuraFlow by Nuurax.',
};

export default function TermsPage() {
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
        <span style={{ color: '#1A1FFF' }}>NUURA</span>
        <span style={{ color: '#fff' }}>FLOW</span>
      </Link>

      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800, fontSize: 32, color: '#fff',
        marginBottom: 8,
      }}>Terms of Service</h1>
      <p style={{ ...textStyle, marginBottom: 40, color: 'rgba(255,255,255,0.3)' }}>
        Last updated: April 25, 2026
      </p>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>1. Acceptance of Terms</h2>
        <p style={textStyle}>
          By accessing and using NuuraFlow, you agree to be bound by these Terms of Service. If you do not
          agree to these terms, please do not use the application. NuuraFlow is a product developed and maintained
          by Nuurax.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>2. Description of Service</h2>
        <p style={textStyle}>
          NuuraFlow is a free, browser-based productivity dashboard designed for developers and students. It
          provides tools including a Pomodoro timer, task management, daily goal setting, ambient music
          playback, and motivational quotes. The application runs entirely in your browser.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>3. User Data & Storage</h2>
        <p style={textStyle}>
          All user data is stored locally in your browser using localStorage. We do not maintain any server-side
          databases or user accounts. You are responsible for your own data. Clearing browser data will
          permanently delete your NuuraFlow settings, tasks, and progress.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>4. Affiliate Links & Third-Party Content</h2>
        <p style={textStyle}>
          NuuraFlow may display affiliate links and recommendations for third-party services, including but not
          limited to Hostinger. These links may generate a commission for Nuurax at no additional cost to you.
          We are not responsible for the content, practices, or services of any third-party websites.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>5. Intellectual Property</h2>
        <p style={textStyle}>
          All content, design, and code of NuuraFlow are the intellectual property of Nuurax. You may not
          reproduce, distribute, or create derivative works without explicit permission from Nuurax.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>6. Disclaimer of Warranties</h2>
        <p style={textStyle}>
          NuuraFlow is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or
          error-free operation. Use the application at your own risk.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>7. Limitation of Liability</h2>
        <p style={textStyle}>
          Nuurax shall not be liable for any damages arising from the use or inability to use NuuraFlow,
          including but not limited to data loss, productivity loss, or any indirect damages.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>8. Modifications</h2>
        <p style={textStyle}>
          Nuurax reserves the right to modify these terms at any time. Continued use of NuuraFlow after changes
          constitutes acceptance of the updated terms.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>9. Contact</h2>
        <p style={textStyle}>
          For questions regarding these terms, please visit{' '}
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
          ← Back to NuuraFlow
        </Link>
      </div>
    </div>
  );
}
