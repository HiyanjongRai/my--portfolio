'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Briefcase,
  Code,
  FileDown,
  Folder,
  Layers,
  Pencil,
  Star,
  Users,
  Trophy,
  Database,
  Server
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';
import { LogoCloud } from '@/components/ui/logo-cloud';

/* ─── Animated Counter ─────────────────────────────────────────── */
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          let start = 0;
          const step = Math.ceil(to / 40);
          const timer = setInterval(() => {
            start = Math.min(start + step, to);
            setCount(start);
            if (start >= to) clearInterval(timer);
          }, 35);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Metrics data ─────────────────────────────────────────────── */
const metrics = [
  { icon: Briefcase, value: 2, suffix: '+', label: 'Years Experience' },
  { icon: Layers, value: 20, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 10, suffix: '+', label: 'Happy Clients' },
  { icon: Trophy, value: 5, suffix: '', label: 'Awards' },
];

/* ─── Social icons ─────────────────────────────────────────────── */
const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/HiyanjongRai',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hiyanjongrai',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/HiyanjongRai',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/HiyanjongRai',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.457c-.073-1.64-1.222-2.272-1.767-2.272-.603 0-1.595.382-1.69 2.272zM7.737 9.433c0-1.906-1.336-2.397-2.995-2.397H1v9.928h4.063c1.469 0 3.19-.574 3.19-2.762 0-1.017-.493-1.932-1.516-2.309v-.028c.836-.407 1-.989 1-1.432zm-4.48.973H4.24c.763 0 1.33.239 1.33.955 0 .716-.567.955-1.33.955H3.257V10.406zm0 3.987H4.43c.876 0 1.487.262 1.487 1.078 0 .816-.611 1.078-1.487 1.078H3.257v-2.156z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://twitter.com/HiyanjongRai',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/* ─── Hero Section ─────────────────────────────────────────────── */
export function HeroSection() {
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [4, -4]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
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
      className="relative overflow-hidden bg-[#FBFDFB] pt-8 pb-16 md:pt-12 md:pb-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-50/60 blur-[100px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-50/50 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">

          {/* ── Left Column ─────────────────────────────────────── */}
          <div className="space-y-8 md:space-y-10">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-100/80 bg-emerald-50/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for Freelance
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[42px] sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              >
                Building<br />
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                  Digital Products
                </span><br />
                That People Love
                <span className="text-emerald-600">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-xl text-base text-slate-500 md:text-[17px] leading-[1.8] font-semibold"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 hover:bg-emerald-700 hover:shadow-emerald-300/60 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                Download Resume
                <FileDown className="h-4 w-4 text-slate-500 group-hover:translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Animated Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="group rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-sm shadow-slate-100 hover:border-emerald-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50/70 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
                        <AnimatedCounter to={metric.value} suffix={metric.suffix} />
                      </p>
                      <p className="mt-1 text-xs text-slate-500 font-semibold leading-tight">{metric.label}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3.5 pt-2"
            >
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right Column: Hero Graphic with mouse parallax ─── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Concentric arcs */}
            <div className="absolute -z-10 w-[140%] h-[140%] -top-[20%] -left-[20%] opacity-40 pointer-events-none">
              <svg className="w-full h-full text-emerald-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="44" strokeWidth="0.3" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="35" strokeWidth="0.35" />
                <circle cx="50" cy="50" r="26" strokeWidth="0.25" strokeDasharray="4 2" />
              </svg>
            </div>

            {/* Floating spheres */}
            <motion.div animate={{ y: [0, -12, 0], x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute top-[8%] left-[10%] lg:left-[5%] h-8 w-8 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-700 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),_2px_4px_12px_rgba(16,185,129,0.25)] z-20 pointer-events-none" />
            <motion.div animate={{ y: [0, -15, 0], rotate: [45, 90, 45] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              className="absolute top-[35%] -left-[5%] lg:-left-[12%] rotate-45 h-5 w-5 border border-white/60 bg-white/20 backdrop-blur-[2px] shadow-sm z-20 pointer-events-none" />
            <motion.div animate={{ y: [0, -8, 0], x: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-[2%] left-[45%] h-6 w-6 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-800 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.4),_2px_3px_8px_rgba(16,185,129,0.2)] z-20 pointer-events-none" />
            <motion.div animate={{ y: [0, -18, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-[28%] -right-[8%] rotate-[15deg] h-7 w-7 border border-white/60 bg-white/20 backdrop-blur-[2px] shadow-sm z-20 pointer-events-none" />
            <motion.div animate={{ y: [0, -10, 0], x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-[6%] right-[10%] lg:right-[5%] h-10 w-10 rounded-full bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600 shadow-[inset_-3px_-3px_7px_rgba(0,0,0,0.3),_4px_8px_16px_rgba(16,185,129,0.15)] z-20 pointer-events-none" />

            {/* Profile with mouse parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              className="relative w-full max-w-[420px] aspect-[4/5] bg-white border border-slate-100/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] rounded-[3rem] p-4 z-10"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[2.4rem] bg-slate-50">
                <Image
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Card A: Backend Development */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
                className="absolute -left-12 top-[12%] w-[190px] rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50/80 text-emerald-600 mb-2">
                  <Server className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-900 leading-tight">Backend Development</h3>
                <div className="mt-2 space-y-0.5 text-[10px] font-medium text-slate-500">
                  <p>Spring Boot</p><p>Java</p><p>REST APIs</p>
                </div>
              </motion.div>

              {/* Card B: Database & Cloud */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-8 bottom-[18%] w-[190px] rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50/80 text-emerald-600 mb-2">
                  <Database className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-900 leading-tight">Database &amp; Cloud</h3>
                <div className="mt-2 space-y-0.5 text-[10px] font-medium text-slate-500">
                  <p>MySQL</p><p>PostgreSQL</p><p>Schema Design</p>
                </div>
              </motion.div>

              {/* Card C: Projects counter */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.2 }}
                className="absolute -right-12 top-[22%] w-[185px] rounded-2xl border border-white/50 bg-white/70 p-3.5 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20 flex items-center gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50/80 text-emerald-600">
                  <Folder className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Projects Completed</p>
                  <p className="mt-1 text-lg font-bold text-slate-900 leading-none">20+</p>
                </div>
              </motion.div>

              {/* Card D: Client Rating */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.7 }}
                className="absolute -right-8 bottom-[35%] w-[185px] rounded-2xl border border-white/50 bg-white/70 p-3.5 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50/80 text-emerald-600">
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Client Rating</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-base font-extrabold text-slate-900 leading-none">4.9 / 5</p>
              </motion.div>

              {/* Card E: Open for work */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut', delay: 0.4 }}
                className="absolute -right-10 bottom-[8%] w-[185px] rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Available Now</span>
                </div>
                <p className="text-base font-extrabold text-slate-950 mt-1.5 leading-none">Open for Work</p>
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
    <section id="logos" className="relative border-t border-slate-100 pt-16 pb-16 bg-white">
      <div className="container-custom max-w-7xl mx-auto px-6 md:px-8 text-center space-y-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Trusted by Clients Worldwide
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Delivering Results That Matter
          </h2>
          <p className="text-sm text-slate-500 font-semibold leading-relaxed">
            I've had the privilege of working with amazing companies and startups to bring their ideas to life.
          </p>
        </div>

        {/* Static Logos Row */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 max-w-5xl mx-auto text-slate-400 font-semibold">
          <div className="flex items-center gap-2 text-xl select-none hover:text-slate-800 transition duration-300">
            <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.48 1 0 6.48 0 13s5.48 12 12.24 12c7.05 0 11.75-4.96 11.75-11.96 0-.81-.09-1.425-.2-1.755H12.24z" />
            </svg>
            <span className="font-extrabold text-slate-800">Google</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2 text-xl select-none hover:text-slate-800 transition duration-300">
            <svg className="w-5 h-5 text-slate-800" viewBox="0 0 23 23" fill="currentColor">
              <path d="M0 0h11v11H0z" />
              <path d="M12 0h11v11H12z" />
              <path d="M0 12h11v11H0z" />
              <path d="M12 12h11v11H12z" />
            </svg>
            <span className="font-extrabold text-slate-800">Microsoft</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xl select-none hover:text-slate-800 transition duration-300">
            <span className="font-black text-slate-800 lowercase tracking-tighter">webflow</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2 text-xl select-none hover:text-slate-800 transition duration-300">
            <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 22.525H0l12-21.05 12 21.05z" />
            </svg>
            <span className="font-black text-slate-900 tracking-tight">vercel</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xl select-none hover:text-slate-800 transition duration-300">
            <span className="font-black text-slate-800 lowercase tracking-tight">stripe</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2 text-xl select-none hover:text-slate-800 transition duration-300">
            <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L0 12h12v12l12-12H12z" />
            </svg>
            <span className="font-bold text-slate-800">Framer</span>
          </div>
        </div>

      </div>
    </section>
  );
}