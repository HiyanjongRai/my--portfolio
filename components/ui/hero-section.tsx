'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Folder,
  FileText,
  Coffee,
  Leaf,
  Database,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';

/* ─── Social links ─────────────────────────────────────────────── */
const socials = [
  {
    name: 'GitHub',
    url: socialLinks.github,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: socialLinks.linkedin,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    url: socialLinks.pinterest,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.195-.334 1.363-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: socialLinks.facebook,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  }
];

/* ─── Tech stack badges ─────────────────────────────────────────── */
/* Simple, generic monochrome-with-accent icons representing each
   technology (not the official trademarked logo artwork). */
const techStack = [
  { name: 'Java', icon: Coffee, color: 'text-orange-500' },
  { name: 'Spring Boot', icon: Leaf, color: 'text-emerald-600' },
  { name: 'MySQL', icon: Database, color: 'text-sky-600' },
  { name: 'PostgreSQL', icon: Database, color: 'text-indigo-600' },
];

/* ─── Hero Section ─────────────────────────────────────────────── */
export function HeroSection() {
  const [canHover, setCanHover] = useState(false);
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [4, -4]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canHover) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#FBFDFB] pt-6 pb-16 sm:pt-8 sm:pb-16 md:pt-12 md:pb-20"
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-50/60 blur-[100px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-50/50 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* ── Text Content (below image on mobile, left on desktop) ─── */}
          <div className="order-2 lg:order-1 w-full space-y-6 sm:space-y-8 text-center sm:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[13px] font-semibold text-slate-500"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for freelance work</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">{personalInfo.location}</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-extrabold tracking-tight text-slate-900 leading-[1.08] text-[32px] max-[360px]:text-[30px] sm:text-[44px] md:text-[56px] lg:text-[72px] break-words"
              >
                Backend Dev<br />
                crafting{' '}
                <span className="italic text-emerald-600 font-black">scalable</span><br />
                software<span className="text-emerald-500">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="mx-auto sm:mx-0 text-[15px] sm:text-[16px] md:text-[17px] text-slate-500 leading-[1.75] max-w-[460px] font-medium"
              >
                I build robust APIs, secure backends, and clean databases with Java, Spring Boot, MySQL &amp; PostgreSQL.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="min-h-12 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-7 py-3.5 text-[15px] font-bold text-white shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                View My Work
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="min-h-12 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-7 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm active:scale-[0.98] transition-all duration-200"
              >
                <FileText className="h-4 w-4 text-emerald-600" />
                Download CV
              </a>
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5"
            >
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 py-2 shadow-sm"
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${tech.color}`} />
                    <span className="text-[13px] font-semibold text-slate-700 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-slate-100 bg-white shadow-sm p-4 sm:p-5"
            >
              <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                <div className="px-2">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">2+</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 leading-tight">Yrs Experience</p>
                </div>
                <div className="px-2">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">4</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 leading-tight">Projects</p>
                </div>
                <div className="px-2">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">3</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 leading-tight">Jobs &amp; Internships</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center sm:justify-start gap-3.5 pt-1"
            >
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ── Image Card (above text on mobile, right on desktop) ─── */}
          <div className="order-1 lg:order-2 w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              className="relative w-full max-w-[300px] min-[390px]:max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[1/1] sm:aspect-[4/4.5] bg-white border border-slate-100/90 shadow-[0_15px_45px_-12px_rgba(0,0,0,0.06)] rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 z-10"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[1.8rem] sm:rounded-[2.4rem] bg-slate-50">
                <Image
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                  priority
                />
              </div>

              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 shadow-md shadow-emerald-500/30 z-20" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 shadow-md shadow-emerald-500/30 z-20" />

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-3 right-3 sm:-top-5 sm:-right-4 rounded-2xl border border-white/80 bg-white/90 p-2.5 sm:p-3 shadow-lg shadow-slate-200/50 backdrop-blur-md z-20 flex items-center gap-2.5"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Folder className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Projects Completed</p>
                  <p className="mt-0.5 text-sm sm:text-base font-black text-slate-900 leading-none">4</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Logos Section ─────────────────────────────────────────────── */
export function LogosSection() {
  return (
    <section id="logos" className="relative border-t border-slate-100 pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Clients &amp; Brands I've Worked With
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Real Work. Real Impact.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
            From restaurant brands to design studios — I've helped businesses grow their digital presence through SEO, content, and web development.
          </p>
        </div>

        {/* Static Logos Row */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-14 max-w-5xl mx-auto text-slate-400 font-semibold">

          {/* Delito Kathmandu */}
          <div className="flex flex-col items-center gap-1.5 select-none group cursor-default">
            <div className="flex items-center gap-2 hover:text-slate-800 transition duration-300">
              <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
              <span className="font-extrabold text-slate-800 text-base tracking-tight">Delito Kathmandu</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Restaurant &amp; Bar · SEO · Content</span>
          </div>

          <div className="h-10 w-px bg-slate-200 hidden sm:block" />

          {/* Himalayan Hub */}
          <div className="flex flex-col items-center gap-1.5 select-none group cursor-default">
            <div className="flex items-center gap-2 hover:text-slate-800 transition duration-300">
              <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/>
              </svg>
              <span className="font-extrabold text-slate-800 text-base tracking-tight">Himalayan Hub</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Restaurant &amp; Bar · SEO · Social Media</span>
          </div>

          <div className="h-10 w-px bg-slate-200 hidden sm:block" />

          {/* Mirai Design */}
          <div className="flex flex-col items-center gap-1.5 select-none group cursor-default">
            <div className="flex items-center gap-2 hover:text-slate-800 transition duration-300">
              <svg className="w-5 h-5 text-violet-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="font-extrabold text-slate-800 text-base tracking-tight">Mirai Design</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Printing Services · SEO · Blog</span>
          </div>

        </div>

      </div>
    </section>
  );
}