'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const DEFAULT_YT_URL = 'https://www.youtube.com/watch?v=jfKfPfyJRdk';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

function extractVideoId(url: string): string {
  if (!url) return '';
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : '';
}

function extractPlaylistId(url: string): string {
  if (!url) return '';
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

/** Animated equalizer bars */
function EqualizerBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12, flexShrink: 0 }}>
      {[40, 80, 60, 90].map((h, i) => (
        <div key={i} style={{
          width: 2, height: `${h}%`, background: '#bfc2ff',
          animation: `equalizerBar ${0.6 + i * 0.12}s ease-in-out infinite alternate`,
          transformOrigin: 'bottom',
        }} />
      ))}
    </div>
  );
}

function StaticBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12, flexShrink: 0 }}>
      {[40, 80, 60, 90].map((h, i) => (
        <div key={i} style={{ width: 2, height: `${h}%`, background: '#bfc2ff', opacity: 0.4 }} />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [ytUrl]             = useLocalStorage<string>(STORAGE_KEYS.YT_URL, '');
  const [volume, setVolume] = useLocalStorage<number>(STORAGE_KEYS.VOLUME, 70);

  const [mounted,   setMounted]   = useState(false);
  const [apiReady,  setApiReady]  = useState(false);
  const [title,     setTitle]     = useState('lofi hip hop radio');
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(false);

  const playerRef  = useRef<YT.Player | null>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { setMounted(true); }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    if (expanded) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.YT?.Player) { setApiReady(true); return; }
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id  = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
  }, []);

  // Update track title from player
  const updateTitle = useCallback(() => {
    try {
      const info = playerRef.current?.getVideoData?.();
      if (info?.title) setTitle(info.title);
    } catch {}
  }, []);

  // Initialize YT player — supports both single videos and playlists
  useEffect(() => {
    if (!apiReady || !mounted) return;
    const url = ytUrl || DEFAULT_YT_URL;
    const playlistId = extractPlaylistId(url);
    const videoId = extractVideoId(url);

    if (!videoId && !playlistId) return;

    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }

    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);

    const playerVars: Record<string, unknown> = {
      autoplay: 0,
      controls: 0,
      enablejsapi: 1,
    };

    // If it's a playlist, load the entire playlist
    if (playlistId) {
      playerVars.listType = 'playlist';
      playerVars.list = playlistId;
      setIsPlaylist(true);
    } else {
      setIsPlaylist(false);
    }

    playerRef.current = new window.YT.Player(div, {
      videoId: videoId || undefined,
      playerVars,
      events: {
        onReady: (e: YT.PlayerEvent) => {
          e.target.setVolume(volume);
          updateTitle();
        },
        onStateChange: (e: YT.OnStateChangeEvent) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            setPlaying(true);
            updateTitle();
          } else if (e.data === window.YT.PlayerState.PAUSED) {
            setPlaying(false);
          } else if (e.data === window.YT.PlayerState.ENDED) {
            // For single videos, just stop. For playlists, YT auto-advances.
            if (!playlistId) {
              setPlaying(false);
            }
          }
        },
      },
    });

    return () => {
      try { playerRef.current?.destroy(); } catch {}
      try { div.remove(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReady, mounted, ytUrl]);

  // Sync volume
  useEffect(() => {
    if (!playerRef.current) return;
    try { playerRef.current.setVolume(muted ? 0 : volume); } catch {}
  }, [volume, muted]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    if (!playerRef.current) return;
    try {
      if (playingRef.current) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch {}
  }, []);

  const nextTrack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault();
    if (!playerRef.current) return;
    try {
      if (isPlaylist) {
        // Use YT API to go to next video in playlist
        playerRef.current.nextVideo();
      } else {
        // Single video — seek forward 30s
        const cur = playerRef.current.getCurrentTime?.() || 0;
        playerRef.current.seekTo(cur + 30, true);
      }
      // Update title after a short delay to let YT switch
      setTimeout(updateTitle, 1500);
    } catch {}
  }, [isPlaylist, updateTitle]);

  const prevTrack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault();
    if (!playerRef.current) return;
    try {
      if (isPlaylist) {
        playerRef.current.previousVideo();
      } else {
        const cur = playerRef.current.getCurrentTime?.() || 0;
        playerRef.current.seekTo(Math.max(0, cur - 30), true);
      }
      setTimeout(updateTitle, 1500);
    } catch {}
  }, [isPlaylist, updateTitle]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const v = Number(e.target.value);
    setVolume(v);
    setMuted(v === 0);
  }, [setVolume]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault();
    setMuted(prev => !prev);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={panelRef} style={{ position: 'relative' }}>
      {/* ── Compact Pill ── */}
      <div
        className="glass-card"
        onClick={() => setExpanded(prev => !prev)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '6px 16px',
          borderColor: 'rgba(255,255,255,0.2)',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        {playing ? <EqualizerBars /> : <StaticBars />}
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 500, letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.8)',
          whiteSpace: 'nowrap', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{title}</span>
        <Music size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
      </div>

      {/* ── Expanded Controls ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 300, borderRadius: 16,
          background: 'rgba(10,14,42,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
          pointerEvents: expanded ? 'all' : 'none',
          transition: 'all 0.25s ease',
          padding: 20, zIndex: 999,
        }}
      >
        {/* Title */}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
          color: 'rgba(255,255,255,0.7)', marginBottom: 16,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>🎵 {title}</p>

        {/* Controls: Prev · Play/Pause · Next */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
          <button onClick={prevTrack}
            title={isPlaylist ? 'Previous track' : 'Back 30s'}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 4 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
          ><SkipBack size={18} /></button>

          <button onClick={togglePlay} style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#1A1FFF', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: '0 4px 20px rgba(26,31,255,0.4)',
            border: 'none', cursor: 'pointer',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >{playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}</button>

          <button onClick={nextTrack}
            title={isPlaylist ? 'Next track' : 'Forward 30s'}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 4 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
          ><SkipForward size={18} /></button>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggleMute} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: muted ? '#ff6b6b' : 'rgba(255,255,255,0.5)',
            transition: 'color 0.2s', flexShrink: 0, padding: 2,
          }}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>

          <input type="range" min={0} max={100}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1, height: 4, appearance: 'none',
              background: `linear-gradient(to right, #1A1FFF ${muted ? 0 : volume}%, rgba(255,255,255,0.1) ${muted ? 0 : volume}%)`,
              borderRadius: 2, cursor: 'pointer', outline: 'none',
            }}
          />

          <span style={{
            fontSize: 11, color: 'rgba(255,255,255,0.4)',
            fontFamily: "'DM Mono', monospace", minWidth: 28, textAlign: 'right',
          }}>{muted ? 0 : volume}%</span>
        </div>
      </div>
    </div>
  );
}
