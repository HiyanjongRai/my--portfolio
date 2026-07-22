'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { Maximize2, Download, Copy, Check, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';

interface PinterestGridProps {
  assets: CloudinaryAsset[];
  loading?: boolean;
  onPreview: (asset: CloudinaryAsset) => void;
  onCopy: (text: string, label: string) => void;
}

export function PinterestGrid({ assets, loading = false, onPreview, onCopy }: PinterestGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleCopyUrl = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    onCopy(url, 'Image URL');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {[180, 260, 220, 320, 190, 280, 240, 200].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}px` }}
            className="break-inside-avoid rounded-3xl bg-slate-200/80 animate-pulse border border-slate-200"
          />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-slate-300 bg-white/70 backdrop-blur-md p-16 text-center my-8 max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Sparkles className="h-10 w-10" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          No moments captured yet
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Upload photos or videos in the Upload Center to build your Pinterest-style moments gallery.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <AnimatePresence mode="popLayout">
        {assets.map((asset, idx) => {
          const isVideo = asset.resource_type === 'video' || asset.format === 'mp4' || asset.format === 'webm';
          const filename = asset.filename || asset.original_filename || asset.public_id.split('/').pop() || 'Moment';

          return (
            <motion.div
              key={asset.public_id || asset.secure_url}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
              onClick={() => onPreview(asset)}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl bg-slate-900 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200/80 hover:border-emerald-500/40"
            >
              {/* Media Display */}
              {isVideo ? (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <video
                    src={asset.secure_url || asset.url}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md border border-white/10">
                    <Film className="h-3.5 w-3.5 text-emerald-400" />
                    <span>VIDEO</span>
                  </div>
                </div>
              ) : cloudName && asset.public_id ? (
                <div className="relative w-full overflow-hidden">
                  <CldImage
                    src={asset.public_id}
                    alt={filename}
                    width={asset.width || 600}
                    height={asset.height || 800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md border border-white/10">
                    <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="uppercase">{asset.format || 'PHOTO'}</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full overflow-hidden">
                  <img
                    src={asset.secure_url || asset.url}
                    alt={filename}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Hover Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => handleCopyUrl(e, asset.secure_url || asset.url, asset.public_id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-emerald-600 transition-colors shadow-md border border-white/10"
                    title="Copy URL"
                  >
                    {copiedId === asset.public_id ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <a
                    href={asset.secure_url || asset.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-emerald-600 transition-colors shadow-md border border-white/10"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white truncate" title={filename}>
                    {filename}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                    <span>{asset.width && asset.height ? `${asset.width}×${asset.height}px` : asset.format}</span>
                    <span className="flex items-center gap-1 font-sans font-bold text-emerald-400">
                      <Maximize2 className="h-3 w-3" /> Expand
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
