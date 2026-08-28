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
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
  faPinterest,
  faYoutube,
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
  { name: 'GitHub',    url: socialLinks.github,    icon: faGithub },
  { name: 'LinkedIn',  url: socialLinks.linkedin,  icon: faLinkedin },
  { name: 'Pinterest', url: socialLinks.pinterest, icon: faPinterest },
  { name: 'Facebook',  url: socialLinks.facebook,  icon: faFacebook },
  { name: 'Instagram', url: socialLinks.instagram, icon: faInstagram },
  { name: 'YouTube',   url: socialLinks.youtube,   icon: faYoutube },
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
            />

            {/* Social Popup Menu — Monochrome */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[340px] bg-neutral-950 border border-neutral-800 p-5 rounded-sm shadow-2xl text-white"
              style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                    Connect With Me
                  </h4>
                </div>
                <button
                  onClick={() => setIsSocialOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-sm border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="Close social menu"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                </button>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {socialOptions.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.2 }}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-sm border border-neutral-800 bg-neutral-900/60 hover:bg-white hover:text-black hover:border-white transition-colors duration-150 group"
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="h-4 w-4 text-neutral-300 group-hover:text-black transition-colors"
                    />
                    <span className="text-[10px] font-semibold tracking-tight text-neutral-400 group-hover:text-black transition-colors">{social.name}</span>
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
        <div className="relative mx-3 pointer-events-auto max-w-[380px] sm:mx-auto">
          {/* SVG Notch background */}
          <div className="relative h-[60px] w-full">
            <NavBarSVG activeIdx={activeIdx} totalItems={navItems.length} />

            {/* Raised Active Circular Button */}
            <div
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                left: `${((activeIdx + 0.5) / navItems.length) * 100}%`,
                transform: 'translateX(-50%)',
                top: '-20px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.button
                  key={activeItem.id}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleNavClick(activeItem, activeIdx)}
                  aria-label={activeItem.label}
                  className="pointer-events-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-black shadow-lg ring-3 ring-black cursor-pointer focus:outline-none"
                >
                  <FontAwesomeIcon icon={activeItem.icon} className="h-4 w-4 text-black" />
                </motion.button>
              </AnimatePresence>
            </div>

            {/* Column Nav Buttons */}
            <div
              className="absolute inset-0 grid pt-2 pb-1"
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
                      className={`transition-all duration-150 ${
                        isActive ? 'opacity-0 scale-75' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="h-[15px] w-[15px] text-neutral-400" />
                    </span>

                    {/* Label */}
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider leading-none transition-colors duration-150 ${
                        isActive ? 'text-white font-extrabold' : 'text-neutral-500 group-hover:text-neutral-300'
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
   Fluid Notch SVG Path
───────────────────────────────────────────────────────────────── */
function NavBarSVG({ activeIdx, totalItems }: { activeIdx: number; totalItems: number }) {
  const W = 380;
  const H = 60;
  const depth = 22;

  const cx = ((activeIdx + 0.5) / totalItems) * W;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <motion.path
        fill="#000000"
        stroke="#262626"
        strokeWidth="1"
        animate={{ d: buildFluidNotchPath(W, H, cx, depth) }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    </svg>
  );
}

function buildFluidNotchPath(W: number, H: number, cx: number, depth: number): string {
  const cornerR = 12;
  const notchWidth = 32;

  const x1 = cx - notchWidth;
  const x2 = cx + notchWidth;

  return [
    `M ${cornerR} 0`,
    `L ${Math.max(cornerR, x1)} 0`,
    `C ${cx - 18} 0, ${cx - 16} ${depth}, ${cx} ${depth}`,
    `C ${cx + 16} ${depth}, ${cx + 18} 0, ${Math.min(W - cornerR, x2)} 0`,
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
