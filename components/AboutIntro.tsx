'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, MapPin, GraduationCap, Briefcase, Code2 } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';

export default function AboutIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative bg-[#F8FAFC] py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px] w-full">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] items-start">

          {/* ── Left: Photo + Quick Facts ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-32 space-y-6"
          >
            {/* Image Frame */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] border border-slate-100">
              <Image
                src={personalInfo.image}
                alt={personalInfo.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
              {/* Subtle colour wash overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              {/* Name tag */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-[15px] leading-none">{personalInfo.name}</p>
                <p className="text-white/70 text-[12px] font-medium mt-1">{personalInfo.title} · {personalInfo.location}</p>
              </div>
            </div>

            {/* Quick Facts sidebar */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: 'Based in', value: 'Kathmandu, Nepal' },
                { icon: GraduationCap, label: 'Degree', value: 'BCA (Ongoing)' },
                { icon: Briefcase, label: 'Experience', value: '2+ Years' },
                { icon: Code2, label: 'Status', value: 'Open to work' },
              ].map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <fact.icon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-none">{fact.label}</p>
                    <p className="text-[13px] font-bold text-slate-800 mt-1 leading-tight">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CTA */}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
            >
              <Download className="h-4 w-4 text-slate-400 group-hover:translate-y-0.5 transition-transform duration-200" />
              Download Resume
            </a>
          </motion.div>

          {/* ── Right: Editorial Bio ── */}
          <div className="space-y-12">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600">About Me</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
            >
              From Udayapur to building<br />
              <span className="text-emerald-600 italic">enterprise backends.</span>
            </motion.h2>

            {/* Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="border-l-2 border-emerald-400 pl-6 py-1"
            >
              <p className="text-[18px] font-semibold text-slate-700 leading-relaxed italic">
                &ldquo;Good software isn&apos;t just code that works — it&apos;s code that can grow, adapt, and be trusted.&rdquo;
              </p>
            </motion.blockquote>

            {/* Story paragraphs */}
            {[
              "I'm Hiyan Jong Rai, a Backend Developer from Udayapur, Bagaha, currently based in Kathmandu where I'm pursuing my BCA at Tribhuvan University. I spend my days writing Spring Boot services, designing database schemas, and shipping software that actually scales.",
              "My career path has been driven by genuine curiosity. Starting with freelance SEO work taught me to think about how systems connect — from search algorithms to user intent. That curiosity led me to backend engineering, where I interned at KritimMind Technology building REST APIs and authentication systems in production.",
              "I've shipped e-commerce platforms, real-time emergency dispatch systems, parcel tracking dashboards, and more. Each project taught me something different about building software that is not just functional, but reliable, maintainable, and purposeful.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.08 }}
                className="text-[16px] text-slate-600 leading-[1.85] font-medium"
              >
                {para}
              </motion.p>
            ))}

            {/* Philosophy Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="pt-4 border-t border-slate-100"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-5">My Mindset</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Scalability first', sub: 'Code that survives growth' },
                  { label: 'Security minded', sub: 'Auth, JWT, and validation' },
                  { label: 'Clean architecture', sub: 'MVC, layered, readable' },
                  { label: 'Always learning', sub: 'New tech, better patterns' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 leading-tight">{item.label}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 text-[14px] font-bold text-slate-900 hover:text-emerald-600 transition-colors duration-200"
              >
                See my work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
