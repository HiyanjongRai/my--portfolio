'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import {
  Copy,
  ExternalLink,
  Download,
  Trash2,
  Maximize2,
  Check,
  Film,
  Image as ImageIcon,
  Clock,
  HardDrive,
  Maximize,
  Key,
  Globe,
  Lock,
} from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';

interface UploadCardProps {
  asset: CloudinaryAsset;
  onPreview: (asset: CloudinaryAsset) => void;
  onCopy: (text: string, label: string) => void;
  onDelete: (public_id: string) => void;
  isAuthorized?: boolean;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diffInSeconds) || diffInSeconds < 30) return 'Uploaded just now';
  if (diffInSeconds < 60) return `Uploaded ${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `Uploaded ${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Uploaded ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `Uploaded ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;

  return `Uploaded on ${date.toLocaleDateString()}`;
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return 'Unknown size';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function UploadCard({ asset, onPreview, onCopy, onDelete, isAuthorized = false }: UploadCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isVideo = asset.resource_type === 'video' || asset.format === 'mp4' || asset.format === 'webm' || asset.format === 'mov';
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleCopy = (text: string, fieldName: string) => {
    onCopy(text, fieldName);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col"
    >
      {/* Media Preview Header */}
      <div className="relative aspect-video w-full bg-slate-950/90 overflow-hidden flex items-center justify-center group-hover:brightness-105 transition-all">
        {isVideo ? (
          <video
            src={asset.secure_url || asset.url}
            controls
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : cloudName && asset.public_id ? (
          <CldImage
            src={asset.public_id}
            alt={asset.public_id}
            width={600}
            height={337}
            crop="fill"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={asset.secure_url || asset.url}
            alt={asset.public_id}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Floating Format Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md border border-white/10">
          {isVideo ? <Film className="h-3.5 w-3.5 text-emerald-400" /> : <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />}
          <span className="uppercase">{asset.format || asset.resource_type}</span>
        </div>

        {/* Lightbox Trigger Overlay */}
        <button
          onClick={() => onPreview(asset)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-emerald-600 transition-colors shadow-md border border-white/10 opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Expand preview"
          aria-label="Expand preview"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Title and timestamp */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-extrabold text-slate-900 truncate leading-snug" title={asset.filename || asset.original_filename || asset.public_id}>
              {asset.filename || asset.original_filename || asset.public_id.split('/').pop()}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-1">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{getRelativeTime(asset.created_at)}</span>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="space-y-2 rounded-2xl bg-slate-50 border border-slate-200/70 p-3.5 text-xs text-slate-600 font-medium">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Key className="h-3 w-3 text-slate-400" /> Public ID
            </span>
            <span className="font-mono text-slate-900 truncate max-w-[140px]" title={asset.public_id}>
              {asset.public_id}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <HardDrive className="h-3 w-3 text-slate-400" /> Size
            </span>
            <span className="font-bold text-slate-900">{formatBytes(asset.bytes)}</span>
          </div>

          {asset.width && asset.height && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Maximize className="h-3 w-3 text-slate-400" /> Dimensions
              </span>
              <span className="font-bold text-slate-900">{asset.width} × {asset.height} px</span>
            </div>
          )}

          {asset.asset_id && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Key className="h-3 w-3 text-slate-400" /> Asset ID
              </span>
              <span className="font-mono text-slate-900 truncate max-w-[130px]" title={asset.asset_id}>
                {asset.asset_id}
              </span>
            </div>
          )}
        </div>

        {/* Copy Buttons */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            onClick={() => handleCopy(asset.url, 'URL')}
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 border border-slate-200/80 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer"
            title="Copy HTTP URL"
          >
            {copiedField === 'URL' ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Globe className="h-3 w-3 text-slate-500" />
                <span>Copy URL</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleCopy(asset.public_id, 'Public ID')}
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 border border-slate-200/80 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer"
            title="Copy Public ID"
          >
            {copiedField === 'Public ID' ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-slate-500" />
                <span>Public ID</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleCopy(asset.secure_url || asset.url, 'Secure URL')}
            className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-100 border border-slate-200/80 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer"
            title="Copy Secure HTTPS URL"
          >
            {copiedField === 'Secure URL' ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Lock className="h-3 w-3 text-slate-500" />
                <span>Secure URL</span>
              </>
            )}
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <a
              href={asset.secure_url || asset.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
            <span className="text-slate-300">•</span>
            <a
              href={asset.secure_url || asset.url}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </div>

          {isAuthorized && (
            <button
              onClick={() => onDelete(asset.public_id)}
              className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              title="Remove from history"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
