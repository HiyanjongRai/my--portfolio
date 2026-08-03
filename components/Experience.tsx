'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, ArrowUpRight, CheckCircle2, Shield, Heart } from 'lucide-react';

/* ─── Experience Data ──────────────────────────────────────────── */
const experiences = [
  {
    period: '2024',
    duration: 'Internship',
    title: 'Backend Developer Intern',
    company: 'KritimMind Technology',
    location: 'Kathmandu, Nepal',
    type: 'Full-time Internship',
    status: 'Completed',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    dotColor: 'bg-emerald-500',
    description:
      'Worked on backend development building web applications and REST APIs using Spring Boot and MySQL. Implemented Spring Security for authentication, designed relational database schemas, and integrated APIs with frontend clients.',
    highlights: [
      'Built robust REST APIs consumed by React client apps',
      'Implemented secure JWT-based Spring Security auth filters',
      'Optimized MySQL relational queries to reduce server response load times',
    ],
    tags: ['Spring Boot', 'Java', 'MySQL', 'Spring Security', 'REST API'],
    link: 'https://www.kritimmind.com/developers',
  },
  {
    period: '2024',
    duration: 'Remote',
    title: 'SEO Executive',
    company: 'Mirai Design & Print',
    location: 'United States (Remote)',
    type: 'Freelance / Remote',
    status: 'Completed',
    statusColor: 'bg-[#F3FAF5] text-[#16A34A] border-emerald-100',
    dotColor: 'bg-emerald-600',
    description:
      'Worked on their website, maintained SEO rankings, wrote blog articles, and created targeted content to improve organic search visibility for a sign printing services company.',
    highlights: [
      'Conducted in-depth keyword research for printing services search terms',
      'Improved page load speeds and overall SEO structure (Google Lighthouse)',
      'Structured technical content strategy across search-friendly landing pages',
    ],
    tags: ['Keyword Research', 'On-Page SEO', 'Google Analytics', 'Content Strategy'],
    link: 'https://miraisigns.com/',
  },
  {
    period: '2024',
    duration: 'Remote',
    title: 'SEO & Content Specialist',
    company: 'DelhitoKathmandu & HimalayanHub',
    location: 'Nepal (Remote)',
    type: 'Part-time',
    status: 'Completed',
    statusColor: 'bg-[#F3FAF5] text-[#16A34A] border-emerald-100',
    dotColor: 'bg-emerald-600',
    description:
      'Managed SEO strategy, blog posts, content creation, social media handling, and analytics reporting for restaurant and bar brands. Focused on improving local search presence, on-page structure, and driving organic traffic.',
    highlights: [
      'Wrote keyword-rich blog posts to boost restaurant search rankings',
      'Managed content creation, social media handling, and page analytics reports',
      'Monitored Google Search Console & Analytics performance reports to drive engagement',
    ],
    tags: ['SEO', 'Content Creation', 'Social Media', 'Analytics'],
    link: '#',
  },
];

