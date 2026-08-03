'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

import { Stats } from '@/components/upload/Stats';
import { UploadArea } from '@/components/upload/UploadArea';
import { SearchFilter } from '@/components/upload/SearchFilter';
import { UploadedGrid } from '@/components/upload/UploadedGrid';
import { ToastContainer } from '@/components/upload/Toast';
import { MediaModal } from '@/components/upload/MediaModal';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

import {
  CloudinaryAsset,
  FilterCategory,
  SortOption,
  ToastMessage,
  UploadStatsData,
} from '@/types/upload';

interface UploadClientProps {
  isAuthorized: boolean;
  slug?: string;
}

export function UploadClient({ isAuthorized, slug }: UploadClientProps) {
  const router = useRouter();
  const [passkeyInput, setPasskeyInput] = useState('');
  const [keyError, setKeyError] = useState('');

  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Modals & Notifications
  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load assets from Cloudinary API & persistent localStorage on mount
  useEffect(() => {
    async function loadAllAssets() {
      let localAssets: CloudinaryAsset[] = [];
      try {
        const saved = localStorage.getItem('cloudinary_uploads_history');
        if (saved) localAssets = JSON.parse(saved);
      } catch {
        localAssets = [];
      }

      try {
        const res = await fetch('/api/cloudinary-assets');
        if (res.ok) {
          const data = await res.json();
          if (data.assets && Array.isArray(data.assets) && data.assets.length > 0) {
            const apiPublicIds = new Set(data.assets.map((a: CloudinaryAsset) => a.public_id));
            const uniqueLocal = localAssets.filter((a) => !apiPublicIds.has(a.public_id));
            const merged = [...data.assets, ...uniqueLocal];
            setAssets(merged);
            try {
              localStorage.setItem('cloudinary_uploads_history', JSON.stringify(merged));
            } catch {}
            setIsLoaded(true);
            return;
          }
        }
      } catch (e) {
        console.warn('Live API fetch failed, fallback to local history', e);
      }

      setAssets(localAssets);
      setIsLoaded(true);
    }

    loadAllAssets();
  }, []);

  // Save to localStorage on change
  const saveAssets = (newAssets: CloudinaryAsset[]) => {
    setAssets(newAssets);
    try {
      localStorage.setItem('cloudinary_uploads_history', JSON.stringify(newAssets));
    } catch (e) {
      console.error('Failed to save uploads history to localStorage', e);
    }
  };

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkeyInput.trim().toLowerCase();
    if (!cleanKey) {
      setKeyError('Please enter an access key');
      return;
    }

    if (cleanKey === 'hiyan') {
      router.push(`/upload/${cleanKey}`);
    } else {
      setKeyError('Invalid access key. Use your authorized upload URL.');
    }
  };

  const handleUploadSuccess = (newUploadedAssets: CloudinaryAsset[]) => {
    const updated = [...newUploadedAssets, ...assets];
    saveAssets(updated);
    addToast(
      'success',
      'Upload completed successfully!',
      `Added ${newUploadedAssets.length} asset(s) directly to your Cloudinary storage.`
    );
  };

  const handleUploadError = (errorMsg: string) => {
    addToast('error', 'Upload failed', errorMsg);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied!', `${label} copied to clipboard.`);
  };

  const handleDeleteAsset = async (public_id: string) => {
    if (!isAuthorized) {
      addToast('error', 'Permission Denied', 'Unauthorized users cannot delete files.');
      return;
    }

    try {
      const assetToDelete = assets.find((a) => a.public_id === public_id);
      await fetch('/api/cloudinary-assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          public_id,
          resource_type: assetToDelete?.resource_type || 'image',
        }),
      });

      const updated = assets.filter((a) => a.public_id !== public_id);
      saveAssets(updated);
      addToast('info', 'Asset deleted', `Successfully deleted asset "${public_id}" from storage.`);
    } catch (err) {
      console.error('Failed to delete asset from API:', err);
      const updated = assets.filter((a) => a.public_id !== public_id);
      saveAssets(updated);
      addToast('info', 'Asset removed', `Removed asset "${public_id}" from upload list.`);
    }
  };

  // Compute stats dynamically
  const stats: UploadStatsData = useMemo(() => {
    let imagesCount = 0;
    let videosCount = 0;
    let totalBytes = 0;

    assets.forEach((a) => {
      if (a.resource_type === 'video' || a.format === 'mp4' || a.format === 'webm') {
        videosCount++;
      } else {
        imagesCount++;
      }
      totalBytes += a.bytes || 0;
    });

    return {
      totalUploads: assets.length,
      totalImages: imagesCount,
      totalVideos: videosCount,
      totalStorageBytes: totalBytes,
    };
  }, [assets]);

  // Filter & Sort logic
  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) => {
        if (category === 'image') {
          if (asset.resource_type === 'video' || asset.format === 'mp4' || asset.format === 'webm') {
            return false;
          }
        }
        if (category === 'video') {
          if (asset.resource_type !== 'video' && asset.format !== 'mp4' && asset.format !== 'webm') {
            return false;
          }
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchFilename = (asset.filename || asset.original_filename || '').toLowerCase().includes(q);
          const matchPublicId = asset.public_id.toLowerCase().includes(q);
          return matchFilename || matchPublicId;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortBy === 'name-asc') {
          const nameA = a.filename || a.public_id;
          const nameB = b.filename || b.public_id;
          return nameA.localeCompare(nameB);
        }
        if (sortBy === 'name-desc') {
          const nameA = a.filename || a.public_id;
          const nameB = b.filename || b.public_id;
          return nameB.localeCompare(nameA);
        }
        return 0;
      });
  }, [assets, category, searchQuery, sortBy]);

  return (
    <div className="relative min-h-screen bg-slate-50/50 antialiased text-slate-900 font-sans">
      <ScrollProgress />
      <Header />

      <main className="mx-auto max-w-7xl px-6 md:px-8 py-12 space-y-10">
        {/* Page Hero Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
            {isAuthorized ? (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Authorized Admin Vault: /upload/{slug || 'hiyan'}
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                Restricted Access Vault
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Cloudinary Upload Center<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            {isAuthorized
              ? 'Upload, manage, and delete images and videos directly from your signed Cloudinary storage vault.'
              : 'Public media gallery view. Authorized secret URL key required to upload or delete files.'}
          </p>
        </div>

        {/* Restricted Access Login Banner for Unauthorized Users */}
        {!isAuthorized && (
          <div className="max-w-xl mx-auto rounded-3xl border border-amber-200 bg-amber-50/70 p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Enter Upload Access Key
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Visiting without a secret key? Enter your key to unlock upload & delete permissions.
                </p>
              </div>
            </div>

            <form onSubmit={handleKeySubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your access key"
                value={passkeyInput}
                onChange={(e) => {
                  setPasskeyInput(e.target.value);
                  setKeyError('');
                }}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-95 cursor-pointer"
              >
                Unlock
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {keyError && (
              <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {keyError}
              </p>
            )}
          </div>
        )}

        {/* Top Statistics Cards */}
        <Stats stats={stats} />

        {/* Main Upload Dropzone — ONLY visible when authorized */}
        {isAuthorized && (
          <div className="max-w-4xl mx-auto">
            <UploadArea onSuccess={handleUploadSuccess} onError={handleUploadError} />
          </div>
        )}

        {/* Search, Filter & Sort Controls */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Uploaded Media Library
            </h2>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredAssets.length} of {assets.length} total
            </span>
          </div>

          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredAssets.length}
          />

          {/* Uploaded Files Grid */}
          <UploadedGrid
            assets={filteredAssets}
            loading={!isLoaded}
            onPreview={(asset) => setSelectedAsset(asset)}
            onCopy={handleCopy}
            onDelete={handleDeleteAsset}
            isAuthorized={isAuthorized}
          />
        </div>
      </main>

      <Footer />

      {/* Lightbox Preview Modal */}
      <MediaModal
        asset={selectedAsset}
        assets={filteredAssets}
        onClose={() => setSelectedAsset(null)}
        onCopy={handleCopy}
        onNavigate={(asset) => setSelectedAsset(asset)}
      />

      {/* Toast Notifications Stack */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
