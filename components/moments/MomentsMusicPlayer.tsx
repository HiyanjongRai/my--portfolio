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
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  youtubeId?: string;
  startTime?: number; // in seconds (e.g. 100 for 1m 40s)
  coverUrl?: string;
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'alag-aasmaan',
    title: 'Alag Aasmaan',
    artist: 'Anuv Jain',
    url: 'https://music.youtube.com/watch?v=i1IDh_ZoJgI&t=64s',
    youtubeId: 'i1IDh_ZoJgI',
    startTime: 64, // 1m 04s
  },
  {
    id: 'junkeri',
    title: 'Junkeri',
    artist: 'Bipul Chettri',
    url: 'https://music.youtube.com/watch?v=ChOV_o7JeJo&t=119s',
    youtubeId: 'ChOV_o7JeJo',
    startTime: 119, // 1m 59s
  },
  {
    id: 'ram-sailee',
    title: 'Ram Sailee',
    artist: 'Bipul Chettri',
    url: 'https://music.youtube.com/watch?v=8pQtKDGLR0Y&t=85s',
    youtubeId: '8pQtKDGLR0Y',
    startTime: 85, // 1m 25s
  },
  {
    id: 'safar',
    title: 'Safar',
    artist: 'Bayaan & Sherazam',
    url: 'https://music.youtube.com/watch?v=zfWlGsiFDzk&t=100s',
    youtubeId: 'zfWlGsiFDzk',
    startTime: 100, // 1m 40s
  },
];

interface MomentsMusicPlayerProps {
  customPlaylist?: Track[];
}

export function MomentsMusicPlayer({ customPlaylist }: MomentsMusicPlayerProps) {
  const playlist = customPlaylist && customPlaylist.length > 0 ? customPlaylist : DEFAULT_PLAYLIST;

  const [showPrompt, setShowPrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];
  const isYouTube = Boolean(currentTrack.youtubeId);

  // Show friendly prompt 1.2s after loading if not dismissed
  useEffect(() => {
    const timer = setTimeout(() => {
      const promptSeen = sessionStorage.getItem('moments_music_prompt_dismissed');
      if (!promptSeen && !isPlaying) {
        setShowPrompt(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isPlaying]);

  // Handle standard HTML5 audio volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && !isYouTube) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, isYouTube]);

  const togglePlay = () => {
    if (isYouTube) {
      setIsPlaying((prev) => !prev);
      setShowPrompt(false);
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch((e) => {
        console.warn('Audio play error:', e);
      });
    }
  };

  const handlePromptAccept = () => {
    setShowPrompt(false);
    setIsPlaying(true);
    setShowTrackList(true);
    if (!isYouTube && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const handlePromptDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('moments_music_prompt_dismissed', 'true');
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setShowTrackList(false);
    setIsPlaying(true);
  };

  return (
    <>
      {/* HTML5 Audio Player (for standard MP3 tracks) */}
      {!isYouTube && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={nextTrack}
          preload="metadata"
        />
      )}

      {/* YouTube Embedded Audio Player (for YouTube / YT Music tracks) */}
      {isYouTube && isPlaying && (
        <div className="fixed -bottom-96 left-0 opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&start=${
              currentTrack.startTime || 0
            }&enablejsapi=1&playsinline=1`}
            title={currentTrack.title}
            allow="autoplay; encrypted-media"
          />
        </div>
      )}

      {/* ── 1. Initial Prompt / Banner ────────────────────────────── */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 text-white rounded-3xl p-4 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Music className="h-5 w-5 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Now Playing: {currentTrack.title}</span>
                </div>
                <h4 className="text-sm font-extrabold text-white mt-0.5">
                  Wanna listen to my playlist?
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Listen to <strong className="text-slate-200">{currentTrack.title}</strong> by {currentTrack.artist} {currentTrack.startTime ? `(starts at ${Math.floor(currentTrack.startTime / 60)}:${(currentTrack.startTime % 60).toString().padStart(2, '0')})` : ''} while viewing memories!
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handlePromptAccept}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Yes, play music!
                  </button>
                  <button
                    onClick={handlePromptDismiss}
                    className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    Not now
                  </button>
                </div>
              </div>

              <button
                onClick={handlePromptDismiss}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. Floating Controller Widget ───────────────────────── */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        {/* Playlist Selector Popup */}
        <AnimatePresence>
          {showTrackList && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-3 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 text-white rounded-2xl p-3 shadow-2xl space-y-2"
            >
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                  <ListMusic className="h-3.5 w-3.5 text-emerald-400" />
                  Playlist Tracks
                </span>
                <button
                  onClick={() => setShowTrackList(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                {playlist.map((track, i) => (
                  <div
                    key={track.id}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                      i === currentTrackIndex
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => handleTrackSelect(i)}
                      className="flex-1 text-left truncate pr-2 cursor-pointer"
                    >
                      <p className="font-bold truncate">{track.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {track.artist} {track.startTime ? `(Start: ${Math.floor(track.startTime / 60)}:${(track.startTime % 60).toString().padStart(2, '0')})` : ''}
                      </p>
                    </button>
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-emerald-400 p-1"
                      title="Open Link"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Bar */}
        <motion.div
          layout
          className="flex items-center gap-3 bg-slate-950/90 backdrop-blur-xl border border-slate-800 text-white rounded-full px-4 py-2.5 shadow-2xl shadow-slate-950/50"
        >
          {/* Equalizer / Minimize Icon */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-800/90 hover:bg-slate-700 text-emerald-400 transition-all cursor-pointer relative"
          >
            {isPlaying ? (
              <span className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 h-full bg-emerald-400 animate-[bounce_1s_infinite_100ms]" />
                <span className="w-0.5 h-2/3 bg-emerald-400 animate-[bounce_1s_infinite_300ms]" />
                <span className="w-0.5 h-4/5 bg-emerald-400 animate-[bounce_1s_infinite_200ms]" />
              </span>
            ) : (
              <Music className="h-4 w-4" />
            )}
          </button>

          {/* Track Details */}
          {!isMinimized && (
            <div className="hidden min-[420px]:block max-w-[130px] sm:max-w-[160px] truncate">
              <p className="text-xs font-extrabold text-white truncate leading-tight">
                {currentTrack.title}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 truncate">
                {currentTrack.artist} {currentTrack.startTime ? `(${Math.floor(currentTrack.startTime / 60)}:${(currentTrack.startTime % 60).toString().padStart(2, '0')})` : ''}
              </p>
            </div>
          )}

          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            {playlist.length > 1 && (
              <button
                onClick={prevTrack}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>

            {playlist.length > 1 && (
              <button
                onClick={nextTrack}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Playlist & Mute */}
          {!isMinimized && (
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              {playlist.length > 1 && (
                <button
                  onClick={() => setShowTrackList(!showTrackList)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showTrackList ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Playlist"
                >
                  <ListMusic className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
