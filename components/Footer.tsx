'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  Mail,
  MapPin,
  ExternalLink,
  Camera,
  FileText,
  Phone,
  Briefcase,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { scrollToSection } from '@/lib/utils';
import { personalInfo, socialLinks } from '@/data/portfolio';

const navLinks = [
  { href: 'hero', label: 'Home', isRoute: false },
  { href: 'about', label: 'About', isRoute: false },
  { href: 'expertise', label: 'Skills', isRoute: false },
  { href: 'experience', label: 'Experience', isRoute: false },
  { href: 'projects', label: 'Projects', isRoute: false },
  { href: '/moments', label: 'Capturing Moments', isRoute: true },
  { href: 'contact', label: 'Contact', isRoute: false },
];

const stackItems = ['Spring Boot', 'React', 'MySQL', 'PostgreSQL', 'Vercel', 'Render'];

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.195-.334 1.363-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const socials = [
  { name: 'GitHub', href: socialLinks.github, icon: GithubIcon },
  { name: 'LinkedIn', href: socialLinks.linkedin, icon: LinkedinIcon },
  { name: 'Pinterest', href: socialLinks.pinterest, icon: PinterestIcon },
  { name: 'Facebook', href: socialLinks.facebook, icon: FacebookIcon },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-950 text-slate-400">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        <div className="mx-auto max-w-[1280px] px-5 max-[360px]:px-4 sm:px-8 py-8 sm:py-12">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-8 lg:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to opportunities
                </div>
                <h2 className="max-w-2xl text-[24px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] lg:text-[44px] font-extrabold leading-[1.08] tracking-tight text-white">
                  Let&apos;s build something <span className="text-emerald-400 italic">meaningful together.</span>
                </h2>
                <p className="max-w-xl text-[13px] sm:text-[14px] font-medium leading-relaxed text-slate-400">
                  Backend developer focused on scalable APIs, secure auth systems, and reliable database architecture.
                </p>
              </div>

              <div className="grid gap-3 sm:flex sm:items-center sm:justify-end">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">Start a Conversation</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[13px] font-bold text-white transition-all duration-200 hover:border-emerald-400/40 hover:bg-white/10"
                >
                  <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
                  Resume
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-5 pt-5 sm:pt-6 lg:grid-cols-[1.05fr_0.95fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <button
                onClick={() => scrollToSection('hero')}
                className="inline-flex min-h-11 items-center text-[22px] sm:text-[24px] font-black tracking-tight text-white transition-colors duration-200 hover:text-emerald-400"
              >
                Hiyan Jong Rai<span className="text-emerald-500">.</span>
              </button>

              <p className="mt-3 max-w-md text-[14px] font-medium leading-[1.75] text-slate-400">
                Backend Developer from Nepal crafting scalable APIs, secure authentication systems, and performant database layers.
              </p>

              <div className="mt-5 grid gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex min-h-12 min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors duration-200 hover:border-emerald-400/30 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </a>
                <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{personalInfo.location} - Remote available</span>
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors duration-200 hover:border-emerald-400/30 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{personalInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Explore</h4>
                <Camera className="h-4 w-4 text-emerald-400" />
              </div>
              <nav className="mt-5 grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 px-3 text-center text-[13px] font-bold text-slate-300 transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 px-3 text-center text-[13px] font-bold text-slate-300 transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
                    >
                      {link.label}
                    </button>
                  )
                ))}
              </nav>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Status</h4>
                <Briefcase className="h-4 w-4 text-emerald-400" />
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for work
                </div>
                <p className="mt-2 text-[13px] font-semibold leading-relaxed text-slate-300">
                  Open for backend roles, freelance projects, and remote collaboration.
                </p>
              </div>

              <div className="mt-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stackItems.map((item) => (
                    <span key={item} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-emerald-400 hover:text-emerald-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center text-[12px] font-medium text-slate-500 sm:flex-row sm:text-left">
            <p className="max-w-full break-words">(c) {new Date().getFullYear()} Hiyan Jong Rai. All rights reserved.</p>
            <a
              href={socialLinks.blog}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-slate-400 transition-colors duration-200 hover:text-emerald-300"
            >
              Visit Blog
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[999] w-12 h-12 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
