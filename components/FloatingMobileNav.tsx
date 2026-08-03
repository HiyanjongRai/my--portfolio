'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCode,
  faCamera,
  faFolderOpen,
  faEnvelope,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { scrollToSection } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: IconDefinition;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { id: 'about',     label: 'About',    icon: faUser },
  { id: 'expertise', label: 'Skills',   icon: faCode },
  { id: 'moments',   label: 'Moments',  icon: faCamera,     isRoute: true },
  { id: 'projects',  label: 'Projects', icon: faFolderOpen },
  { id: 'contact',   label: 'Contact',  icon: faEnvelope },
];

const TOTAL = navItems.length; // 5

export default function FloatingMobileNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const pathname = usePathname();
  const router   = useRouter();

  /* ── Scroll / route tracking ── */
  useEffect(() => {
    if (pathname === '/moments') {
      setActiveIdx(2);
      return;
    }

    const sectionIds = ['about', 'expertise', 'projects', 'contact'];

    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && y >= el.offsetTop) {
          // map section id → navItems index
          const ni = navItems.findIndex((n) => n.id === sectionIds[i]);
          if (ni !== -1) setActiveIdx(ni);
          return;
        }
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  const go = (item: NavItem, idx: number) => {
    setActiveIdx(idx);
    if (item.isRoute) { router.push('/moments'); return; }
    if (pathname !== '/') { router.push(`/#${item.id}`); } else { scrollToSection(item.id); }
  };

  /* % position of center of the active column */
  const activePercent = ((activeIdx + 0.5) / TOTAL) * 100;

  return (
    /*
     * The nav wrapper is fixed at the bottom.
     * We need 32 px of top-padding so the raised circle (which is
     * 56 px tall and sits -28 px above the bar) has room to show.
     */
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-[60] md:hidden pointer-events-none"
    >
      <div
        className="relative mx-3 pointer-events-auto"
        style={{
          paddingTop: 32,                          /* room for the raised circle */
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
      >
        {/* ── Dark rounded-pill bar ── */}
        <div className="relative rounded-[28px] bg-slate-950 border border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] overflow-visible">

          {/* ── Raised active circle — sits above the bar ── */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: -28 }}
          >
            <AnimatePresence mode="wait">
              <motion.button
                key={activeIdx}
                initial={{ scale: 0.6, opacity: 0, y: 10 }}
                animate={{ scale: 1,   opacity: 1, y: 0 }}
                exit={{   scale: 0.6, opacity: 0, y: 6 }}
                transition={{ type: 'spring', stiffness: 440, damping: 28 }}
                onClick={() => go(navItems[activeIdx], activeIdx)}
                aria-label={navItems[activeIdx].label}
                style={{ position: 'absolute', left: `${activePercent}%`, transform: 'translateX(-50%)' }}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full
                           bg-emerald-500 text-white
                           shadow-[0_6px_22px_rgba(16,185,129,0.6)]
                           ring-[3px] ring-slate-950
                           cursor-pointer focus:outline-none active:scale-95 transition-transform"
              >
                <FontAwesomeIcon icon={navItems[activeIdx].icon} className="h-5 w-5" />
              </motion.button>
            </AnimatePresence>
          </div>

          {/* ── Five-column nav items ── */}
          <div
            className="grid py-2.5"
            style={{ gridTemplateColumns: `repeat(${TOTAL}, 1fr)` }}
          >
            {navItems.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item, idx)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className="flex flex-col items-center justify-center gap-1 py-1 focus:outline-none cursor-pointer group"
                >
                  {/* icon — fades out when active (circle floats above) */}
                  <span
                    className="transition-all duration-200"
                    style={{
                      opacity:   isActive ? 0 : 0.75,
                      transform: isActive ? 'scale(0.7)' : 'scale(1)',
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="h-[18px] w-[18px] text-white group-hover:text-emerald-300 transition-colors" />
                  </span>

                  {/* label */}
                  <span
                    className="text-[10px] font-semibold leading-none transition-colors duration-200"
                    style={{ color: isActive ? '#34d399' : 'rgba(255,255,255,0.55)' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
