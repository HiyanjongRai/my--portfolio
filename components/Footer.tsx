'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Camera,
  FileText,
  Briefcase,
  ChevronRight,
  Home,
  User,
  Code2,
  FolderGit2,
  Compass,
  Activity,
  Layers,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { scrollToSection } from '@/lib/utils';
import { personalInfo, socialLinks } from '@/data/portfolio';

const navLinks = [
  { href: 'hero', label: 'Home', isRoute: false, icon: Home },
  { href: 'about', label: 'About', isRoute: false, icon: User },
  { href: 'expertise', label: 'Skills', isRoute: false, icon: Code2 },
  { href: 'experience', label: 'Experience', isRoute: false, icon: Briefcase },
  { href: 'projects', label: 'Projects', isRoute: false, icon: FolderGit2 },
  { href: '/moments', label: 'Capturing Moments', isRoute: true, icon: Camera },
  { href: 'contact', label: 'Contact', isRoute: false, icon: Mail, full: true },
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

/**
 * Decorative isometric "stacked cubes + code" illustration used in the
 * hero CTA card, matching the reference design.
 */
const HeroCubesGraphic = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* orbit ring */}
    <ellipse
      cx="130"
      cy="150"
      rx="105"
      ry="60"
      stroke="#34d399"
      strokeOpacity="0.35"
      strokeWidth="1.5"
      strokeDasharray="4 6"
    />
    {/* orbit dots */}
    <circle cx="228" cy="134" r="3.5" fill="#34d399" fillOpacity="0.9" />
    <circle cx="212" cy="100" r="2.5" fill="#34d399" fillOpacity="0.6" />
    <circle cx="30" cy="150" r="3" fill="#34d399" fillOpacity="0.5" />

    {/* ground shadow */}
    <ellipse cx="128" cy="196" rx="70" ry="14" fill="#000000" fillOpacity="0.35" />

    {/* back-right cube (top of stack) */}
    <g>
      <path d="M130 40 L172 64 L130 88 L88 64 Z" fill="#0f2f24" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M130 88 L172 64 L172 104 L130 128 Z" fill="#0a1f18" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M130 88 L88 64 L88 104 L130 128 Z" fill="#0d2a20" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />
    </g>

    {/* back-left small cube */}
    <g>
      <path d="M74 96 L104 113 L74 130 L44 113 Z" fill="#0f2f24" stroke="#34d399" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M74 130 L104 113 L104 141 L74 158 Z" fill="#0a1f18" stroke="#34d399" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M74 130 L44 113 L44 141 L74 158 Z" fill="#0d2a20" stroke="#34d399" strokeOpacity="0.3" strokeWidth="1" />
    </g>

    {/* front large cube (with code glyph) */}
    <g>
      <path d="M132 118 L188 150 L132 182 L76 150 Z" fill="#123829" stroke="#34d399" strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M132 182 L188 150 L188 196 L132 228 Z" fill="#0a2018" stroke="#34d399" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M132 182 L76 150 L76 196 L132 228 Z" fill="#0f2b20" stroke="#34d399" strokeOpacity="0.45" strokeWidth="1.5" />
      <text
        x="104"
        y="192"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="20"
        fontWeight="700"
        fill="#34d399"
      >
        {'</>'}
      </text>
    </g>
  </svg>
);

const socials = [
  { name: 'GitHub', href: socialLinks.github, icon: GithubIcon },
  { name: 'LinkedIn', href: socialLinks.linkedin, icon: LinkedinIcon },
  { name: 'Pinterest', href: socialLinks.pinterest, icon: PinterestIcon },
  { name: 'Facebook', href: socialLinks.facebook, icon: FacebookIcon },
];

const initials = personalInfo.name
  ? personalInfo.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')
  : 'HJ';

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
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Top-left: Hero CTA */}
            <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-8 lg:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              {/* decorative isometric cube illustration */}
              <HeroCubesGraphic className="pointer-events-none absolute -right-2 top-2 hidden h-[190px] w-[190px] opacity-90 sm:block lg:-right-4 lg:top-0 lg:h-[220px] lg:w-[220px]" />

              <div className="relative space-y-3 sm:max-w-[62%] lg:max-w-[58%]">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to opportunities
                </div>
                <h2 className="max-w-2xl text-[24px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.08] tracking-tight text-white">
                  Let&apos;s build something <span className="text-emerald-400 italic">meaningful together.</span>
                </h2>
                <p className="max-w-xl text-[13px] sm:text-[14px] font-medium leading-relaxed text-slate-400">
                  Backend developer focused on scalable APIs, secure auth systems, and reliable database architecture.
                </p>
              </div>

              <div className="relative grid gap-3 sm:flex sm:items-center">
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

            {/* Top-right: Identity + Contact */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-lg sm:text-xl font-black text-emerald-300">
                  {initials}
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </div>
                <div>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="text-left text-xl sm:text-2xl font-black tracking-tight text-white transition-colors duration-200 hover:text-emerald-400"
                  >
                    Hiyan Jong Rai<span className="text-emerald-500">.</span>
                  </button>
                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-slate-400">
                    Backend Developer from Nepal crafting scalable APIs, secure authentication systems, and performant database layers.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex min-h-12 min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors duration-200 hover:border-emerald-400/30 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="min-w-0 flex-1 truncate text-left">{personalInfo.email}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400" />
                </a>
                <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="flex-1 text-left">{personalInfo.location} · Remote available</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="group flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors duration-200 hover:border-emerald-400/30 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="flex-1 text-left">{personalInfo.phone}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Bottom-left: Explore */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Explore</h4>
                <Compass className="h-4 w-4 text-emerald-400" />
              </div>
              <nav className="mt-5 grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const content = (
                    <>
                      <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="flex-1 truncate text-left">{link.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
                    </>
                  );
                  const className = `group flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/50 px-3.5 text-[13px] font-bold text-slate-300 transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 ${
                    link.full ? 'col-span-2' : ''
                  }`;

                  return link.isRoute ? (
                    <Link key={link.href} href={link.href} className={className}>
                      {content}
                    </Link>
                  ) : (
                    <button key={link.href} onClick={() => scrollToSection(link.href)} className={className}>
                      {content}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom-right: Status */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Status</h4>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for work
                  </div>
                  <p className="mt-2 text-[13px] font-semibold leading-relaxed text-slate-300">
                    Open for backend roles, freelance projects, and remote collaboration.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <Briefcase className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-slate-500" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Stack</h4>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stackItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-400"
                    >
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
            <p className="max-w-full break-words">© {new Date().getFullYear()} Hiyan Jong Rai. All rights reserved.</p>
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
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] sm:bottom-8 sm:right-8 z-[999] w-12 h-12 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}