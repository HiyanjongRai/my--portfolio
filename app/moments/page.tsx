'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingMobileNav from '@/components/FloatingMobileNav';

import { PinterestGrid } from '@/components/moments/PinterestGrid';
import { MediaModal } from '@/components/upload/MediaModal';
import { ToastContainer } from '@/components/upload/Toast';
import { CloudinaryAsset, ToastMessage } from '@/types/upload';
import { LayoutGrid, Image as ImageIcon, Film } from 'lucide-react';
import { MomentsMusicPlayer } from '@/components/moments/MomentsMusicPlayer';

export type MomentFilter = 'all' | 'photos' | 'videos';

export default function MomentsPage() {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeFilter, setActiveFilter] = useState<MomentFilter>('all');

  useEffect(() => {
    async function loadAssets() {
      try {
        setLoading(true);
        const res = await fetch('/api/cloudinary-assets');
        if (res.ok) {
          const data = await res.json();
          if (data.assets && data.assets.length > 0) {
            setAssets(data.assets);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Live API fetch failed, checking localStorage', e);
      }

      // Fallback to localStorage history from upload page
      try {
        const saved = localStorage.getItem('cloudinary_uploads_history');
        setAssets(saved ? JSON.parse(saved) : []);
      } catch {
        setAssets([]);
      }
      setLoading(false);
    }

    loadAssets();
  }, []);

  const isVideoAsset = (asset: CloudinaryAsset) => {
    return (
      asset.resource_type === 'video' ||
      asset.format === 'mp4' ||
      asset.format === 'webm' ||
      asset.format === 'mov'
    );
  };

  const photoAssets = assets.filter((a) => !isVideoAsset(a));
  const videoAssets = assets.filter((a) => isVideoAsset(a));

  const filteredAssets = assets.filter((asset) => {
    const isVideo = isVideoAsset(asset);
    if (activeFilter === 'photos') return !isVideo;
    if (activeFilter === 'videos') return isVideo;
    return true;
  });

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied!', `${label} copied to clipboard.`);
  };

  return (
    <div className="relative min-h-screen bg-white antialiased text-black">
      <ScrollProgress />
      <Header />

      <main className="mx-auto max-w-[1380px] px-5 sm:px-8 py-24 pb-32 space-y-12">
        {/* Page Header */}
        <div className="text-left max-w-2xl pt-8 space-y-4">
          <div className="editorial-label">
            MOMENTS &amp; CAPTURES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-[1.02]">
            A Look Into My World<span className="text-neutral-400">.</span>
          </h1>
          <p className="text-base text-[#525252] leading-relaxed">
            A collection of photos and moments from my travels, everyday work, projects, and life outside the screen.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-300'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>All Moments</span>
              <span className="opacity-70 font-mono">({assets.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('photos')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeFilter === 'photos'
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-300'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Photos</span>
              <span className="opacity-70 font-mono">({photoAssets.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('videos')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activeFilter === 'videos'
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-300'
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>Videos</span>
              <span className="opacity-70 font-mono">({videoAssets.length})</span>
            </button>
          </div>
        </div>

        {/* Pinterest Grid */}
        <PinterestGrid
          assets={filteredAssets}
          loading={loading}
          activeFilter={activeFilter}
          onPreview={(asset) => setSelectedAsset(asset)}
          onCopy={handleCopy}
        />
      </main>

      <Footer />

      <MediaModal
        asset={selectedAsset}
        assets={filteredAssets}
        onClose={() => setSelectedAsset(null)}
        onCopy={handleCopy}
        onNavigate={(asset) => setSelectedAsset(asset)}
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Floating mobile bottom navigation */}
      <FloatingMobileNav />
    </div>
  );
}
