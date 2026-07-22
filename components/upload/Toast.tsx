'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '@/types/upload';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 p-4 text-white shadow-2xl shadow-slate-950/40"
          >
            {t.type === 'success' && (
              <div className="rounded-full bg-emerald-500/20 p-1.5 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
            {t.type === 'error' && (
              <div className="rounded-full bg-red-500/20 p-1.5 text-red-400 shrink-0 mt-0.5">
                <AlertCircle className="h-5 w-5" />
              </div>
            )}
            {t.type === 'info' && (
              <div className="rounded-full bg-blue-500/20 p-1.5 text-blue-400 shrink-0 mt-0.5">
                <Info className="h-5 w-5" />
              </div>
            )}

            <div className="flex-1 space-y-0.5">
              <p className="text-sm font-bold text-white">{t.title}</p>
              {t.description && (
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{t.description}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(t.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
