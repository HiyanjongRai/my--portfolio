'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  youtubeId?: string;
  startTime?: number;
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'safar',
    title: 'Safar',
    artist: 'Bayaan & Sherazam',
    url: 'https://music.youtube.com/watch?v=zfWlGsiFDzk',
    youtubeId: 'zfWlGsiFDzk',
    startTime: 100,
  },
  {
    id: 'alag-aasmaan',
    title: 'Alag Aasmaan',
    artist: 'Anuv Jain',
    url: 'https://music.youtube.com/watch?v=i1IDh_ZoJgI',
    youtubeId: 'i1IDh_ZoJgI',
    startTime: 64,
  },
];

interface MomentsMusicPlayerProps {
  customPlaylist?: Track[];
}

export function MomentsMusicPlayer({ customPlaylist }: MomentsMusicPlayerProps) {
  const playlist =
    customPlaylist && customPlaylist.length > 0 ? customPlaylist : DEFAULT_PLAYLIST;

  const [showPrompt, setShowPrompt] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  // showPanel: whether the expanded card is open (false = minimized to circle)
  const [showPanel, setShowPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [origin, setOrigin] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(encodeURIComponent(window.location.origin));
    }
  }, []);

  // Send postMessage to YouTube iframe
  const ytCommand = useCallback((func: string, args: any[] = []) => {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    } catch {
      // Ignore cross-origin postMessage errors if iframe isn't ready
    }
  }, []);

  // Show prompt 1.5s after mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem('moments_music_dismissed');
    if (dismissed || hasAccepted) return;
    const t = setTimeout(() => setShowPrompt(true), 1500);
    return () => clearTimeout(t);
  }, [hasAccepted]);

  // Sync mute state
  useEffect(() => {
    if (!hasAccepted) return;
    ytCommand(isMuted ? 'mute' : 'unMute');
  }, [isMuted, ytCommand, hasAccepted]);

  // Reload iframe when track changes
  useEffect(() => {
    if (!hasAccepted) return;
    setIframeKey((k) => k + 1);
    setIsPlaying(true);
  }, [currentTrackIndex, hasAccepted]);

  const handleIframeLoad = useCallback(() => {
    if (isPlaying) {
      setTimeout(() => {
        ytCommand('unMute');
        ytCommand('playVideo');
      }, 300);
    }
    if (isMuted) {
      setTimeout(() => ytCommand('mute'), 400);
    }
  }, [isPlaying, isMuted, ytCommand]);

  const togglePlay = () => {
    if (isPlaying) {
      ytCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      ytCommand('unMute');
      ytCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleAccept = () => {
    setShowPrompt(false);
    setHasAccepted(true);
    setIsPlaying(true);
    setShowPanel(true);
    // Direct sync execution inside touch/click handler for mobile WebKit & Chromium autoplay unlock
    ytCommand('unMute');
    ytCommand('playVideo');
    setTimeout(() => {
      ytCommand('unMute');
      ytCommand('playVideo');
    }, 400);
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false);
    sessionStorage.setItem('moments_music_dismissed', 'true');
  };

  const nextTrack = () => {
    setCurrentTrackIndex((p) => (p + 1) % playlist.length);
    ytCommand('playVideo');
  };

  const prevTrack = () => {
    setCurrentTrackIndex((p) => (p - 1 + playlist.length) % playlist.length);
    ytCommand('playVideo');
  };

  const handleTrackSelect = (i: number) => {
    if (i === currentTrackIndex) {
      togglePlay();
    } else {
      setCurrentTrackIndex(i);
      ytCommand('playVideo');
    }
  };

  return (
    <>
      {/* 
        Always-mounted YouTube iframe. 
        Kept at 1x1px inside viewport (opacity 0.001) so mobile Safari & Chrome 
        do not freeze background media or reject iframe API commands.
      */}
      <div
        className="fixed bottom-0 right-0 w-[1px] h-[1px] overflow-hidden pointer-events-none opacity-[0.001] z-[-1]"
        aria-hidden="true"
      >
        <iframe
          key={iframeKey}
          ref={iframeRef}
          width="200"
          height="200"
          src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=${hasAccepted ? 1 : 0}&start=${currentTrack.startTime || 0}&enablejsapi=1&playsinline=1&controls=0${origin ? `&origin=${origin}` : ''}`}
          title={currentTrack.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          onLoad={handleIframeLoad}
        />
      </div>

      {/* ── Prompt Banner ──────────────────────────────────────── */}
      <AnimatePresence>
        {showPrompt && !hasAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.93 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:bottom-10 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[310px]"
          >
            <div className="relative rounded-2xl p-4 shadow-[0_14px_50px_rgba(0,0,0,0.22)]" style={{ background: '#059669' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 border border-white/30">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-white/90 uppercase tracking-widest mb-0.5">My Playlist</p>
                  <h4 className="text-sm font-black text-white leading-snug">Wanna listen while you explore?</h4>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/15 rounded-xl px-3 py-2.5 mb-3 border border-white/20">
                <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/25">
                  <Music className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-white/75 truncate">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAccept}
                  onTouchEnd={handleAccept}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white hover:bg-white/90 active:bg-white/80 font-extrabold text-xs transition-all active:scale-95 cursor-pointer shadow-md"
                  style={{ color: '#059669' }}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Yes, play it!
                </button>
                <button
                  onClick={handleDismissPrompt}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all cursor-pointer border border-white/25"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Circle Button + Panel ─────────────────────── */}
      <AnimatePresence>
        {hasAccepted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-24 right-4 sm:bottom-10 sm:right-6 z-50"
          >
            {/* Expanded panel */}
            <AnimatePresence>
              {showPanel && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[calc(100%+12px)] right-0 w-72 rounded-2xl overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
                  style={{ background: '#059669' }}
                >
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 border-b border-white/20">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-extrabold text-white/85 uppercase tracking-widest mb-0.5">Now Playing</p>
                        <p className="text-sm font-black text-white truncate">{currentTrack.title}</p>
                        <p className="text-xs text-white/75 truncate">{currentTrack.artist}</p>
                      </div>
                      {/* Collapse button */}
                      <button
                        onClick={() => setShowPanel(false)}
                        className="shrink-0 mt-0.5 h-7 w-7 flex items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20"
                        title="Collapse"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-1.5 px-4 py-3 border-b border-white/20">
                    <button
                      onClick={prevTrack}
                      className="p-2.5 text-white/75 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="flex h-11 w-11 mx-1 items-center justify-center rounded-full bg-white hover:bg-white/90 active:bg-white/80 transition-all active:scale-95 cursor-pointer shadow-md"
                      style={{ color: '#059669' }}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={nextTrack}
                      className="p-2.5 text-white/75 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setIsMuted((m) => !m)}
                      className={`p-2.5 ml-1 rounded-full transition-all cursor-pointer ${
                        isMuted
                          ? 'text-white bg-white/25 border border-white/30'
                          : 'text-white/75 hover:text-white hover:bg-white/15'
                      }`}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Playlist */}
                  <div className="py-1.5 px-1.5">
                    {playlist.map((track, i) => (
                      <div
                        key={track.id}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          i === currentTrackIndex
                            ? 'bg-white/20 border border-white/30'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        {/* Track icon / animated equalizer */}
                        <div
                          className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border ${
                            i === currentTrackIndex ? 'bg-white/25 border-white/35' : 'bg-white/10 border-white/15'
                          }`}
                        >
                          {i === currentTrackIndex && isPlaying ? (
                            <span className="flex items-end gap-[2px] h-3.5">
                              <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                              <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '130ms' }} />
                              <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '75%', animationDuration: '0.65s', animationDelay: '65ms' }} />
                            </span>
                          ) : (
                            <Music className={`h-3.5 w-3.5 ${i === currentTrackIndex ? 'text-white' : 'text-white/60'}`} />
                          )}
                        </div>

                        <button
                          onClick={() => handleTrackSelect(i)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <p className={`text-xs truncate font-bold ${i === currentTrackIndex ? 'text-white font-extrabold' : 'text-white/90'}`}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-white/65 truncate">{track.artist}</p>
                        </button>

                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-white/55 hover:text-white transition-colors p-1 cursor-pointer"
                          title="Open on YouTube Music"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circle FAB — always visible, toggles panel */}
            <button
              onClick={() => setShowPanel((s) => !s)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_6px_28px_rgba(0,0,0,0.22)] hover:opacity-90 transition-all cursor-pointer group"
              style={{ background: '#059669' }}
              title={showPanel ? 'Collapse' : 'Open music player'}
            >
              {/* Pulsing glow when playing */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-white/25 animate-ping pointer-events-none" />
              )}

              {/* Icon: equalizer when playing, music note when paused */}
              {isPlaying && !showPanel ? (
                <span className="flex items-end gap-[2.5px] h-4 relative z-10">
                  <span className="w-[3px] rounded-full bg-white animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                  <span className="w-[3px] rounded-full bg-white animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '120ms' }} />
                  <span className="w-[3px] rounded-full bg-white animate-bounce" style={{ height: '80%', animationDuration: '0.65s', animationDelay: '240ms' }} />
                  <span className="w-[3px] rounded-full bg-white animate-bounce" style={{ height: '45%', animationDuration: '0.65s', animationDelay: '60ms' }} />
                </span>
              ) : (
                <Music className="h-5 w-5 text-white relative z-10 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
