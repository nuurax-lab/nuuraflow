import type { Metadata } from 'next';
import { Space_Grotesk, Inter, DM_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'ZenFocus — The Aesthetic Coder\'s Dashboard',
  description:
    'A browser-based aesthetic dashboard for developers. Deep work mode: live clock, Pomodoro timer, lofi music, daily goals, and to-do list — all in one beautiful space.',
  keywords: ['developer tools', 'productivity', 'pomodoro', 'aesthetic', 'lofi', 'deep work', 'focus'],
  authors: [{ name: 'Nuurax', url: 'https://nuurax.com' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ZenFocus — The Aesthetic Coder\'s Dashboard',
    description: 'Code in peace. Ship with purpose.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0E2A] text-[#e3e1f0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
