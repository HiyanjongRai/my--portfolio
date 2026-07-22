'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Video, HardDrive } from 'lucide-react';
import { UploadStatsData } from '@/types/upload';

interface StatsProps {
  stats: UploadStatsData;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function Stats({ stats }: StatsProps) {
  const cards = [
    {
      title: 'Total Uploads',
      value: stats.totalUploads,
      subtitle: 'Assets managed',
      icon: UploadCloud,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20',
      badge: 'Active',
    },
    {
      title: 'Total Images',
      value: stats.totalImages,
      subtitle: 'JPEG, PNG, GIF, WebP',
      icon: ImageIcon,
      color: 'from-emerald-500/10 to-emerald-600/10 text-emerald-600 border-emerald-500/20',
      badge: 'Photos & Graphics',
    },
    {
      title: 'Total Videos',
      value: stats.totalVideos,
      subtitle: 'MP4, WebM, MOV',
      icon: Video,
      color: 'from-teal-500/10 to-emerald-600/10 text-teal-600 border-teal-500/20',
      badge: 'Clips & Recordings',
    },
    {
      title: 'Storage Used',
      value: formatBytes(stats.totalStorageBytes),
      subtitle: 'Cloudinary storage',
      icon: HardDrive,
      color: 'from-emerald-500/10 to-emerald-700/10 text-emerald-700 border-emerald-500/20',
      badge: 'Cloud Vault',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="group relative overflow-hidden rounded-3xl bg-white p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {card.title}
            </span>
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} border transition-transform duration-300 group-hover:scale-110`}>
              <card.icon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {card.value}
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {card.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
