'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCamera,
  faFolderOpen,
  faEnvelope,
  faShareNodes,
  faGlobe,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';
import { scrollToSection } from '@/lib/utils';
import { socialLinks } from '@/data/portfolio';

interface NavItem {
  id: string;
  label: string;
  icon: IconDefinition;
  isRoute?: boolean;
  isSocial?: boolean;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', icon: faUser },
  { id: 'moments', label: 'Moments', icon: faCamera, isRoute: true },
  { id: 'projects', label: 'Projects', icon: faFolderOpen },
  { id: 'social', label: 'Social', icon: faShareNodes, isSocial: true },
  { id: 'contact', label: 'Contact', icon: faEnvelope },
];

const socialOptions = [
  { name: 'GitHub',    url: socialLinks.github,    icon: faGithub,    iconColor: 'text-gray-900',   bg: 'bg-gray-50   border-gray-200',   hover: 'hover:bg-gray-900   hover:border-gray-900   hover:text-white' },
  { name: 'LinkedIn',  url: socialLinks.linkedin,  icon: faLinkedin,  iconColor: 'text-blue-600',   bg: 'bg-blue-50   border-blue-100',   hover: 'hover:bg-blue-600   hover:border-blue-600   hover:text-white' },
  { name: 'Instagram', url: socialLinks.instagram, icon: faInstagram, iconColor: 'text-pink-500',   bg: 'bg-pink-50   border-pink-100',   hover: 'hover:bg-pink-500   hover:border-pink-500   hover:text-white' },
  { name: 'Facebook',  url: socialLinks.facebook,  icon: faFacebook,  iconColor: 'text-[#1877F2]',  bg: 'bg-blue-50   border-blue-100',   hover: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white' },
  { name: 'Pinterest', url: socialLinks.pinterest, icon: faPinterest, iconColor: 'text-red-600',    bg: 'bg-red-50    border-red-100',    hover: 'hover:bg-red-600    hover:border-red-600    hover:text-white' },
  { name: 'Blog',      url: socialLinks.blog,      icon: faGlobe,     iconColor: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', hover: 'hover:bg-emerald-600 hover:border-emerald-600 hover:text-white' },
];

export default function FloatingMobileNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/moments') {
      setActiveIdx(1);
      return;
    }

    const sectionIds = ['about', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          const navIdx = navItems.findIndex((item) => item.id === sectionIds[i]);
          if (navIdx !== -1 && !isSocialOpen) {
            setActiveIdx(navIdx);
          }
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isSocialOpen]);

  const handleNavClick = (item: NavItem, idx: number) => {
    setActiveIdx(idx);

    if (item.isSocial) {
      setIsSocialOpen((prev) => !prev);
      return;
    }

    setIsSocialOpen(false);

    if (item.isRoute) {
      router.push('/moments');
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${item.id}`);
    } else {
      scrollToSection(item.id);
    }
  };

  const activeItem = navItems[activeIdx];

  return (
    <>
      {/* Social Media Popup Drawer */}
      <AnimatePresence>
        {isSocialOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSocialOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
            />

            {/* Social Popup Menu — white/green theme */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[360px] rounded-3xl bg-white border border-emerald-200 p-5 shadow-[0_20px_60px_rgba(16,185,129,0.15),0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-xl"
              style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                    Connect With Me
                  </h4>
                </div>
                <button
                  onClick={() => setIsSocialOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-200"
                  aria-label="Close social menu"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-3">
                {socialOptions.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                    whileTap={{ scale: 0.92 }}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-200 group ${social.bg} ${social.hover}`}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className={`h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-white ${social.iconColor}`}
                    />
                    <span className="text-[11px] font-bold tracking-tight text-slate-700 group-hover:text-white transition-colors duration-200">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="relative mx-3 pointer-events-auto max-w-[400px] sm:mx-auto">
          {/* SVG Notch background matching reference design */}
          <div className="relative h-[64px] w-full">
            <NavBarSVG activeIdx={activeIdx} totalItems={navItems.length} />

            {/* Raised Active Circular Button */}
            <div
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                left: `${((activeIdx + 0.5) / navItems.length) * 100}%`,
                transform: 'translateX(-50%)',
                top: '-24px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.button
                  key={activeItem.id}
                  initial={{ scale: 0.6, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.6, opacity: 0, y: 10 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  onClick={() => handleNavClick(activeItem, activeIdx)}
                  aria-label={activeItem.label}
                  className="pointer-events-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.55)] ring-4 ring-[#111827] cursor-pointer focus:outline-none active:scale-95"
                >
                  <FontAwesomeIcon icon={activeItem.icon} className="h-5 w-5 text-white" />
                </motion.button>
              </AnimatePresence>
            </div>

            {/* 5 Column Nav Buttons */}
            <div
              className="absolute inset-0 grid pt-2 pb-1.5"
              style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}
            >
              {navItems.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item, idx)}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    className="flex flex-col items-center justify-end gap-0.5 cursor-pointer focus:outline-none pb-1 group"
                  >
                    {/* Inactive Icon */}
                    <span
                      className={`transition-all duration-200 ${
                        isActive ? 'opacity-0 scale-75' : 'opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="h-[18px] w-[18px] text-slate-300" />
                    </span>

                    {/* Label */}
                    <span
                      className={`text-[10px] font-semibold leading-none transition-colors duration-200 ${
                        isActive ? 'text-emerald-400 font-extrabold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
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
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Fluid Notch SVG Path (dynamic curved cutout embracing raised circle)
───────────────────────────────────────────────────────────────── */
function NavBarSVG({ activeIdx, totalItems }: { activeIdx: number; totalItems: number }) {
  const W = 390; // viewBox width
  const H = 64;  // bar height
  const depth = 26; // notch depth

  // Calculate center x of the active column
  const cx = ((activeIdx + 0.5) / totalItems) * W;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <motion.path
        fill="#111827" /* dark slate-900 pill background */
        animate={{ d: buildFluidNotchPath(W, H, cx, depth) }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      />
    </svg>
  );
}

function buildFluidNotchPath(W: number, H: number, cx: number, depth: number): string {
  const cornerR = 24;
  const notchWidth = 36;

  const x1 = cx - notchWidth;
  const x2 = cx + notchWidth;

  return [
    `M ${cornerR} 0`,
    `L ${Math.max(cornerR, x1)} 0`,
    `C ${cx - 20} 0, ${cx - 18} ${depth}, ${cx} ${depth}`,
    `C ${cx + 18} ${depth}, ${cx + 20} 0, ${Math.min(W - cornerR, x2)} 0`,
    `L ${W - cornerR} 0`,
    `Q ${W} 0, ${W} ${cornerR}`,
    `L ${W} ${H - cornerR}`,
    `Q ${W} ${H}, ${W - cornerR} ${H}`,
    `L ${cornerR} ${H}`,
    `Q 0 ${H}, 0 ${H - cornerR}`,
    `L 0 ${cornerR}`,
    `Q 0 0, ${cornerR} 0 Z`,
  ].join(' ');
}
