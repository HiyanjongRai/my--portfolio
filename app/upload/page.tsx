'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/ui/header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

import { Stats } from '@/components/upload/Stats';
import { UploadArea } from '@/components/upload/UploadArea';
import { SearchFilter } from '@/components/upload/SearchFilter';
import { UploadedGrid } from '@/components/upload/UploadedGrid';
import { ToastContainer } from '@/components/upload/Toast';
import { MediaModal } from '@/components/upload/MediaModal';

import {
  CloudinaryAsset,
  FilterCategory,
  SortOption,
  ToastMessage,
  UploadStatsData,
} from '@/types/upload';

// Initial sample assets for elegant demo display if localStorage is empty
const INITIAL_DEMO_ASSETS: CloudinaryAsset[] = [
  {
    public_id: 'cld-sample-5',
    secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    url: 'http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    format: 'jpg',
    resource_type: 'image',
    bytes: 145020,
    width: 864,
    height: 576,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    asset_id: 'ast_demo_001',
    filename: 'flower_sample.jpg',
  },
  {
    public_id: 'cld-sample-video',
    secure_url: 'https://res.cloudinary.com/demo/video/upload/v1689874830/dog.mp4',
    url: 'http://res.cloudinary.com/demo/video/upload/v1689874830/dog.mp4',
    format: 'mp4',
    resource_type: 'video',
    bytes: 2450890,
    width: 1280,
    height: 720,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    asset_id: 'ast_demo_002',
    filename: 'playful_dog_clip.mp4',
  },
];

export default function UploadPage() {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Modals & Notifications
  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load persistent assets from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cloudinary_uploads_history');
      if (saved) {
        setAssets(JSON.parse(saved));
      } else {
        setAssets(INITIAL_DEMO_ASSETS);
      }
    } catch {
      setAssets(INITIAL_DEMO_ASSETS);
    }
    setIsLoaded(true);
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

  const handleDeleteAsset = (public_id: string) => {
    const updated = assets.filter((a) => a.public_id !== public_id);
    saveAssets(updated);
    addToast('info', 'Asset deleted', `Removed asset ${public_id} from upload history.`);
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
        // Filter category
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

        // Search query
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
    <div className="relative min-h-screen bg-slate-50/50 cursor-none antialiased text-slate-900 font-sans">
      <ScrollProgress />
      <CustomCursor />
      <Header />

      <main className="mx-auto max-w-7xl px-6 md:px-8 py-12 space-y-10">
        {/* Page Hero Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Direct Cloudinary Storage Vault
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Cloudinary Upload Center<span className="text-emerald-500">.</span>
          </h1>

          <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            Upload images and videos directly to Cloudinary with real-time signed signatures, high performance transformations, and instant asset management.
          </p>
        </div>

        {/* Top Statistics Cards */}
        <Stats stats={stats} />

        {/* Main Upload Dropzone */}
        <div className="max-w-4xl mx-auto">
          <UploadArea onSuccess={handleUploadSuccess} onError={handleUploadError} />
        </div>

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
