'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Layers, X, ExternalLink, CheckCircle2, AlertCircle, Shield, Code, ArrowUpRight } from 'lucide-react';
import { TypingText } from '@/components/ui/typing-text';

/* ─── Project Data ──────────────────────────────────────────────── */
const allProjects = [
  {
    id: 1,
    category: 'E-Commerce',
    badge: 'E-Commerce Platform',
    title: 'Jhapcham — eCommerce Platform',
    description: 'An enterprise e-commerce platform with multi-tenant seller boards, cart transaction handling, and recommendation mechanics.',
    problemSolved: 'Eliminated manual inventory logs and offline seller approvals by implementing an automated seller dashboard and concurrent transaction queues with rollback safety.',
    role: 'Lead Backend Developer',
    keyFeatures: [
      'Multi-tenant seller onboarding and product approval workflows.',
      'Optimized cart flows with transactional database rollbacks and optimistic locking.',
      'Item-based Collaborative Filtering algorithm for related inventory suggestions.'
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'Java', 'Spring Data JPA', 'Hibernate'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'Layered MVC architecture backed by PostgreSQL schema, Hibernate ORM, and Spring REST controllers.',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 text-neutral-400">
        <rect x="4" y="4" width="72" height="52" rx="2" fill="#171717" stroke="#404040" strokeWidth="1"/>
        <rect x="8" y="8" width="28" height="16" rx="1" fill="#262626"/>
        <rect x="40" y="8" width="32" height="6" rx="1" fill="#525252"/>
        <rect x="40" y="18" width="24" height="4" rx="1" fill="#333333"/>
        <line x1="8" y1="28" x2="72" y2="28" stroke="#333333" strokeWidth="1"/>
        <rect x="8" y="32" width="16" height="10" rx="1" fill="#262626"/>
        <rect x="28" y="32" width="16" height="10" rx="1" fill="#262626"/>
        <rect x="48" y="32" width="16" height="10" rx="1" fill="#262626"/>
        <rect x="8" y="46" width="20" height="5" rx="1" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 2,
    category: 'Web Applications',
    badge: 'Real-time Dispatch',
    title: 'Emergency Services System',
    description: 'A real-time notification dispatch hub connecting emergency requestors with proximal service units through spatial mapping.',
    problemSolved: 'Replaced manual phone dispatching with automated geographic proximity checks and secure, high-concurrency request routing.',
    role: 'Backend API Architect',
    keyFeatures: [
      'Real-time geographic proximity algorithms pairing responders in under 500ms.',
      'Role-based secure authorization with Spring Security & signed JWTs.',
      'Concurrent request state machine preventing double-booking incidents.'
    ],
    tags: ['Spring Boot', 'MySQL', 'Spring Security', 'JWT', 'REST API'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'High-performance REST API controller layer communicating with MySQL, secured via interceptor filters and stateless tokens.',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 text-neutral-400">
        <rect x="4" y="4" width="72" height="52" rx="2" fill="#171717" stroke="#404040" strokeWidth="1"/>
        <circle cx="40" cy="26" r="14" fill="#262626" stroke="#525252" strokeWidth="1"/>
        <circle cx="40" cy="26" r="6" fill="#404040"/>
        <circle cx="40" cy="26" r="2" fill="#FFFFFF"/>
        <line x1="40" y1="8" x2="40" y2="14" stroke="#737373" strokeWidth="1.5"/>
        <line x1="40" y1="38" x2="40" y2="44" stroke="#737373" strokeWidth="1.5"/>
        <line x1="22" y1="26" x2="28" y2="26" stroke="#737373" strokeWidth="1.5"/>
        <line x1="52" y1="26" x2="58" y2="26" stroke="#737373" strokeWidth="1.5"/>
        <rect x="8" y="48" width="18" height="4" rx="1" fill="#525252"/>
        <rect x="30" y="48" width="18" height="4" rx="1" fill="#525252"/>
        <rect x="52" y="48" width="18" height="4" rx="1" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 3,
    category: 'Web Applications',
    badge: 'Enterprise Manager',
    title: 'Centralized Parcel Manager',
    description: 'An internal parcel routing dashboard for logistics hubs with indexed routing search, role hierarchies, and live event tracking.',
    problemSolved: 'Reduced tracking latency by 50% through stored database procedures, optimized indexing, and instant status notification webhooks.',
    role: 'Backend Developer',
    keyFeatures: [
      'Multi-tier admin hierarchies (Dispatcher, Carrier, Hub Manager).',
      'Unified search tracking with indexable routing identifiers.',
      'Immutable audit logging on parcel handoffs for operational compliance.'
    ],
    tags: ['Java API', 'SQL', 'REST API', 'Git', 'Spring Boot'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'Java Spring backend with structured database triggers and indexed query procedures tracking physical movement logs.',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 text-neutral-400">
        <rect x="4" y="4" width="72" height="52" rx="2" fill="#171717" stroke="#404040" strokeWidth="1"/>
        <rect x="8" y="8" width="64" height="6" rx="1" fill="#262626"/>
        <line x1="8" y1="18" x2="72" y2="18" stroke="#333333" strokeWidth="1"/>
        <rect x="8" y="22" width="16" height="6" rx="1" fill="#333333"/>
        <rect x="28" y="22" width="28" height="6" rx="1" fill="#262626"/>
        <rect x="60" y="22" width="12" height="6" rx="1" fill="#FFFFFF"/>
        <rect x="8" y="32" width="16" height="6" rx="1" fill="#333333"/>
        <rect x="28" y="32" width="28" height="6" rx="1" fill="#262626"/>
        <rect x="60" y="32" width="12" height="6" rx="1" fill="#525252"/>
        <rect x="8" y="42" width="16" height="6" rx="1" fill="#333333"/>
        <rect x="28" y="42" width="28" height="6" rx="1" fill="#262626"/>
        <rect x="60" y="42" width="12" height="6" rx="1" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    id: 4,
    category: 'E-Commerce',
    badge: 'Live Production Store',
    title: 'AuraBeads — Fashion Jewelry Store',
    description: 'A live e-commerce platform featuring multi-category storefront, seller portal, wishlist, shopping cart, and order tracking.',
    problemSolved: 'Engineered an end-to-end e-commerce experience replacing manual offline operations with automated seller uploads, inventory controls, and order dispatching.',
    role: 'Full Stack Developer',
    keyFeatures: [
      'Multi-category catalog: Earrings, Necklaces, Bracelets, Rings, Accessories & Eyewear.',
      'Protected seller dashboard with product approvals and real-time inventory management.',
      'Wishlist, transactional shopping cart, checkout, and live order tracking.'
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/HiyanjongRai',
    demo: 'https://www.raianjaan.com.np/',
    architecture: 'Full-stack Next.js SSR application with Prisma ORM data layer and RESTful API endpoints for buyers and merchant admins.',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 text-neutral-400">
        <rect x="4" y="4" width="72" height="52" rx="2" fill="#171717" stroke="#404040" strokeWidth="1"/>
        <rect x="8" y="8" width="64" height="8" rx="1" fill="#262626"/>
        <text x="40" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" letterSpacing="1">AURABEADS</text>
        <rect x="8" y="20" width="18" height="16" rx="1" fill="#262626"/>
        <circle cx="17" cy="27" r="4" fill="#525252"/>
        <rect x="30" y="20" width="18" height="16" rx="1" fill="#262626"/>
        <circle cx="39" cy="27" r="4" fill="#525252"/>
        <rect x="52" y="20" width="18" height="16" rx="1" fill="#262626"/>
        <circle cx="61" cy="27" r="4" fill="#525252"/>
        <rect x="24" y="42" width="32" height="8" rx="1" fill="#FFFFFF"/>
        <text x="40" y="47.5" textAnchor="middle" fill="#000000" fontSize="3.5" fontWeight="bold">VISIT STORE</text>
      </svg>
    )
  }
];

const categories = ['All Projects', 'Web Applications', 'E-Commerce'];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<typeof allProjects[0] | null>(null);

  const filtered =
    activeCategory === 'All Projects'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="relative bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 border-b border-neutral-200">
      <div className="container-custom mx-auto space-y-12 sm:space-y-16">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-4 border-b border-neutral-200">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="editorial-label"
            >
              02 — MY PROJECTS
            </motion.div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02]">
              <TypingText
                text="Want to see my work?"
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
              className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.65] max-w-xl"
            >
              A selection of projects I&apos;ve worked on, including backend systems, web applications, and live deployments.
            </motion.p>
          </div>

          {/* Metric Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex items-center gap-6"
          >
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-black leading-none">04</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">Featured Systems</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-black leading-none">100%</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">Production Ready</p>
            </div>
          </motion.div>
        </div>

        {/* ── Category Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-sm ${
                activeCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-transparent text-neutral-600 border border-neutral-300 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Asymmetric Editorial Grid (2 columns on desktop) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.3) }}
                className="group flex flex-col justify-between border border-neutral-200 bg-white hover:border-black transition-all duration-200 rounded-sm overflow-hidden"
              >
                {/* ── Project Preview Graphic ── */}
                <div className="relative aspect-[16/10] bg-[#111111] flex items-center justify-center p-6 border-b border-neutral-200 overflow-hidden">
                  {/* Top Bar Label */}
                  <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    <span>{String(project.id).padStart(2, '0')} // {project.category}</span>
                    <span className="border border-neutral-700 px-2 py-0.5 text-neutral-300 rounded-xs">{project.badge}</span>
                  </div>

                  {/* Mockup Icon Graphic with subtle hover zoom */}
                  <div className="mt-4 transition-transform duration-300 group-hover:scale-105">
                    {project.previewIcon}
                  </div>
                </div>

                {/* ── Project Details ── */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#525252] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-2">
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="text-xs font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      Case Study
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-black hover:underline"
                        >
                          Live Site
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
                      >
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── View More on GitHub ── */}
        <div className="text-center pt-6">
          <a
            href="https://github.com/HiyanjongRai"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            View More Repositories on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white border border-black p-6 sm:p-8 rounded-sm shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center border border-neutral-300 hover:border-black rounded-sm text-black cursor-pointer transition-colors"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto pr-2 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {selectedCaseStudy.category} // {selectedCaseStudy.badge}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-black mt-1">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                    {selectedCaseStudy.description}
                  </p>
                </div>

                {/* Problem & Role */}
                <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-sm space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Problem Solved</span>
                    <p className="text-xs text-neutral-800 font-medium mt-1 leading-relaxed">{selectedCaseStudy.problemSolved}</p>
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Engineering Role</span>
                    <p className="text-xs text-neutral-800 font-bold mt-0.5">{selectedCaseStudy.role}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Key Deliverables</span>
                  <ul className="space-y-1.5">
                    {selectedCaseStudy.keyFeatures.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-black shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture */}
                <div className="border-t border-neutral-200 pt-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Architecture &amp; Data Layer</span>
                  <p className="text-xs text-neutral-600 leading-relaxed">{selectedCaseStudy.architecture}</p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedCaseStudy.tags.map((tag) => (
                    <span key={tag} className="border border-neutral-300 px-2 py-0.5 text-[11px] font-mono text-black rounded-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Modal CTA */}
                <div className="flex gap-3 pt-4 border-t border-neutral-200">
                  <a
                    href={selectedCaseStudy.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary flex-1 text-center"
                  >
                    View Code on GitHub
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {selectedCaseStudy.demo && (
                    <a
                      href={selectedCaseStudy.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary flex-1 text-center"
                    >
                      Visit Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
