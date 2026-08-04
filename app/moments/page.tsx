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
    <div className="relative min-h-screen bg-slate-50/60 antialiased text-slate-900 font-sans">
      <ScrollProgress />
      <Header />

      <main className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8 py-10 pb-28 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto pt-4 space-y-3">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Memories <span className="text-emerald-500">&amp;</span> Moments<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-500 leading-relaxed max-w-xl mx-auto">
            Just some memories I captured with my little phone — unfiltered, unplanned, and honestly some of my favorites.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <LayoutGrid className={`h-4 w-4 ${activeFilter === 'all' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Moments</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {assets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter('photos')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'photos'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <ImageIcon className={`h-4 w-4 ${activeFilter === 'photos' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Photos</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeFilter === 'photos' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {photoAssets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter('videos')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === 'videos'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Film className={`h-4 w-4 ${activeFilter === 'videos' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Videos</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeFilter === 'videos' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {videoAssets.length}
              </span>
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
