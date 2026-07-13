'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Target,
  Sparkles,
  Heart,
  TrendingUp,
  Briefcase,
  Users,
  Trophy,
  Quote,
  Download
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

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

const aboutMetrics = [
  { icon: Heart, value: 2, suffix: '+', label: 'Years Experience' },
  { icon: Briefcase, value: 20, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 10, suffix: '+', label: 'Happy Clients' },
  { icon: Trophy, value: 5, suffix: '', label: 'Awards Won' }
];

const highlights = [
  {
    icon: Target,
    title: 'My Focus',
    desc: 'Building clean, user-friendly, and high-performance digital solutions.',
    color: 'from-emerald-500/10 to-emerald-500/5 text-emerald-700 border-emerald-100/50'
  },
  {
    icon: Sparkles,
    title: 'My Approach',
    desc: 'I combine design thinking with modern technologies.',
    color: 'from-blue-500/10 to-blue-500/5 text-blue-700 border-blue-100/50'
  },
  {
    icon: Heart,
    title: 'My Passion',
    desc: 'Creating meaningful experiences that solve real problems.',
    color: 'from-violet-500/10 to-violet-500/5 text-violet-700 border-violet-100/50'
  },
  {
    icon: TrendingUp,
    title: 'My Goal',
    desc: 'Deliver exceptional results and help clients grow.',
    color: 'from-amber-500/10 to-amber-500/5 text-amber-700 border-amber-100/50'
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-slate-50/30 py-20 lg:py-28 border-t border-slate-100">
      {/* Background soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-50/30 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-50/20 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] items-center">
          
          {/* Left Column: Bio, Focus Grid & Metrics */}
          <div className="space-y-8">
            {/* Get To Know Me Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Get To Know Me
            </motion.div>

            {/* Title & Introduction */}
            <div className="space-y-5">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
              >
                I'm <span className="text-emerald-600">{personalInfo.name}</span>,<br />
                a {personalInfo.title} &amp;<br />
                UI/UX Designer.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base text-slate-500 font-semibold leading-relaxed max-w-2xl"
              >
                {personalInfo.description}
              </motion.p>
            </div>

            {/* Core strength cards grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              {highlights.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col gap-2 p-5 rounded-2xl border bg-gradient-to-br ${item.color} shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Horizontal Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-[2rem] border border-slate-100 bg-[#FBFDFB]/60 backdrop-blur-sm p-6 shadow-sm flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-100 gap-6 sm:gap-0"
            >
              {aboutMetrics.map((m, idx) => {
                const MIcon = m.icon;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center sm:items-start px-6 first:pl-0 last:pr-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                      <MIcon className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                      <AnimatedCounter to={m.value} suffix={m.suffix} />
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2.5">{m.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Bottom Quote Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-3xl border border-emerald-100/70 bg-[#F6FBF8]/45 p-5 flex items-start gap-4 mt-6 shadow-sm"
            >
              <div className="text-emerald-600 shrink-0 transform rotate-180">
                <Quote className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                I believe in writing clean code, designing with purpose, and delivering solutions that not only meet expectations but exceed them.
              </p>
            </motion.div>

          </div>

          {/* Right Column: Visual Portrait Panel */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Background elements */}
            <div className="absolute -left-6 -top-6 -z-10 text-slate-200 pointer-events-none opacity-80">
              <svg width="100" height="100" fill="currentColor">
                <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#dot-pattern)" />
              </svg>
            </div>

            <div className="absolute -right-8 -top-8 -z-10 w-44 h-44 text-emerald-100 opacity-60 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="80" cy="20" r="40" strokeWidth="0.5" />
                <circle cx="80" cy="20" r="28" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [12, 20, 12] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute bottom-[-5%] left-[20%] rotate-12 h-6 w-6 border border-white/60 bg-white/20 backdrop-blur-[2px] shadow-sm z-20 pointer-events-none"
            />
            
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-[40%] -left-[10%] h-8 w-8 rounded-full bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),_2px_4px_12px_rgba(16,185,129,0.15)] z-20 pointer-events-none"
            />

            {/* Image Frame Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.2 }}
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

              {/* Overlap Card 1: What Drives Me */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="absolute -right-8 top-[28%] w-[210px] rounded-2xl border border-white/50 bg-white/70 p-4 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20 space-y-2.5"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50/80 text-emerald-600">
                  <Quote className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">What Drives Me</h4>
                  <p className="mt-1 text-[10px] font-semibold text-slate-500 leading-normal">
                    Solving problems, learning continuously, and turning ideas into impactful digital products.
                  </p>
                </div>
                
                {/* Handwritten signature */}
                <div className="pt-1.5 flex justify-end">
                  <svg className="h-8 w-24 text-emerald-600/90" viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 25c5-2 12-15 15-18 2-2 4 5 1 8s-6 5-5-2c1-6 8-10 10-1 1 5 1 10-2 8s-4-6-2-8c4-4 8-1 9 4 1 3 0 6-2 5-3-2-2-7 2-9 4-2 9 3 9 7 0 2-2 4-4 3-3-2 0-7 3-8 4-2 7 3 7 6" />
                  </svg>
                </div>
              </motion.div>

              {/* Overlap Card 2: Download My Resume */}
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="absolute -right-8 bottom-[10%] w-[230px] rounded-2xl border border-white/50 bg-white/80 p-3.5 shadow-lg shadow-slate-100/50 backdrop-blur-md z-20 flex items-center gap-3.5 cursor-pointer hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50/90 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Download My Resume</h4>
                  <p className="mt-0.5 text-[9px] font-semibold text-slate-500 leading-normal">
                    Get a detailed overview of my experience and skills.
                  </p>
                </div>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
