'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  Layers,
  Terminal,
  Database,
  Server,
  Code2,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';
import { TypingText } from '@/components/ui/typing-text';

/* ─── Social links ─────────────────────────────────────────────── */
const socials = [
  { name: 'GitHub', url: socialLinks.github },
  { name: 'LinkedIn', url: socialLinks.linkedin },
  { name: 'Pinterest', url: socialLinks.pinterest },
  { name: 'Facebook', url: socialLinks.facebook },
];

/* ─── Tech stack tags ─────────────────────────────────────────── */
const techPills = ['Spring Boot', 'Java', 'MySQL', 'PostgreSQL', 'REST APIs', 'React'];

/* ─── Hero Section ─────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 border-b border-neutral-200"
    >
      <div className="container-custom relative z-10 mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ─── */}
          <div className="order-2 lg:order-1 w-full space-y-8 text-left">
            {/* Status Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-neutral-800"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
              </span>
              <TypingText text="AVAILABLE FOR WORK" speed={55} delay={200} />
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-500 font-medium tracking-wider">{personalInfo.location.toUpperCase()}</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="font-extrabold tracking-tighter text-black uppercase leading-[0.92] text-[40px] sm:text-[62px] md:text-[76px] lg:text-[84px] break-words"
              >
                I Build Digital<br />
                Experiences<br />
                That Matter<span className="text-neutral-400">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[16px] sm:text-[18px] text-neutral-600 leading-[1.65] max-w-[540px] font-normal"
              >
                Backend Developer specializing in Spring Boot, REST APIs, and database architecture. Building resilient, high-performance web systems with clean engineering discipline.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary group"
              >
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FileText className="h-4 w-4 text-neutral-600" />
                Download CV
              </a>
            </motion.div>

            {/* Tech Stack Minimal Tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mr-1">Focus:</span>
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="inline-block border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-800 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Simple Text Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-4 pt-2 text-xs font-bold text-neutral-500 uppercase tracking-wider"
            >
              {socials.map((social, index) => (
                <span key={social.name} className="flex items-center gap-4">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    {social.name}
                  </a>
                  {index < socials.length - 1 && <span className="text-neutral-300">·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Editorial Grayscale Portrait ─── */}
          <div className="order-1 lg:order-2 w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]"
            >
              {/* Editorial Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-900 bg-neutral-100 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <Image
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    filter: 'grayscale(100%) contrast(108%) brightness(96%)',
                  }}
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 440px"
                  priority
                  className="transition-transform duration-700 hover:scale-[1.02]"
                />
                
                {/* Subtle dark bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Bottom corner caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-300">Backend Architect</p>
                  <p className="text-sm font-extrabold uppercase tracking-tight">{personalInfo.name}</p>
                </div>
              </div>

              {/* Floating Metric 1 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 bg-white border border-neutral-200 p-3 sm:p-4 rounded-sm shadow-md"
              >
                <p className="text-2xl sm:text-3xl font-black text-black leading-none">02+</p>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Years Experience</p>
              </motion.div>

              {/* Floating Metric 2 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-6 bg-white border border-neutral-200 p-3 sm:p-4 rounded-sm shadow-md"
              >
                <p className="text-2xl sm:text-3xl font-black text-black leading-none">04+</p>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Projects Built</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Clean Monochrome Logos Strip ── */}
      <LogosSection />
    </section>
  );
}

/* ─── Logos Section ─────────────────────────────────────────────── */
export function LogosSection() {
  return (
    <div className="mt-16 sm:mt-24 pt-12 border-t border-neutral-200">
      <div className="container-custom text-center space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          Selected Collaborations &amp; Work
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 text-neutral-800">
          {/* Delito Kathmandu */}
          <div className="flex flex-col items-center gap-1 select-none">
            <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase">Delito Kathmandu</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Restaurant · SEO · Content</span>
          </div>

          <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

          {/* Himalayan Hub */}
          <div className="flex flex-col items-center gap-1 select-none">
            <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase">Himalayan Hub</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Hospitality · SEO · Strategy</span>
          </div>

          <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

          {/* Mirai Design */}
          <div className="flex flex-col items-center gap-1 select-none">
            <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase">Mirai Design &amp; Print</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">US Remote · Web · SEO</span>
          </div>
        </div>
      </div>
    </div>
  );
}