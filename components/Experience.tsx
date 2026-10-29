'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2, Shield, Layers, Briefcase, FileCode } from 'lucide-react';
import { TypingText } from '@/components/ui/typing-text';

/* ─── Experience Data ──────────────────────────────────────────── */
const experiences = [
  {
    period: '2024 · 3 Months · Full-time Internship',
    title: 'Backend Developer Intern',
    company: 'KritimMind Technology',
    location: 'Kathmandu, Nepal',
    type: 'Full-time Internship',
    status: 'Completed',
    description:
      'Worked on backend systems and REST APIs using Spring Boot, Java, and MySQL. I also worked with Spring Security and JWT authentication, database design, and frontend-backend integration.',
    highlights: [
      'Built REST APIs used by React frontend applications.',
      'Implemented secure authentication using Spring Security and JWT.',
      'Designed relational database structures and improved SQL queries.',
      'Worked with Hibernate and JPA for database operations.',
    ],
    tags: ['Spring Boot', 'Java', 'MySQL', 'Spring Security', 'REST API', 'Hibernate'],
    link: 'https://www.kritimmind.com/developers',
  },
  {
    period: '2024 · Remote · Freelance',
    title: 'SEO Executive',
    company: 'Mirai Design & Print',
    location: 'United States (Remote)',
    type: 'Remote / Freelance',
    status: 'Completed',
    description:
      'Worked on improving website visibility, search rankings, and overall SEO performance for a US-based printing and design company.',
    highlights: [
      'Researched keywords and identified opportunities to improve search rankings.',
      'Worked on technical SEO, website performance, and indexing issues.',
      'Created SEO-focused content and organized content strategies.',
      'Monitored website performance using analytics and search tools.',
    ],
    tags: ['Keyword Research', 'Technical SEO', 'Google Analytics', 'Content Strategy'],
    link: 'https://miraisigns.com/',
  },
  {
    period: '2024 · Part-time',
    title: 'SEO & Content Specialist',
    company: 'DelhitoKathmandu & HimalayanHub',
    location: 'Nepal (Remote)',
    type: 'Part-time',
    status: 'Completed',
    description:
      'Worked on SEO, content, and online visibility for restaurant and hospitality businesses. Focused on improving local search presence and creating useful content for their audiences.',
    highlights: [
      'Created content based on local search and relevant keywords.',
      'Managed metadata, search visibility, and Search Console reports.',
      'Monitored website performance and user engagement.',
      'Used SEO insights to improve content and online presence.',
    ],
    tags: ['SEO', 'Content Strategy', 'Local SEO', 'Analytics'],
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
  const shouldReduceMotion = useReducedMotion();

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

          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02] whitespace-nowrap">
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
            A look at my professional experience in backend development, SEO, and web technologies.
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
                className="group relative space-y-4"
              >
                {/* Timeline Marker Dot with hover response */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-black bg-white group-hover:bg-black group-hover:scale-125 transition-all duration-200" />

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

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:underline underline-offset-4 transition-colors">
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
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">
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
                      className="border border-neutral-300 bg-white hover:border-black hover:bg-neutral-100 px-2.5 py-0.5 text-[11px] font-mono text-neutral-800 rounded-xs transition-colors duration-150 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                  {exp.link && exp.link !== '#' && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link ml-auto inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                    >
                      Visit Organization
                      <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
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
            <div className="bg-white border border-neutral-200 p-6 sm:p-7 rounded-sm space-y-6 shadow-xs hover:border-black transition-colors duration-200">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
                <Shield className="h-4 w-4 text-black" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                  Engineering Standards
                </h4>
              </div>

              <div className="space-y-5">
                {standards.map((std, sIdx) => (
                  <div key={sIdx} className="space-y-1 hover:translate-x-1 transition-transform duration-200 cursor-default">
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
            <div className="border border-neutral-900 bg-black text-white p-5 rounded-sm space-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-shadow duration-200">
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
