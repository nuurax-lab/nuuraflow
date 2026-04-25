# ✨ NuuraFlow — The Aesthetic Coder's Dashboard

A stunning, browser-based productivity dashboard built for developers and students. Deep work mode with a beautiful UI — live clock, Pomodoro timer, lofi music, daily goals, task management, and motivational quotes.

![NuuraFlow](https://img.shields.io/badge/Built%20by-Nuurax-1A1FFF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

## 🚀 Features

- **🕐 Live Clock** — Real-time display with time-aware greetings (Night Owl mode 🦉, Midnight Oil 🌙)
- **⏱ Pomodoro Timer** — Configurable focus/break cycles with session tracking
- **🎵 Ambient Music** — YouTube audio-only player for lofi/ambient playlists
- **🎯 Daily Focus** — Single daily goal with auto-reset at midnight
- **📝 Task List** — Drag-and-drop reorder, inline add, completion tracking
- **💬 Smart Quotes** — 200 motivational quotes, personalized for Students 📚 or Developers 💻
- **⚙️ Settings Panel** — Name, role, music URL, timer customization
- **🔒 Privacy-First** — 100% client-side, all data in localStorage, zero tracking

## 🎨 Design

- Glassmorphism UI with blur effects
- Bento grid layout
- Aurora gradient background
- Custom typography (Space Grotesk + Inter + DM Mono)
- Smooth micro-animations

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/nuurax-lab/nuuraflow.git
cd nuuraflow

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
NuuraFlow/
├── app/
│   ├── layout.tsx          # Root layout + fonts + metadata
│   ├── page.tsx            # Main dashboard (bento grid)
│   ├── globals.css         # Design tokens + animations
│   ├── privacy/page.tsx    # Privacy Policy
│   └── tos/page.tsx        # Terms of Service
├── components/
│   ├── AffiliateBanner.tsx  # Dynamic recommendation banner
│   ├── Background.tsx       # Aurora gradient backdrop
│   ├── Clock.tsx            # Live clock + greeting
│   ├── DailyGoal.tsx        # Daily focus goal
│   ├── Footer.tsx           # Copyright + legal links
│   ├── MusicPlayer.tsx      # YouTube audio player
│   ├── PomodoroTimer.tsx    # Focus/break timer
│   ├── QuoteCard.tsx        # Rotating motivational quotes
│   ├── SettingsPanel.tsx    # User preferences panel
│   └── TodoList.tsx         # Drag-and-drop task list
├── hooks/
│   ├── useLocalStorage.ts   # SSR-safe localStorage hook
│   ├── usePomodoro.ts       # Timer logic hook
│   └── useTodos.ts          # Task management hook
├── lib/
│   ├── quotes.ts            # 200 curated quotes
│   └── storage.ts           # localStorage key constants
└── public/
    └── nficon.png           # App icon
```

## 🌐 Deployment

Deploy instantly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nuurax-lab/nuuraflow)

No environment variables needed — everything runs client-side.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, customize it for your personal use, or submit a PR with new features.

```bash
# Fork & clone
git clone https://github.com/YOUR_USERNAME/nuuraflow.git

# Create a feature branch
git checkout -b feature/my-awesome-feature

# Commit & push
git commit -m "feat: add my awesome feature"
git push origin feature/my-awesome-feature

# Open a Pull Request
```

## 📄 Legal

- [Privacy Policy](/privacy)
- [Terms of Service](/tos)

## 📝 License

This project is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — © 2026 [Nuurax](https://www.nuurax.com). All rights reserved.
