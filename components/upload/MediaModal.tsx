'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';
import { CldImage } from 'next-cloudinary';

interface MediaModalProps {
  asset: CloudinaryAsset | null;
  assets?: CloudinaryAsset[];
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
  onNavigate?: (asset: CloudinaryAsset) => void;
}

/** Turn a raw Cloudinary public_id into a readable display name */
function getDisplayName(asset: CloudinaryAsset): string {
  const raw =
    asset.filename ||
    asset.original_filename ||
    asset.public_id?.split('/').pop() ||
    '';

  const withoutExt = raw.replace(/\.[^.]+$/, '');
  const spaced = withoutExt.replace(/[-_.]+/g, ' ');
  const isHash = /^[a-z0-9]{10,}$/.test(spaced.trim());
  if (isHash) return 'Captured Moment';

  return spaced.replace(/\b\w/g, (c) => c.toUpperCase()).trim() || 'Captured Moment';
}

export function MediaModal({ asset, assets = [], onClose, onCopy, onNavigate }: MediaModalProps) {
  const [copied, setCopied] = React.useState(false);

  const currentIndex = assets.findIndex((a) => a.public_id === asset?.public_id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < assets.length - 1;

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onNavigate) onNavigate(assets[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext && onNavigate) onNavigate(assets[currentIndex + 1]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, hasPrev, hasNext, onClose, onNavigate, assets]);

  if (!asset) return null;

  const isVideo =
    asset.resource_type === 'video' ||
    asset.format === 'mp4' ||
    asset.format === 'webm' ||
    asset.format === 'mov';

  const displayName = getDisplayName(asset);

  const handleCopyUrl = () => {
    onCopy(asset.secure_url || asset.url, 'URL');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Prev Button */}
        {hasPrev && onNavigate && (
          <button
            onClick={() => onNavigate(assets[currentIndex - 1])}
            className="fixed left-4 md:left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl text-slate-800 hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && onNavigate && (
          <button
            onClick={() => onNavigate(assets[currentIndex + 1])}
            className="fixed right-4 md:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl text-slate-800 hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Modal */}
        <motion.div
          key={asset.public_id}
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 truncate">{displayName}</h3>
            <div className="flex items-center gap-1.5 shrink-0 ml-4">
              <a
                href={asset.secure_url || asset.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                title="Open original"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Media Preview */}
          <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-4 min-h-[260px]">
            {isVideo ? (
              <video
                controls
                autoPlay
                className="max-h-[65vh] max-w-full rounded-xl shadow-md"
                src={asset.secure_url || asset.url}
              />
            ) : asset.public_id && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
              <CldImage
                src={asset.public_id}
                alt={displayName}
                width={asset.width || 1200}
                height={asset.height || 800}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md"
              />
            ) : (
              <img
                src={asset.secure_url || asset.url}
                alt={displayName}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md"
              />
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 bg-white">
            {/* Counter */}
            {assets.length > 1 && (
              <span className="text-xs font-semibold text-slate-400">
                {currentIndex + 1} / {assets.length}
              </span>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <a
                href={asset.secure_url || asset.url}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-bold text-white transition shadow-md shadow-emerald-600/20"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
