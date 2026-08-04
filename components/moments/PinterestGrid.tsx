'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { Maximize2, Download, Copy, Check, Film, Image as ImageIcon, Camera } from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';

interface PinterestGridProps {
  assets: CloudinaryAsset[];
  loading?: boolean;
  activeFilter?: 'all' | 'photos' | 'videos';
  onPreview: (asset: CloudinaryAsset) => void;
  onCopy: (text: string, label: string) => void;
}

function getDisplayName(asset: CloudinaryAsset): string {
  const raw = asset.filename || asset.original_filename || asset.public_id?.split('/').pop() || '';
  const withoutExt = raw.replace(/\.[^.]+$/, '');
  const spaced = withoutExt.replace(/[-_.]+/g, ' ');
  const isHash = /^[a-z0-9]{10,}$/.test(spaced.trim());
  if (isHash) return 'Captured Moment';
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase()).trim() || 'Captured Moment';
}

/* ── Skeleton Card ────────────────────────────────────── */
const skeletonHeights = [220, 310, 260, 380, 200, 290, 340, 230, 270, 320, 190, 280];

function SkeletonCard({ h }: { h: number }) {
  return (
    <div
      className="break-inside-avoid rounded-2xl bg-slate-200 animate-pulse mb-3"
      style={{ height: `${h}px` }}
    />
  );
}

/* ── Video Card ───────────────────────────────────────── */
function VideoCard({
  asset,
  onPreview,
  onCopy,
  idx,
}: {
  asset: CloudinaryAsset;
  onPreview: (a: CloudinaryAsset) => void;
  onCopy: (t: string, l: string) => void;
  idx: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);
  const name = getDisplayName(asset);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(asset.secure_url || asset.url, 'URL');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
      onClick={() => onPreview(asset)}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
      onTouchStart={() => videoRef.current?.play()}
      onTouchEnd={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
      className="break-inside-avoid mb-3 group relative overflow-hidden rounded-2xl bg-slate-950 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Aspect ratio wrapper — videos always 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden">
        <video
          ref={videoRef}
          src={asset.secure_url || asset.url}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Video badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
          <Film className="h-3 w-3 text-emerald-400" />
          VIDEO
        </div>
      </div>

      {/* Hover overlay — desktop only; touch users tap to expand */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 pointer-events-none transition-opacity duration-300 flex flex-col justify-between p-3 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:pointer-events-auto">
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-emerald-500 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <a
            href={asset.secure_url || asset.url}
            download
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-emerald-500 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-white truncate">{name}</p>
          <p className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
            <Maximize2 className="h-2.5 w-2.5" /> Tap to expand
          </p>
        </div>
      </div>

      {/* Persistent label on touch devices */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 [@media(hover:hover)]:hidden">
        <p className="text-xs font-bold text-white truncate">{name}</p>
        <p className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-0.5">
          <Maximize2 className="h-2.5 w-2.5" /> Tap to expand
        </p>
      </div>
    </motion.div>
  );
}

/* ── Image Card ───────────────────────────────────────── */
function ImageCard({
  asset,
  onPreview,
  onCopy,
  idx,
}: {
  asset: CloudinaryAsset;
  onPreview: (a: CloudinaryAsset) => void;
  onCopy: (t: string, l: string) => void;
  idx: number;
}) {
  const [copied, setCopied] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const name = getDisplayName(asset);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(asset.secure_url || asset.url, 'URL');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
      onClick={() => onPreview(asset)}
      className="break-inside-avoid mb-3 group relative overflow-hidden rounded-2xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image — natural aspect ratio for Pinterest effect */}
      <div className="relative w-full overflow-hidden">
        {cloudName && asset.public_id ? (
          <CldImage
            src={asset.public_id}
            alt={name}
            width={asset.width || 600}
            height={asset.height || 800}
            sizes="(max-width: 390px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
          />
        ) : (
          <img
            src={asset.secure_url || asset.url}
            alt={name}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
          />
        )}

        {/* Format badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
          <ImageIcon className="h-3 w-3 text-emerald-400" />
          {(asset.format || 'IMG').toUpperCase()}
        </div>
      </div>

      {/* Hover overlay — desktop only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 pointer-events-none transition-opacity duration-300 flex flex-col justify-between p-3 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:pointer-events-auto">
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-emerald-500 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <a
            href={asset.secure_url || asset.url}
            download
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-emerald-500 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-white truncate">{name}</p>
          <p className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
            <Maximize2 className="h-2.5 w-2.5" /> Tap to expand
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 [@media(hover:hover)]:hidden">
        <p className="text-xs font-bold text-white truncate">{name}</p>
        <p className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-0.5">
          <Maximize2 className="h-2.5 w-2.5" /> Tap to expand
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Grid ────────────────────────────────────────── */
export function PinterestGrid({
  assets,
  loading = false,
  activeFilter = 'all',
  onPreview,
  onCopy,
}: PinterestGridProps) {
  if (loading) {
    return (
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
        {skeletonHeights.map((h, i) => (
          <SkeletonCard key={i} h={h} />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    const emptyTitle =
      activeFilter === 'photos'
        ? 'No photos found'
        : activeFilter === 'videos'
        ? 'No videos found'
        : 'No moments yet';

    const emptyDesc =
      activeFilter === 'photos'
        ? 'No photos match your current filter.'
        : activeFilter === 'videos'
        ? 'No videos match your current filter.'
        : 'Upload photos or videos to start your gallery.';

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-16 text-center my-8 max-w-sm mx-auto"
      >
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            {activeFilter === 'videos' ? (
              <Film className="h-8 w-8 text-emerald-600" />
            ) : activeFilter === 'photos' ? (
              <ImageIcon className="h-8 w-8 text-emerald-600" />
            ) : (
              <Camera className="h-8 w-8 text-emerald-600" />
            )}
          </div>
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{emptyTitle}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">
          {emptyDesc}
        </p>
      </motion.div>
    );
  }

  return (
    /*
      Breakpoints:
      - Mobile (≤390px / iPhone 12 Pro): 2 columns
      - sm (640px+): 2 columns
      - md (768px+): 3 columns
      - lg (1024px+): 4 columns
    */
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
      <AnimatePresence mode="popLayout">
        {assets.map((asset, idx) => {
          const isVideo =
            asset.resource_type === 'video' ||
            asset.format === 'mp4' ||
            asset.format === 'webm' ||
            asset.format === 'mov';

          return isVideo ? (
            <VideoCard key={asset.public_id || asset.secure_url} asset={asset} onPreview={onPreview} onCopy={onCopy} idx={idx} />
          ) : (
            <ImageCard key={asset.public_id || asset.secure_url} asset={asset} onPreview={onPreview} onCopy={onCopy} idx={idx} />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
