'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Video, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { CloudinaryAsset } from '@/types/upload';
import { UploadWidget } from './UploadWidget';

interface UploadAreaProps {
  onSuccess: (assets: CloudinaryAsset[]) => void;
  onError: (msg: string) => void;
}

export function UploadArea({ onSuccess, onError }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileName, setCurrentFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const validateFile = (file: File): string | null => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
      return `File "${file.name}" is not a supported image or video file.`;
    }
    // 100MB = 100 * 1024 * 1024 bytes
    if (file.size > 100 * 1024 * 1024) {
      return `File "${file.name}" exceeds the maximum 100MB size limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
    }
    return null;
  };

  const uploadFileDirectly = async (file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      onError(errorMsg);
      return;
    }

    if (!cloudName) {
      // Fallback message if env var not configured
      onError('Cloudinary Cloud Name is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local');
      return;
    }

    try {
      setUploading(true);
      setProgress(10);
      setCurrentFileName(file.name);

      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        timestamp,
      };

      // Step 1: Sign params via our server API route
      const signRes = await fetch('/api/sign-cloudinary-params', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign }),
      });

      if (!signRes.ok) {
        const signErr = await signRes.json().catch(() => ({}));
        throw new Error(signErr.error || 'Failed to sign upload request.');
      }

      const { signature } = await signRes.json();
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '';

      if (!apiKey) {
        throw new Error('NEXT_PUBLIC_CLOUDINARY_API_KEY is not defined in environment.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', apiKey);
      formData.append('signature', signature);

      const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      // Step 2: Perform upload with progress tracking via XMLHttpRequest
      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 90);
          setProgress(percent);
        }
      };

      const uploadPromise = new Promise<CloudinaryAsset>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            const asset: CloudinaryAsset = {
              public_id: data.public_id,
              secure_url: data.secure_url,
              url: data.url,
              format: data.format || file.name.split('.').pop() || '',
              resource_type: data.resource_type || resourceType,
              bytes: data.bytes || file.size,
              width: data.width,
              height: data.height,
              created_at: data.created_at || new Date().toISOString(),
              asset_id: data.asset_id,
              original_filename: data.original_filename || file.name,
              filename: file.name,
            };
            resolve(asset);
          } else {
            try {
              const errData = JSON.parse(xhr.responseText);
              reject(new Error(errData.error?.message || 'Upload failed'));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => reject(new Error('Network error during file upload'));
      });

      const uploadedAsset = await uploadPromise;
      setProgress(100);

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        setCurrentFileName('');
        onSuccess([uploadedAsset]);
      }, 400);

    } catch (err: unknown) {
      setUploading(false);
      setProgress(0);
      setCurrentFileName('');
      const message = err instanceof Error ? err.message : 'File upload failed';
      onError(message);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    for (const file of files) {
      await uploadFileDirectly(file);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    for (const file of files) {
      await uploadFileDirectly(file);
    }
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.998 }}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-8 md:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/20 shadow-xl shadow-emerald-500/10'
            : 'border-slate-300/80 hover:border-emerald-500/60 bg-white/70 backdrop-blur-md shadow-sm'
        }`}
      >
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

        {uploading ? (
          <div className="py-6 max-w-md mx-auto space-y-4">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 animate-pulse">
              <UploadCloud className="h-8 w-8 animate-bounce" />
            </div>

            <div>
              <p className="text-base font-bold text-slate-900 truncate">
                Uploading {currentFileName || 'file'}...
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Directing file to Cloudinary storage vault
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <motion.div
                className="bg-emerald-500 h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Progress</span>
              <span className="text-emerald-600">{progress}%</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upload Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-inner">
                  <UploadCloud className="h-10 w-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Title & Drag prompt */}
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Drag & drop your files here
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Support for high-resolution images and videos up to <span className="font-bold text-slate-700">100MB</span>.
              </p>
            </div>

            {/* File format badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-1">
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700">
                <ImageIcon className="h-4 w-4 text-emerald-600" />
                <span>🖼 Images (PNG, JPG, WebP, GIF, SVG)</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700">
                <Video className="h-4 w-4 text-emerald-600" />
                <span>🎥 Videos (MP4, WebM, MOV)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary cursor-pointer shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                <UploadCloud className="h-5 w-5" />
                Browse Local Files
              </button>

              <UploadWidget onSuccess={onSuccess} onError={onError}>
                {(openWidget) => (
                  <button
                    type="button"
                    onClick={openWidget}
                    className="btn-secondary cursor-pointer"
                  >
                    Open Cloudinary Widget
                  </button>
                )}
              </UploadWidget>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
