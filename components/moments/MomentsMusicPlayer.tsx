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

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Send postMessage to YouTube iframe
  const ytCommand = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*'
    );
  }, []);

  // Show prompt 1.5s after mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem('moments_music_dismissed');
    if (dismissed || hasAccepted) return;
    const t = setTimeout(() => setShowPrompt(true), 1500);
    return () => clearTimeout(t);
  }, [hasAccepted]);

  // Sync mute
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
    if (isPlaying) setTimeout(() => ytCommand('playVideo'), 500);
    if (isMuted) setTimeout(() => ytCommand('mute'), 600);
  }, [isPlaying, isMuted, ytCommand]);

  const togglePlay = () => {
    if (isPlaying) {
      ytCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      ytCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleAccept = () => {
    setShowPrompt(false);
    setHasAccepted(true);
    setIsPlaying(true);
    setShowPanel(true);
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false);
    sessionStorage.setItem('moments_music_dismissed', 'true');
  };

  const nextTrack = () => setCurrentTrackIndex((p) => (p + 1) % playlist.length);
  const prevTrack = () => setCurrentTrackIndex((p) => (p - 1 + playlist.length) % playlist.length);

  const handleTrackSelect = (i: number) => {
    if (i === currentTrackIndex) {
      togglePlay();
    } else {
      setCurrentTrackIndex(i);
    }
  };

  return (
    <>
      {/* Hidden YouTube iframe */}
      {hasAccepted && (
        <div className="fixed -bottom-[999px] -left-[999px] w-1 h-1 overflow-hidden pointer-events-none opacity-0">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&start=${currentTrack.startTime || 0}&enablejsapi=1&playsinline=1&controls=0`}
            title={currentTrack.title}
            allow="autoplay; encrypted-media"
            onLoad={handleIframeLoad}
          />
        </div>
      )}

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
            <div className="relative bg-[#0f172a] border border-[#10B981]/20 rounded-2xl p-4 shadow-[0_12px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 border border-[#10B981]/25 shadow-[0_0_14px_rgba(16,185,129,0.2)]">
                  <Music className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#10B981] uppercase tracking-widest mb-0.5">My Playlist</p>
                  <h4 className="text-sm font-bold text-white leading-snug">Wanna listen while you explore?</h4>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl px-3 py-2.5 mb-3 border border-white/5">
                <div className="h-7 w-7 rounded-lg bg-[#10B981]/15 flex items-center justify-center shrink-0">
                  <Music className="h-3.5 w-3.5 text-[#10B981]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-white/45 truncate">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#10B981] hover:bg-[#0ea572] text-white font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#10B981]/25"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Yes, play it!
                </button>
                <button
                  onClick={handleDismissPrompt}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 font-semibold text-xs transition-all cursor-pointer border border-white/5"
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
                  className="absolute bottom-[calc(100%+12px)] right-0 w-72 bg-[#0f172a] border border-[#10B981]/20 rounded-2xl overflow-hidden shadow-[0_12px_50px_rgba(0,0,0,0.6)]"
                >
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 border-b border-white/8">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-[#10B981] uppercase tracking-widest mb-0.5">Now Playing</p>
                        <p className="text-sm font-bold text-white truncate">{currentTrack.title}</p>
                        <p className="text-xs text-white/45 truncate">{currentTrack.artist}</p>
                      </div>
                      {/* Collapse button (chevron-down) replaces X */}
                      <button
                        onClick={() => setShowPanel(false)}
                        className="shrink-0 mt-0.5 h-7 w-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer"
                        title="Collapse"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-1 px-4 py-3 border-b border-white/8">
                    <button
                      onClick={prevTrack}
                      className="p-2.5 text-white/40 hover:text-[#10B981] hover:bg-[#10B981]/8 rounded-full transition-all cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="flex h-11 w-11 mx-1 items-center justify-center rounded-full bg-[#10B981] hover:bg-[#0ea572] text-white transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#10B981]/30"
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
                      className="p-2.5 text-white/40 hover:text-[#10B981] hover:bg-[#10B981]/8 rounded-full transition-all cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setIsMuted((m) => !m)}
                      className={`p-2.5 ml-1 rounded-full transition-all cursor-pointer ${
                        isMuted
                          ? 'text-red-400 bg-red-500/10'
                          : 'text-white/40 hover:text-[#10B981] hover:bg-[#10B981]/8'
                      }`}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Playlist */}
                  <div className="py-1.5">
                    {playlist.map((track, i) => (
                      <div
                        key={track.id}
                        className={`flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl transition-all ${
                          i === currentTrackIndex
                            ? 'bg-[#10B981]/10 border border-[#10B981]/25'
                            : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        {/* Track icon */}
                        <div
                          className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center ${
                            i === currentTrackIndex ? 'bg-[#10B981]/20' : 'bg-white/5'
                          }`}
                        >
                          {i === currentTrackIndex && isPlaying ? (
                            <span className="flex items-end gap-[2px] h-3.5">
                              <span className="w-[2.5px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                              <span className="w-[2.5px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '130ms' }} />
                              <span className="w-[2.5px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '75%', animationDuration: '0.65s', animationDelay: '65ms' }} />
                            </span>
                          ) : (
                            <Music className={`h-3.5 w-3.5 ${i === currentTrackIndex ? 'text-[#10B981]' : 'text-white/30'}`} />
                          )}
                        </div>

                        <button
                          onClick={() => handleTrackSelect(i)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <p className={`text-xs font-bold truncate ${i === currentTrackIndex ? 'text-[#10B981]' : 'text-white/75'}`}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-white/35 truncate">{track.artist}</p>
                        </button>

                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-white/20 hover:text-[#10B981] transition-colors p-1 cursor-pointer"
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

            {/* Circle button — always visible, toggles panel */}
            <button
              onClick={() => setShowPanel((s) => !s)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] border border-[#10B981]/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-[#10B981]/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-pointer group"
              title={showPanel ? 'Collapse' : 'Open music player'}
            >
              {/* Pulsing glow when playing */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-[#10B981]/15 animate-ping pointer-events-none" />
              )}

              {/* Icon: equalizer when playing, music note when paused */}
              {isPlaying && !showPanel ? (
                <span className="flex items-end gap-[2.5px] h-4 relative z-10">
                  <span className="w-[3px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                  <span className="w-[3px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '120ms' }} />
                  <span className="w-[3px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '80%', animationDuration: '0.65s', animationDelay: '240ms' }} />
                  <span className="w-[3px] rounded-full bg-[#10B981] animate-bounce" style={{ height: '45%', animationDuration: '0.65s', animationDelay: '60ms' }} />
                </span>
              ) : (
                <Music className="h-5 w-5 text-[#10B981] relative z-10 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
