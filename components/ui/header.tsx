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
  const [headerHeight, setHeaderHeight] = React.useState(60);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = React.useRef<HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  const links = [
    { label: 'Home', href: 'hero', isRoute: false },
    { label: 'About', href: 'about', isRoute: false },
    { label: 'Work', href: 'projects', isRoute: false },
    { label: 'Experience', href: 'experience', isRoute: false },
    { label: 'Expertise', href: 'expertise', isRoute: false },
    { label: 'Education', href: 'education', isRoute: false },
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
        'fixed top-0 inset-x-0 z-50 w-full border-b transition-all duration-200 bg-white/95 backdrop-blur-md',
        scrolled ? 'border-neutral-200 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]' : 'border-neutral-100 py-4'
      )}
      style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
    >
      <nav className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 sm:px-8">
        {/* Brand Name / Logo */}
        <button
          onClick={() => handleLinkClick('hero', false)}
          className="min-h-10 min-w-0 font-bold text-lg tracking-tight text-black flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity"
        >
          <span className="truncate uppercase font-extrabold tracking-tighter text-base">Hiyan Jong Rai</span>
        </button>

        {/* Center Links (Editorial minimalism) */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === '/' && activeSection === link.href;

            return (
              <button
                key={link.label}
                className={cn(
                  'relative py-1 text-[13px] tracking-tight font-medium transition-colors duration-150 cursor-pointer px-1 text-neutral-500 hover:text-black flex items-center gap-1.5',
                  isActive && 'text-black font-semibold'
                )}
                onClick={() => handleLinkClick(link.href, link.isRoute)}
              >
                {link.isRoute && <Camera className="h-3 w-3 text-neutral-400" />}
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-black" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm border border-neutral-300 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-black hover:border-black transition-all duration-150"
          >
            <FileText className="h-3.5 w-3.5 text-neutral-500" />
            Resume
          </a>
          <button
            onClick={() => handleLinkClick('contact', false)}
            className="group inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-all duration-150 cursor-pointer"
          >
            Let&apos;s Talk
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-neutral-200 bg-white text-black hover:bg-neutral-50 active:scale-95 transition-all duration-150 cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <MenuToggleIcon open={open} className="size-4" duration={250} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu open={open} headerHeight={headerHeight} onClose={() => setOpen(false)} className="flex flex-col justify-between gap-6">
        <div className="grid gap-y-1 pt-4">
          {links.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === '/' && activeSection === link.href;

            return (
              <button
                key={link.label}
                className={cn(
                  'justify-start text-left py-3 px-3 rounded-sm text-sm font-medium transition-all duration-150 flex items-center gap-2',
                  isActive ? 'bg-neutral-100 text-black font-bold' : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                )}
                onClick={() => handleLinkClick(link.href, link.isRoute)}
              >
                {link.isRoute && <Camera className="h-3.5 w-3.5 text-neutral-500" />}
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5 pb-6">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-neutral-300 bg-white w-full py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition"
          >
            <FileText className="h-4 w-4 text-neutral-500" />
            Resume
          </a>
          <button
            onClick={() => handleLinkClick('contact', false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black w-full py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition"
          >
            Let&apos;s Talk
            <ArrowRight className="h-3.5 w-3.5" />
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
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        style={{ top: headerHeight }}
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="bg-white fixed right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto border-t border-neutral-200 lg:hidden px-5"
        style={{
          top: headerHeight,
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out duration-150',
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
