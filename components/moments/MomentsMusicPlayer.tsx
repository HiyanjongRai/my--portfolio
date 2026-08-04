'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  ListMusic,
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
  coverUrl?: string;
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'safar',
    title: 'Safar',
    artist: 'Bayaan & Sherazam',
    url: 'https://music.youtube.com/watch?v=zfWlGsiFDzk&t=100s',
    youtubeId: 'zfWlGsiFDzk',
    startTime: 100,
  },
  {
    id: 'alag-aasmaan',
    title: 'Alag Aasmaan',
    artist: 'Anuv Jain',
    url: 'https://music.youtube.com/watch?v=i1IDh_ZoJgI&t=64s',
    youtubeId: 'i1IDh_ZoJgI',
    startTime: 64,
  },
];

interface MomentsMusicPlayerProps {
  customPlaylist?: Track[];
}

export function MomentsMusicPlayer({ customPlaylist }: MomentsMusicPlayerProps) {
  const playlist = customPlaylist && customPlaylist.length > 0 ? customPlaylist : DEFAULT_PLAYLIST;

  const [showPrompt, setShowPrompt] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];
  const isYouTube = Boolean(currentTrack.youtubeId);

  // Show prompt after 1.2s if not dismissed or accepted
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('moments_music_dismissed');
      if (!dismissed && !hasAccepted) {
        setShowPrompt(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [hasAccepted]);

  // HTML5 audio volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  // Handle track changes for HTML5
  useEffect(() => {
    if (audioRef.current && !isYouTube && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (isYouTube) {
      setIsPlaying((p) => !p);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const handleAccept = () => {
    setShowPrompt(false);
    setHasAccepted(true);
    setIsPlaying(true);
    setShowTrackList(true);
    if (!isYouTube && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setHasAccepted(false);
    setIsPlaying(false);
    sessionStorage.setItem('moments_music_dismissed', 'true');
  };

  const nextTrack = () => setCurrentTrackIndex((p) => (p + 1) % playlist.length);
  const prevTrack = () => setCurrentTrackIndex((p) => (p - 1 + playlist.length) % playlist.length);

  const handleTrackSelect = (i: number) => {
    setCurrentTrackIndex(i);
    setShowTrackList(false);
    setIsPlaying(true);
  };

  return (
    <>
      {/* Hidden HTML5 audio */}
      {!isYouTube && (
        <audio ref={audioRef} src={currentTrack.url} onEnded={nextTrack} preload="metadata" />
      )}

      {/* Hidden YouTube iframe */}
      {isYouTube && isPlaying && (
        <div className="fixed -bottom-[999px] left-0 opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
          <iframe
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&start=${currentTrack.startTime || 0}&enablejsapi=1&playsinline=1`}
            title={currentTrack.title}
            allow="autoplay; encrypted-media"
          />
        </div>
      )}

      {/* ── Prompt Banner ─────────────────────────────────────── */}
      <AnimatePresence>
        {showPrompt && !hasAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:bottom-8 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[320px]"
          >
            <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/25">
                  <Music className="h-4 w-4 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">My Playlist</p>
                  <h4 className="text-sm font-bold text-white leading-tight">Wanna listen while you explore?</h4>
                </div>
              </div>

              {/* Track preview */}
              <div className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Music className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-white/50 truncate">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Yes, play it!
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 text-white/60 hover:text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Player Widget ─────────────────────────────── */}
      <AnimatePresence>
        {hasAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:bottom-8 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[300px]"
          >
            {/* Tracklist popup */}
            <AnimatePresence>
              {showTrackList && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="mb-2 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/8">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-white/60 uppercase tracking-wide">
                      <ListMusic className="h-3 w-3 text-emerald-400" />
                      Playlist
                    </span>
                    <button
                      onClick={() => setShowTrackList(false)}
                      className="text-white/30 hover:text-white/70 transition-colors cursor-pointer p-0.5"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="py-1.5 max-h-52 overflow-y-auto">
                    {playlist.map((track, i) => (
                      <div
                        key={track.id}
                        className={`flex items-center gap-2.5 px-3 py-2 mx-1 rounded-xl transition-colors ${
                          i === currentTrackIndex
                            ? 'bg-emerald-500/15 border border-emerald-500/20'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <button
                          onClick={() => handleTrackSelect(i)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <p className={`text-xs font-bold truncate ${i === currentTrackIndex ? 'text-emerald-300' : 'text-white/80'}`}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                        </button>
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-white/25 hover:text-emerald-400 transition-colors p-1"
                          title="Open on YouTube Music"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main player card */}
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Top bar: track info + collapse + close */}
              <div className="flex items-center gap-3 px-3 pt-3 pb-2">
                {/* Equalizer icon */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                  {isPlaying ? (
                    <span className="flex items-end gap-[2px] h-3.5">
                      <span className="w-[3px] rounded-full bg-emerald-400 animate-bounce" style={{ height: '100%', animationDelay: '0ms', animationDuration: '0.8s' }} />
                      <span className="w-[3px] rounded-full bg-emerald-400 animate-bounce" style={{ height: '60%', animationDelay: '150ms', animationDuration: '0.8s' }} />
                      <span className="w-[3px] rounded-full bg-emerald-400 animate-bounce" style={{ height: '80%', animationDelay: '300ms', animationDuration: '0.8s' }} />
                      <span className="w-[3px] rounded-full bg-emerald-400 animate-bounce" style={{ height: '40%', animationDelay: '75ms', animationDuration: '0.8s' }} />
                    </span>
                  ) : (
                    <Music className="h-4 w-4 text-emerald-400" />
                  )}
                </div>

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-white/45 truncate">{currentTrack.artist}</p>
                </div>

                {/* Collapse & Close */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setIsCollapsed((c) => !c)}
                    className="p-1 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                  >
                    <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="p-1 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                    title="Close player"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Controls row */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-3 pb-3 pt-1">
                      {/* Prev */}
                      <button
                        onClick={prevTrack}
                        className="p-2 text-white/40 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
                        title="Previous"
                      >
                        <SkipBack className="h-4 w-4" />
                      </button>

                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/25"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        )}
                      </button>

                      {/* Next */}
                      <button
                        onClick={nextTrack}
                        className="p-2 text-white/40 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
                        title="Next"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>

                      {/* Playlist */}
                      <button
                        onClick={() => setShowTrackList((s) => !s)}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${showTrackList ? 'text-emerald-400 bg-emerald-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        title="Playlist"
                      >
                        <ListMusic className="h-4 w-4" />
                      </button>

                      {/* Mute */}
                      <button
                        onClick={() => setIsMuted((m) => !m)}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${isMuted ? 'text-rose-400 bg-rose-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