/* ─── Work Philosophy Bullet Points ────────────────────────────── */
const philosophyPoints = [
  {
    title: 'Clean & Modern Backend Architecture',
    desc: 'Structuring application domains with MVC, Hibernate ORM, and secure interceptor layers.'
  },
  {
    title: 'Secure & Reliable JWT Authentication',
    desc: 'Implementing password encoders, token validation, and role-based access controller endpoints.'
  },
  {
    title: 'SEO & Core Web Vitals Optimization',
    desc: 'Conducting site audits, structured schema layouts, and assets optimization for fast page loads.'
  },
  {
    title: 'Agile & Collaborative Workflows',
    desc: 'Working with Git branch controls, pull requests, and matching product expectations.'
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Motion variants
  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 } }
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 + custom * 0.15 }
    })
  };

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.45 + custom * 0.15 }
    })
  };

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative overflow-hidden bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 px-5 max-[360px]:px-4 sm:px-6 lg:px-8 border-t border-[#E5E7EB]"
    >
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-400/[0.06] blur-[110px]" />
        <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/[0.04] blur-[110px]" />
      </div>

      <div className="mx-auto max-w-[1280px] w-full space-y-12 sm:space-y-16">

        {/* ── Section Header ── */}
        <div className="text-center space-y-4">
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#16A34A]"
          >
            <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            MY JOURNEY
          </motion.div>

          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-[32px] min-[390px]:text-[36px] sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#111827] leading-[1.1]"
          >
            Professional <span className="text-[#16A34A]">Experience</span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-[16px] sm:text-[17px] text-[#6B7280] font-normal max-w-lg mx-auto leading-[1.7]"
          >
            A timeline of my professional roles, internships, and remote collaborations.
          </motion.p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* LEFT: Interactive Timeline (60%) */}
          <div className="relative">
            {/* Timeline Line — ml-[10px] wrapper + left-0 ensures line and nodes share x-axis */}
            <div className="relative ml-[10px] sm:ml-[14px]">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#16A34A] via-[#86EFAC] to-[#F3F4F6] origin-top z-0"
            />

            <div className="pl-8 sm:pl-12 space-y-8 sm:space-y-10">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative">
                  
                  {/* Glowing Node Dot — left-0 of ml-offset wrapper = same as line */}
                  <motion.div
                    custom={idx}
                    variants={nodeVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute left-0 -translate-x-1/2 top-5 z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white border-2 border-[#16A34A] shadow-[0_0_12px_rgba(22,163,74,0.35)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    custom={idx}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="group w-full rounded-[22px] sm:rounded-[28px] border border-[#E5E7EB] bg-white p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${exp.statusColor}`}>
                            {exp.status}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
                            <Briefcase className="h-2.5 w-2.5 text-[#16A34A]" />
                            {exp.type}
                          </span>
                        </div>
                        
                        <h3 className="text-[18px] sm:text-xl font-extrabold text-[#111827] group-hover:text-[#16A34A] transition-colors duration-300 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-bold text-slate-500">{exp.company}</p>
                      </div>

                      {/* Period & Location */}
                      <div className="sm:text-right shrink-0 space-y-1">
                        <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-slate-500">
                          <Calendar className="h-3.5 w-3.5 text-[#16A34A]" />
                          {exp.period}
                        </div>
                        <div className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold text-slate-400">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Paragraph description */}
                    <p className="text-[14px] text-[#6B7280] font-normal leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Core highlights */}
                    <ul className="space-y-2.5 mb-6">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-[13px] text-[#374151] font-medium leading-relaxed">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#F3FAF5] text-[#16A34A]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Footer Tech Tags */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-[#F3F4F6] pt-4.5">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {exp.link && exp.link !== '#' && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 sm:mt-0 sm:ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#374151] hover:bg-[#F3FAF5] hover:border-[#D1FAE5] hover:text-[#16A34A] transition-all duration-200"
                        >
                          Visit Page
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                  </motion.div>
                </div>
              ))}
            </div>
            </div> {/* close ml wrapper */}
          </div>

          {/* RIGHT: Visual Philosophy Panel (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 lg:sticky lg:top-[90px]"
          >
            {/* Overview / Philosophy Card */}
            <div className="rounded-[24px] sm:rounded-[32px] border border-[#E5E7EB] bg-white p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center gap-3.5 pb-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D1FAE5] bg-[#F3FAF5] text-[#16A34A]">
                  <Shield className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">METHODOLOGY</p>
                  <h3 className="text-base font-extrabold text-[#111827] leading-none">Engineering Standards</h3>
                </div>
              </div>

              {/* Philosophy list points */}
              <div className="space-y-5">
                {philosophyPoints.map((item, pIdx) => (
                  <div key={pIdx} className="space-y-1.5">
                    <h4 className="text-xs font-extrabold text-[#111827] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7280] font-normal leading-relaxed pl-3.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider line */}
              <div className="h-px bg-[#F3F4F6]" />

              {/* Summary quote */}
              <div className="flex gap-3 items-start text-xs text-[#374151] font-semibold leading-relaxed">
                <Heart className="h-4.5 w-4.5 text-[#16A34A] shrink-0 mt-0.5 fill-[#16A34A]/10" />
                <span>
                  Designing services and workflows that are secure, optimized, and built to create real user and search impact.
                </span>
              </div>
            </div>

            {/* Availability status badge */}
            <div className="rounded-[24px] sm:rounded-[28px] border border-[#D1FAE5] bg-gradient-to-br from-[#F4FAF6] to-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#16A34A]">
                <Briefcase className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">AVAILABLE NOW</span>
                </div>
                <p className="text-sm font-extrabold text-[#111827]">Open for Roles &amp; Freelance Work</p>
                <p className="text-[11px] text-[#6B7280] font-medium leading-none">Kathmandu, Nepal · Remote &amp; Hybrid OK</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
