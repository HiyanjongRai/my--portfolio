'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FolderOpen } from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';
import { UploadCard } from './UploadCard';

interface UploadedGridProps {
  assets: CloudinaryAsset[];
  loading?: boolean;
  onPreview: (asset: CloudinaryAsset) => void;
  onCopy: (text: string, label: string) => void;
  onDelete: (public_id: string) => void;
  isAuthorized?: boolean;
}

export function UploadedGrid({
  assets,
  loading = false,
  onPreview,
  onCopy,
  onDelete,
  isAuthorized = false,
}: UploadedGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-slate-200/80 p-5 space-y-4 animate-pulse"
          >
            <div className="aspect-video w-full rounded-2xl bg-slate-200" />
            <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-5/6" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-8 bg-slate-100 rounded-xl" />
              <div className="h-8 bg-slate-100 rounded-xl" />
              <div className="h-8 bg-slate-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-slate-300 bg-white/70 backdrop-blur-md p-12 text-center my-6"
      >
        <div className="flex justify-center mb-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <FolderOpen className="h-10 w-10" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          No uploads yet
        </h3>
        <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto mt-1">
          Upload your first file above to view, manage, and share your Cloudinary assets.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {assets.map((asset) => (
          <UploadCard
            key={asset.public_id || asset.secure_url}
            asset={asset}
            onPreview={onPreview}
            onCopy={onCopy}
            onDelete={onDelete}
            isAuthorized={isAuthorized}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
