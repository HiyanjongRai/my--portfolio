'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail, MapPin, ExternalLink, Camera } from 'lucide-react';
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
  { href: '/moments', label: '✨ Capturing Moments', isRoute: true },
  { href: 'contact', label: 'Contact', isRoute: false },
];

/* Inline SVG social icons — lucide-react doesn't include Github/Linkedin/Pinterest/Facebook in this version */
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
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.195-.334 1.363-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
      <footer className="bg-slate-950 text-slate-400">
        {/* Top CTA Banner */}
        <div className="border-b border-slate-800/60">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-10 sm:py-16 flex flex-col items-start gap-6 md:gap-8">
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500">Open to opportunities</p>
              <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s build something<br className="hidden sm:block" /> <span className="text-emerald-400 italic">meaningful together.</span>
              </h2>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-[13px] font-bold text-white hover:bg-emerald-400 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </div>
        </div>

        {/* Main footer body */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-10 sm:py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand column */}
          <div className="space-y-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white text-2xl font-black tracking-tight hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
            >
              Hiyan Jong Rai<span className="text-emerald-500">.</span>
            </button>

            <p className="text-[14px] leading-[1.75] max-w-[300px] text-slate-400">
              Backend Developer from Nepal crafting scalable APIs, secure authentication systems, and performant database layers.
            </p>

            <div className="space-y-2.5">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2.5 text-[13px] text-slate-400 hover:text-white transition-colors duration-200 font-medium">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-2.5 text-[13px] font-medium">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                {personalInfo.location} · Remote available
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-5">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[14px] font-semibold text-slate-400 hover:text-emerald-400 text-left transition-colors duration-200 cursor-pointer w-fit"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-[14px] font-semibold text-slate-400 hover:text-white text-left transition-colors duration-200 cursor-pointer w-fit"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </nav>
          </div>

          {/* Status */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Status</h4>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-[12px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Resume</h4>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
              >
                Download PDF
                <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {['Spring Boot', 'React', 'MySQL', 'PostgreSQL', 'Vercel', 'Render'].map((t) => (
                  <span key={t} className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-semibold text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-slate-600">
            <p>© {new Date().getFullYear()} Hiyan Jong Rai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[999] w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
