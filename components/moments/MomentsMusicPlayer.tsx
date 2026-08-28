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
  X,
  Sparkles,
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

      {/* ── Premium Monochrome Permission Prompt Banner ──────────────────────── */}
      <AnimatePresence>
        {showPrompt && !hasAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-[340px]"
          >
            <div className="relative rounded-2xl bg-black text-white p-5 border border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {/* Subtle close icon in corner */}
              <button
                onClick={handleDismissPrompt}
                className="absolute top-3.5 right-3.5 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                  AUDIO EXPERIENCE
                </span>
              </div>

              {/* Main Headline */}
              <h4 className="text-base font-bold text-white tracking-tight leading-snug mb-3">
                Listen to curated soundtrack while exploring?
              </h4>

              {/* Track Preview Card */}
              <div className="flex items-center gap-3 bg-neutral-900/90 rounded-xl p-3 mb-4 border border-neutral-800">
                <div className="h-9 w-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Music className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">{currentTrack.title}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{currentTrack.artist}</p>
                </div>
                {/* Visual equalizer waves indicator */}
                <div className="flex items-end gap-[2px] h-3 shrink-0 px-1 opacity-70">
                  <span className="w-[2px] rounded-full bg-white animate-pulse" style={{ height: '70%' }} />
                  <span className="w-[2px] rounded-full bg-white animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                  <span className="w-[2px] rounded-full bg-white animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAccept}
                  onTouchEnd={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 active:bg-neutral-300 text-black font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <Play className="h-3.5 w-3.5 fill-black" />
                  Play Music
                </button>
                <button
                  onClick={handleDismissPrompt}
                  className="py-2.5 px-4 rounded-xl bg-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white font-medium text-xs transition-all cursor-pointer border border-neutral-800 hover:border-neutral-700"
                >
                  Maybe Later
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
            className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50"
          >
            {/* Expanded panel */}
            <AnimatePresence>
              {showPanel && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[calc(100%+12px)] right-0 w-80 rounded-2xl overflow-hidden bg-black text-white border border-neutral-800 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                >
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 border-b border-neutral-800">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            NOW PLAYING
                          </p>
                        </div>
                        <p className="text-sm font-bold text-white truncate">{currentTrack.title}</p>
                        <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
                      </div>
                      {/* Collapse button */}
                      <button
                        onClick={() => setShowPanel(false)}
                        className="shrink-0 mt-0.5 h-7 w-7 flex items-center justify-center rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer border border-neutral-800"
                        title="Collapse"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-2 px-4 py-3.5 border-b border-neutral-800 bg-neutral-950/50">
                    <button
                      onClick={prevTrack}
                      className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="flex h-11 w-11 mx-1 items-center justify-center rounded-full bg-white hover:bg-neutral-200 active:bg-neutral-300 text-black transition-all active:scale-95 cursor-pointer shadow-md"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 fill-black" />
                      ) : (
                        <Play className="h-5 w-5 fill-black ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={nextTrack}
                      className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setIsMuted((m) => !m)}
                      className={`p-2.5 ml-1 rounded-full transition-all cursor-pointer ${
                        isMuted
                          ? 'text-white bg-neutral-800 border border-neutral-700'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Playlist */}
                  <div className="p-2 space-y-1">
                    {playlist.map((track, i) => (
                      <div
                        key={track.id}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          i === currentTrackIndex
                            ? 'bg-neutral-900 border border-neutral-700'
                            : 'hover:bg-neutral-900/60 border border-transparent'
                        }`}
                      >
                        {/* Track icon / animated equalizer */}
                        <div
                          className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border ${
                            i === currentTrackIndex
                              ? 'bg-black border-neutral-600 text-white'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                          }`}
                        >
                          {i === currentTrackIndex && isPlaying ? (
                            <span className="flex items-end gap-[2px] h-3.5">
                              <span className="w-[2px] rounded-full bg-white animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                              <span className="w-[2px] rounded-full bg-white animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '130ms' }} />
                              <span className="w-[2px] rounded-full bg-white animate-bounce" style={{ height: '75%', animationDuration: '0.65s', animationDelay: '65ms' }} />
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono font-bold">0{i + 1}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleTrackSelect(i)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <p className={`text-xs truncate font-semibold ${i === currentTrackIndex ? 'text-white font-bold' : 'text-neutral-300'}`}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate">{track.artist}</p>
                        </button>

                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-neutral-500 hover:text-white transition-colors p-1 cursor-pointer"
                          title="Open on YouTube Music"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
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
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black text-white border border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-neutral-600 transition-all cursor-pointer group"
              title={showPanel ? 'Collapse' : 'Open music player'}
            >
              {/* Pulsing subtle glow when playing */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-white/10 animate-ping pointer-events-none" />
              )}

              {/* Icon: equalizer when playing, music note when paused */}
              {isPlaying && !showPanel ? (
                <span className="flex items-end gap-[2.5px] h-4 relative z-10">
                  <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '100%', animationDuration: '0.65s', animationDelay: '0ms' }} />
                  <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '55%', animationDuration: '0.65s', animationDelay: '120ms' }} />
                  <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '80%', animationDuration: '0.65s', animationDelay: '240ms' }} />
                  <span className="w-[2.5px] rounded-full bg-white animate-bounce" style={{ height: '45%', animationDuration: '0.65s', animationDelay: '60ms' }} />
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

export default MomentsMusicPlayer;
