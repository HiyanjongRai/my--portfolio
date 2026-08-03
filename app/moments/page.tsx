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

export default function MomentsPage() {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
            Memories <span className="text-emerald-500">&</span> Moments<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-500 leading-relaxed max-w-xl mx-auto">
            Just some memories I captured with my little phone — unfiltered, unplanned, and honestly some of my favorites.
          </p>
        </div>

        {/* Pinterest Grid */}
        <PinterestGrid
          assets={assets}
          loading={loading}
          onPreview={(asset) => setSelectedAsset(asset)}
          onCopy={handleCopy}
        />
      </main>

      <Footer />

      <MediaModal
        asset={selectedAsset}
        assets={assets}
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
