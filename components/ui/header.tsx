'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';
import { scrollToSection } from '@/lib/utils';
import { ArrowRight, FileText, Camera } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const [activeSection, setActiveSection] = React.useState('hero');
  const [headerHeight, setHeaderHeight] = React.useState(64);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const links = [
    { label: 'Home', href: 'hero', isRoute: false },
    { label: 'About', href: 'about', isRoute: false },
    { label: 'Projects', href: 'projects', isRoute: false },
    { label: 'Experience', href: 'experience', isRoute: false },
    { label: 'Skills', href: 'expertise', isRoute: false },
    { label: 'Moments', href: '/moments', isRoute: true },
    { label: 'Contact', href: 'contact', isRoute: false },
  ];

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
      { threshold: 0.25, rootMargin: '-20% 0px -40% 0px' }
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

  React.useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [scrolled, open]);

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
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300 py-4 bg-white/70 backdrop-blur-md',
        scrolled && 'bg-white/85 border-slate-100/80 shadow-[0_2px_15px_-8px_rgba(0,0,0,0.03)] py-3'
      )}
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 max-[360px]:px-4 md:px-8">
        <button
          onClick={() => handleLinkClick('hero', false)}
          className="min-h-11 min-w-0 font-black text-xl sm:text-2xl tracking-tight text-slate-900 flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <span className="truncate">Hiyan Jong Rai</span><span className="text-emerald-500">.</span>
        </button>

        {/* Center Links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === '/' && activeSection === link.href;

            return (
              <button
                key={link.label}
                className={cn(
                  'relative py-1 text-sm font-semibold transition-all duration-200 cursor-pointer px-2 text-slate-500 hover:text-slate-900 flex items-center gap-1',
                  isActive && 'text-slate-950 font-bold'
                )}
                onClick={() => handleLinkClick(link.href, link.isRoute)}
              >
                {link.isRoute && <Camera className="h-3.5 w-3.5 text-emerald-500" />}
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95"
          >
            <FileText className="h-4 w-4 text-slate-500 group-hover:text-slate-700" />
            Resume
          </a>
          <button
            onClick={() => handleLinkClick('contact', false)}
            className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Let's Talk
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        <button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-150"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      <MobileMenu open={open} headerHeight={headerHeight} onClose={() => setOpen(false)} className="flex flex-col justify-between gap-6">
        <div className="grid gap-y-2 pt-4">
          {links.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === '/' && activeSection === link.href;

            return (
              <button
                key={link.label}
                className={cn(
                  'justify-start text-left min-h-11 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2',
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
                onClick={() => handleLinkClick(link.href, link.isRoute)}
              >
                {link.isRoute && <Camera className="h-4 w-4 text-emerald-500" />}
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pb-6">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white w-full py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <FileText className="h-4.5 w-4.5 text-slate-500" />
            Resume
          </a>
          <button
            onClick={() => handleLinkClick('contact', false)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 w-full py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
          >
            Let's Talk
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean;
  headerHeight: number;
  onClose: () => void;
};

function MobileMenu({
  open,
  headerHeight,
  onClose,
  children,
  className,
  ...props
}: MobileMenuProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] md:hidden"
        style={{ top: headerHeight }}
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="bg-white fixed right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto border-t border-slate-100 md:hidden px-5 max-[360px]:px-4"
        style={{
          top: headerHeight,
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out duration-200',
            'min-h-full flex flex-col justify-between',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
