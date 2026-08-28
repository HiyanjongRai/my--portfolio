'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, scrollToSection } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  FileText,
  Camera,
  X,
  Menu,
  Globe,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(15);
  const [activeSection, setActiveSection] = React.useState('hero');
  const pathname = usePathname();
  const router = useRouter();
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const links = [
    { label: 'Home', href: 'hero', isRoute: false, num: '01' },
    { label: 'About', href: 'about', isRoute: false, num: '02' },
    { label: 'Work', href: 'projects', isRoute: false, num: '03' },
    { label: 'Experience', href: 'experience', isRoute: false, num: '04' },
    { label: 'Expertise', href: 'expertise', isRoute: false, num: '05' },
    { label: 'Education', href: 'education', isRoute: false, num: '06' },
    { label: 'Moments', href: '/moments', isRoute: true, num: '07' },
    { label: 'Contact', href: 'contact', isRoute: false, num: '08' },
  ];

  // Active section tracking via IntersectionObserver
  React.useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-15% 0px -45% 0px' }
    );

    const sectionIds = ['hero', 'about', 'projects', 'experience', 'expertise', 'education', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  // Lock body scroll on mobile open
  React.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleLinkClick = (href: string, isRoute: boolean) => {
    setOpen(false);

    if (isRoute) {
      router.push(href);
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${href}`);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'py-4 sm:py-5 bg-white/70 backdrop-blur-md border-b border-neutral-100'
        )}
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <nav className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 sm:px-8">
          
          {/* ── Brand Logo / Monogram ── */}
          <button
            onClick={() => handleLinkClick('hero', false)}
            className="group flex items-center gap-3 cursor-pointer select-none text-left"
          >
            {/* Monogram Box */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white font-mono text-xs font-black tracking-wider transition-transform duration-200 group-hover:scale-105 shadow-sm">
              HJR
            </div>
            
            {/* Text & Live Status */}
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base uppercase tracking-tight text-black leading-none group-hover:opacity-80 transition-opacity">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono font-semibold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE FOR WORK
              </span>
            </div>
          </button>

          {/* ── Center Nav Links (Floating Pill Tabs) ── */}
          <div className="hidden lg:flex items-center gap-1 bg-neutral-100/80 border border-neutral-200/70 p-1.5 rounded-full shadow-inner">
            {links.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : pathname === '/' && activeSection === link.href;

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href, link.isRoute)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 rounded-full cursor-pointer flex items-center gap-1.5',
                    isActive
                      ? 'bg-black text-white shadow-sm font-bold'
                      : 'text-neutral-600 hover:text-black hover:bg-white/60'
                  )}
                >
                  {link.isRoute && <Camera className="h-3 w-3" />}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ── Right Actions: Resume & Let's Talk ── */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/80 px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-100 hover:border-black transition-all duration-150 shadow-xs"
            >
              <FileText className="h-3.5 w-3.5 text-neutral-500" />
              Resume
            </a>

            <button
              onClick={() => handleLinkClick('contact', false)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-black px-4.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 active:scale-95 transition-all duration-150 cursor-pointer shadow-sm"
            >
              Let&apos;s Talk
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            ref={menuButtonRef}
            onClick={() => setOpen(!open)}
            className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-black hover:bg-neutral-50 active:scale-95 transition-all duration-150 cursor-pointer shadow-xs"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Fullscreen Overlay ── */}
      <AnimatePresence>
        {open && (
          <MobileOverlay
            open={open}
            links={links}
            activeSection={activeSection}
            pathname={pathname}
            onClose={() => setOpen(false)}
            onLinkClick={handleLinkClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface MobileOverlayProps {
  open: boolean;
  links: Array<{ label: string; href: string; isRoute: boolean; num: string }>;
  activeSection: string;
  pathname: string;
  onClose: () => void;
  onLinkClick: (href: string, isRoute: boolean) => void;
}

function MobileOverlay({
  open,
  links,
  activeSection,
  pathname,
  onClose,
  onLinkClick,
}: MobileOverlayProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex flex-col justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative bg-white rounded-t-3xl border-t border-neutral-200 p-6 shadow-2xl max-h-[88vh] overflow-y-auto flex flex-col justify-between space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header in drawer */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-mono text-xs font-black">
              HJR
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-tight text-black">{personalInfo.name}</p>
              <p className="text-[10px] font-mono text-neutral-400">Navigation Menu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-1.5">
          {links.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === '/' && activeSection === link.href;

            return (
              <button
                key={link.label}
                onClick={() => onLinkClick(link.href, link.isRoute)}
                className={cn(
                  'w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer',
                  isActive
                    ? 'bg-black text-white font-bold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn('font-mono text-xs', isActive ? 'text-neutral-400' : 'text-neutral-400')}>
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </div>
                {link.isRoute && <Camera className="h-4 w-4 text-neutral-400" />}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions & Socials */}
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-300 text-neutral-800 font-bold text-xs hover:bg-neutral-50 transition"
            >
              <FileText className="h-4 w-4 text-neutral-500" />
              Resume
            </a>
            <button
              onClick={() => onLinkClick('contact', false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition cursor-pointer"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Social links row in mobile drawer */}
          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold font-mono uppercase tracking-wider text-neutral-400">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
            <span>·</span>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              LinkedIn
            </a>
            <span>·</span>
            <a href={socialLinks.blog} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              Blog
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default Header;
