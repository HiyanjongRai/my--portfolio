'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';
import { personalInfo } from '@/data/portfolio';

const navLinks = [
  { href: 'hero', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'expertise', label: 'Skills' },
  { href: 'experience', label: 'Experience' },
  { href: 'projects', label: 'Projects' },
  { href: 'contact', label: 'Contact' },
];

/* Inline SVG social icons — lucide-react doesn't include Github/Linkedin in this version */
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

const socials = [
  { name: 'GitHub', href: 'https://github.com/HiyanjongRai', icon: GithubIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/hiyanjongrai', icon: LinkedinIcon },
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
          <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500">Open to opportunities</p>
              <h2 className="text-[28px] md:text-[36px] font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s build something<br className="hidden md:block" /> <span className="text-emerald-400 italic">meaningful together.</span>
              </h2>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-[14px] font-bold text-white hover:bg-emerald-400 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              <Mail className="h-4 w-4" />
              {personalInfo.email}
              <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Main footer body */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-14 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">

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
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[14px] font-semibold text-slate-400 hover:text-white text-left transition-colors duration-200 cursor-pointer w-fit"
                >
                  {link.label}
                </button>
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
                {['Java', 'Spring Boot', 'MySQL', 'React', 'Next.js'].map((t) => (
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
          <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
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
