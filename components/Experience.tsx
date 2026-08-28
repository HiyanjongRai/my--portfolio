'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2, Shield, Layers, Briefcase, FileCode } from 'lucide-react';
import { TypingText } from '@/components/ui/typing-text';

/* ─── Experience Data ──────────────────────────────────────────── */
const experiences = [
  {
    period: '2024 (3 Months)',
    title: 'Backend Developer Intern',
    company: 'KritimMind Technology',
    location: 'Kathmandu, Nepal',
    type: 'Full-time Internship',
    status: 'Completed',
    description:
      'Engineered backend systems and REST APIs utilizing Spring Boot, Java, and MySQL. Implemented Spring Security with JWT token authentication, designed relational data models, and integrated services with frontend client applications.',
    highlights: [
      'Built production-ready REST endpoints consumed by React frontend clients.',
      'Implemented stateless authentication workflows using Spring Security and JWT filters.',
      'Optimized SQL query procedures to reduce response latency across relational tables.',
    ],
    tags: ['Spring Boot', 'Java', 'MySQL', 'Spring Security', 'REST API', 'Hibernate'],
    link: 'https://www.kritimmind.com/developers',
  },
  {
    period: '2024',
    title: 'SEO Executive',
    company: 'Mirai Design & Print',
    location: 'United States (Remote)',
    type: 'Remote / Freelance',
    status: 'Completed',
    description:
      'Maintained digital platform performance, organic search presence, and on-page optimization for a US-based commercial print services company. Authored targeted technical blog posts and content hierarchies to drive search conversion.',
    highlights: [
      'Conducted exhaustive keyword analysis for high-intent print and design queries.',
      'Audited Core Web Vitals, improved asset delivery, and resolved indexing issues.',
      'Formulated strategic content schedules directly improving organic ranking positions.',
    ],
    tags: ['Keyword Research', 'Technical SEO', 'Google Analytics', 'Content Strategy'],
    link: 'https://miraisigns.com/',
  },
  {
    period: '2024',
    title: 'SEO & Content Specialist',
    company: 'DelhitoKathmandu & HimalayanHub',
    location: 'Nepal (Remote)',
    type: 'Part-time',
    status: 'Completed',
    description:
      'Directed organic SEO positioning, digital content publishing, and analytics reporting for popular restaurant & bar hospitality brands, accelerating local search discovery and engagement.',
    highlights: [
      'Authored localized keyword content strategies driving search traffic growth.',
      'Managed search console diagnostics, metadata optimization, and web presence.',
      'Delivered periodic performance reports to optimize user interaction flows.',
    ],
    tags: ['SEO Architecture', 'Content Strategy', 'Local Search', 'Analytics'],
    link: '#',
  },
];

/* ─── Engineering Standards ───────────────────────────────────── */
const standards = [
  {
    title: 'Architectural Integrity',
    desc: 'Strict separation of concerns via MVC, domain service isolation, and repository pattern.',
  },
  {
    title: 'Security & Verification',
    desc: 'Stateless JWT validation, password hashing, and role-based endpoint authorization.',
  },
  {
    title: 'Data Discipline',
    desc: 'Normalized schemas, indexing on high-frequency columns, and atomic transactions.',
  },
  {
    title: 'Search & Performance',
    desc: 'Fast server response times, structured schema markups, and clean semantic layouts.',
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-[#FAFAFA] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 border-b border-neutral-200"
    >
      <div className="container-custom mx-auto space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="editorial-label"
          >
            03 — EXPERIENCE
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02]">
            <TypingText
              text="Where have I worked?"
              speed={55}
              delay={200}
              showCursor={true}
              hideCursorOnComplete={false}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] sm:text-[16px] text-[#525252] leading-[1.65] max-w-xl"
          >
            A chronicle of professional engagements, backend development internships, and specialized technical consultancies.
          </motion.p>
        </div>

        {/* ── Two Column Layout (Timeline Left, Standards Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Editorial Timeline ── */}
          <div className="relative pl-6 sm:pl-8 border-l border-neutral-300 space-y-12 sm:space-y-14">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
                className="relative space-y-4"
              >
                {/* Timeline Marker Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-black bg-white" />

                {/* Header & Meta */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                      {exp.period}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider border border-neutral-300 px-2 py-0.5 rounded-xs text-neutral-700">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                    {exp.title}
                  </h3>

                  <p className="text-sm font-semibold text-neutral-700">
                    {exp.company} <span className="text-neutral-400 font-normal">· {exp.location}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[#525252] leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Highlights */}
                <ul className="space-y-2 pt-1">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-black shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tags & Link */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-neutral-300 bg-white px-2.5 py-0.5 text-[11px] font-mono text-neutral-800 rounded-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {exp.link && exp.link !== '#' && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                    >
                      Visit Organization
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Engineering Standards Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="space-y-6 lg:sticky lg:top-28"
          >
            <div className="bg-white border border-neutral-200 p-6 sm:p-7 rounded-sm space-y-6">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
                <Shield className="h-4 w-4 text-black" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                  Engineering Standards
                </h4>
              </div>

              <div className="space-y-5">
                {standards.map((std, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <p className="text-xs font-bold text-black uppercase tracking-tight flex items-center gap-2">
                      <span className="h-1 w-1 bg-black rounded-full" />
                      {std.title}
                    </p>
                    <p className="text-[12px] text-[#525252] leading-relaxed pl-3">
                      {std.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <p className="text-[11px] text-neutral-500 font-medium italic">
                  Dedicated to disciplined software engineering, testable code, and high operational reliability.
                </p>
              </div>
            </div>

            {/* Availability Box */}
            <div className="border border-neutral-900 bg-black text-white p-5 rounded-sm space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</p>
              <p className="text-sm font-bold">Open for Full-time Roles &amp; Technical Contracts</p>
              <p className="text-xs text-neutral-400">Kathmandu, Nepal · Remote &amp; Hybrid Worldwide</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
