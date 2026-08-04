'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Layers, X, ExternalLink, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

/* ─── Tag colour map ────────────────────────────────────────────── */
const TAG_COLORS: Record<string, string> = {
  'Spring Boot':   '#6DB33F',
  'Java':          '#E76F00',
  'PostgreSQL':    '#336791',
  'MySQL':         '#4479A1',
  'Spring Security':'#6DB33F',
  'JWT':           '#F7DF1E',
  'Spring Data JPA':'#6DB33F',
  'Java API':      '#E76F00',
  'SQL':           '#4479A1',
  'REST API':      '#22C55E',
  'Git':           '#F05032',
  'HTML/CSS':      '#E34F26',
  'JavaScript':    '#F7DF1E',
  'Node.js':       '#339933',
  'React':         '#61DAFB',
  'Next.js':       '#000000',
  'TypeScript':    '#3178C6',
  'Tailwind CSS':  '#06B6D4',
  'Prisma':        '#2D3748',
};

function TagDot({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? '#94A3B8';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      {tag}
    </span>
  );
}

/* ─── Project Data ──────────────────────────────────────────────── */
const allProjects = [
  {
    id: 1,
    category: 'E-Commerce',
    badge: 'E-Commerce Platform',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Jhapcham — eCommerce Platform',
    description: 'An e-commerce platform with multi-tenant seller boards, cart handling, and secure checkout systems.',
    problemSolved: 'Eliminated manual inventory logs and offline seller approvals by implementing an automated seller dashboard and concurrent transaction queues.',
    role: 'Lead Backend Developer',
    keyFeatures: [
      'Multi-tenant seller onboarding and product approval workflows.',
      'Optimised cart flows with transactional database rollbacks.',
      'Integrated recommendation logic for related inventory listings.'
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'Java', 'Spring Data JPA'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'Model-View-Controller (MVC) backed by a PostgreSQL schema and Hibernate ORM.',
    gradientFrom: '#16A34A',
    gradientTo: '#052e16',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 opacity-90">
        <rect x="4" y="4" width="72" height="52" rx="4" fill="#ffffff12"/>
        <rect x="8" y="8" width="30" height="18" rx="2" fill="#ffffff20"/>
        <rect x="42" y="8" width="30" height="8" rx="2" fill="#16A34A60"/>
        <rect x="42" y="20" width="30" height="6" rx="2" fill="#ffffff15"/>
        <rect x="8" y="30" width="64" height="1" fill="#ffffff15"/>
        <rect x="8" y="35" width="15" height="10" rx="1" fill="#ffffff20"/>
        <rect x="27" y="35" width="15" height="10" rx="1" fill="#ffffff20"/>
        <rect x="46" y="35" width="15" height="10" rx="1" fill="#ffffff20"/>
        <rect x="8" y="49" width="20" height="5" rx="1" fill="#16A34A80"/>
      </svg>
    )
  },
  {
    id: 2,
    category: 'Web Applications',
    badge: 'Real-time Web App',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Emergency Services System',
    description: 'A real-time notification dispatch hub connecting emergency requestors with active service units.',
    problemSolved: 'Replaced slow dispatcher calls with automatic geographic proximity checks and instant messaging channels.',
    role: 'Backend API Architect',
    keyFeatures: [
      'Real-time geographic lookup algorithms to pair providers.',
      'Role-based secure authorization with Spring Security & JWT.',
      'Concurrent request matching avoiding double-booking.'
    ],
    tags: ['Spring Boot', 'MySQL', 'Spring Security', 'JWT'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'RESTful API controller layer communicating with MySQL. Secured via JWT interceptor filters.',
    gradientFrom: '#0F172A',
    gradientTo: '#1E293B',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 opacity-90">
        <circle cx="40" cy="28" r="16" fill="#EF444420" stroke="#EF4444" strokeWidth="1.5"/>
        <circle cx="40" cy="28" r="8" fill="#EF444440"/>
        <circle cx="40" cy="28" r="3" fill="#EF4444"/>
        <line x1="40" y1="8" x2="40" y2="14" stroke="#EF4444" strokeWidth="1.5"/>
        <line x1="40" y1="42" x2="40" y2="48" stroke="#EF4444" strokeWidth="1.5"/>
        <line x1="20" y1="28" x2="26" y2="28" stroke="#EF4444" strokeWidth="1.5"/>
        <line x1="54" y1="28" x2="60" y2="28" stroke="#EF4444" strokeWidth="1.5"/>
        <rect x="4" y="50" width="20" height="6" rx="2" fill="#EF444430"/>
        <rect x="56" y="50" width="20" height="6" rx="2" fill="#22C55E30"/>
        <rect x="30" y="50" width="20" height="6" rx="2" fill="#3B82F630"/>
      </svg>
    )
  },
  {
    id: 3,
    category: 'Web Applications',
    badge: 'Enterprise Manager',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    title: 'Centralized Parcel Manager',
    description: 'An internal parcel routing dashboard for logistic hubs with secure tracking and role-based access.',
    problemSolved: 'Reduced tracking update delays by 50% through direct database procedures and automatic status webhooks.',
    role: 'Backend Intern',
    keyFeatures: [
      'Multi-tier admin hierarchies (Dispatcher, Carrier, Manager).',
      'Unified search tracking with indexable routing numbers.',
      'Event logging on parcel handoffs for compliance auditing.'
    ],
    tags: ['Java API', 'SQL', 'REST API', 'Git'],
    github: 'https://github.com/HiyanjongRai',
    demo: null,
    architecture: 'Java backend exposing REST APIs with database triggers tracking parcel location records.',
    gradientFrom: '#1D4ED8',
    gradientTo: '#1E1B4B',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 opacity-90">
        <rect x="4" y="8" width="72" height="6" rx="2" fill="#ffffff20"/>
        <rect x="4" y="18" width="72" height="1" fill="#ffffff10"/>
        <rect x="4" y="22" width="16" height="8" rx="1" fill="#ffffff15"/>
        <rect x="8" y="24" width="8" height="1" fill="#6366F1"/>
        <rect x="24" y="22" width="30" height="8" rx="1" fill="#ffffff15"/>
        <rect x="58" y="22" width="18" height="8" rx="1" fill="#22C55E30"/>
        <rect x="4" y="34" width="16" height="8" rx="1" fill="#ffffff15"/>
        <rect x="24" y="34" width="30" height="8" rx="1" fill="#ffffff15"/>
        <rect x="58" y="34" width="18" height="8" rx="1" fill="#F59E0B30"/>
        <rect x="4" y="46" width="16" height="8" rx="1" fill="#ffffff15"/>
        <rect x="24" y="46" width="30" height="8" rx="1" fill="#ffffff15"/>
        <rect x="58" y="46" width="18" height="8" rx="1" fill="#22C55E30"/>
      </svg>
    )
  }
  ,
  {
    id: 4,
    category: 'E-Commerce',
    badge: 'Live Fashion Store',
    badgeColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    title: 'AuraBeads — Fashion Jewelry Store',
    description: 'A fully live fashion jewelry e-commerce platform featuring a multi-category storefront, seller portal, wishlist, cart, and secure checkout for a Nepali brand.',
    problemSolved: 'Built an end-to-end online storefront that replaced manual sales operations, enabling sellers to list jewelry and buyers to browse, wishlist, and purchase seamlessly with order tracking.',
    role: 'Full Stack Developer',
    keyFeatures: [
      'Multi-category storefront: Earrings, Necklaces, Bracelets, Rings, Hair Accessories & Sunglasses.',
      'Seller portal with product upload, approval, and inventory management.',
      'Wishlist, cart, secure checkout, and real-time order tracking.',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    github: 'https://github.com/HiyanjongRai',
    demo: 'https://www.raianjaan.com.np/',
    architecture: 'Next.js full-stack application with server-side rendering, Prisma ORM for data persistence, and a RESTful API layer for seller and buyer operations.',
    gradientFrom: '#92400E',
    gradientTo: '#1C1917',
    logoUrl: '/aurabeads-logo.png',
    previewIcon: (
      <svg viewBox="0 0 80 60" fill="none" className="w-32 h-24 opacity-90">
        {/* Storefront header */}
        <rect x="4" y="4" width="72" height="10" rx="2" fill="#ffffff15"/>
        <text x="40" y="12" textAnchor="middle" fill="#D97706" fontSize="5" fontWeight="bold">AURABEADS</text>
        {/* Product grid */}
        <rect x="4" y="18" width="20" height="16" rx="2" fill="#ffffff12"/>
        <circle cx="14" cy="24" r="4" fill="#D97706A0"/>
        <rect x="6" y="30" width="16" height="2" rx="1" fill="#ffffff25"/>
        <rect x="26" y="18" width="20" height="16" rx="2" fill="#ffffff12"/>
        <circle cx="36" cy="24" r="4" fill="#D9770680"/>
        <rect x="28" y="30" width="16" height="2" rx="1" fill="#ffffff25"/>
        <rect x="48" y="18" width="20" height="16" rx="2" fill="#ffffff12"/>
        <circle cx="58" cy="24" r="4" fill="#D97706A0"/>
        <rect x="50" y="30" width="16" height="2" rx="1" fill="#ffffff25"/>
        {/* Category pills */}
        <rect x="4" y="38" width="14" height="5" rx="2.5" fill="#D9770640"/>
        <rect x="20" y="38" width="14" height="5" rx="2.5" fill="#ffffff15"/>
        <rect x="36" y="38" width="14" height="5" rx="2.5" fill="#ffffff15"/>
        <rect x="52" y="38" width="14" height="5" rx="2.5" fill="#ffffff15"/>
        {/* CTA button */}
        <rect x="20" y="48" width="40" height="8" rx="3" fill="#D97706"/>
        <text x="40" y="54" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">SHOP NOW</text>
      </svg>
    )
  }
];

const categories = ['All Projects', 'Web Applications', 'E-Commerce'];

/* ─── Project Card ──────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  isInView,
  onCaseStudy,
}: {
  project: (typeof allProjects)[0];
  index: number;
  isInView: boolean;
  onCaseStudy: (p: (typeof allProjects)[0]) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] sm:rounded-3xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* ── Visual Banner ── */}
      <div
        className="relative h-[140px] sm:h-[160px] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
      >
        {/* Browser chrome top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2.5 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="h-1.5 sm:h-2.5 w-1.5 sm:w-2.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 sm:h-2.5 w-1.5 sm:w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 sm:h-2.5 w-1.5 sm:w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className={`inline-flex items-center rounded-full border px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${project.badgeColor}`}>
            {project.badge}
          </span>
          <div className="w-6 sm:w-12" />
        </div>

        {/* Subtle grid bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,0.15) 20px,rgba(255,255,255,0.15) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,0.15) 20px,rgba(255,255,255,0.15) 21px)'
          }}
        />

        {/* SVG / Logo Mockup */}
        <div className="relative z-10 flex items-center justify-center mt-2 sm:mt-4 scale-75">
          {(project as typeof allProjects[0] & { logoUrl?: string }).logoUrl ? (
            <img
              src={(project as typeof allProjects[0] & { logoUrl?: string }).logoUrl}
              alt={`${project.title} logo`}
              className="w-32 h-22 object-contain drop-shadow-2xl"
            />
          ) : (
            project.previewIcon
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 gap-2 sm:gap-3">
        {/* Title + Description */}
        <div className="space-y-1">
          <h3 className="text-[13px] font-extrabold text-[#111827] group-hover:text-[#16A34A] transition-colors duration-200 leading-snug line-clamp-2">
            {project.title}
          </h3>
          <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech tag row */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags.map((tag) => (
            <TagDot key={tag} tag={tag} />
          ))}
        </div>

        {/* Divider + Actions */}
        <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-2">
          <button
            onClick={() => onCaseStudy(project)}
            className="min-h-9 rounded-full pr-2 text-[10px] font-bold text-[#374151] hover:text-[#16A34A] transition-colors duration-200 cursor-pointer"
          >
            Case Study
          </button>

          <div className="flex items-center gap-1.5">
            {(project as typeof allProjects[0] & { demo?: string | null }).demo && (
              <a
                href={(project as typeof allProjects[0] & { demo?: string | null }).demo!}
                target="_blank"
                rel="noreferrer"
                aria-label="Live Demo"
                className="inline-flex h-7 items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 text-[9px] font-bold text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 whitespace-nowrap"
              >
                <ExternalLink className="h-2.5 w-2.5" />
                Live
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] hover:bg-[#16A34A] hover:border-[#16A34A] hover:text-white transition-all duration-200"
            >
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
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
    <section id="projects" ref={ref} className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32 px-5 max-[360px]:px-4 sm:px-6 lg:px-8 border-t border-slate-100">

      <div className="mx-auto max-w-[1280px] w-full space-y-10 sm:space-y-12">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600">My Projects</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-[32px] min-[390px]:text-[36px] sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#111827] leading-[1.1]"
            >
              Work That Speaks<br className="hidden min-[390px]:block" />
              for <span className="text-[#16A34A]">Itself.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-[#6B7280] leading-[1.75] max-w-md"
            >
              Here's a selection of my recent projects. Each one represents a unique challenge, creative solution, and measurable impact.
            </motion.p>
          </div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid w-full grid-cols-2 gap-4 sm:flex sm:w-auto sm:gap-8 shrink-0 items-center"
          >
            <div className="text-center">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <p className="text-[34px] font-extrabold text-[#111827] leading-none tracking-tight">4+</p>
              </div>
              <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Projects Completed</p>
            </div>
          </motion.div>
        </div>

        {/* ── Filter Tabs + Sort ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-[12px] border px-4 py-2 text-[12px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#111827] border-[#111827] text-white shadow-sm'
                    : 'bg-white border-[#E5E7EB] text-[#374151] hover:border-[#D1FAE5] hover:bg-[#F3FAF5]'
                }`}
              >
                {cat === 'All Projects' && <Layers className="h-3.5 w-3.5" />}
                {cat === 'Web Applications' && (
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2"/>
                  </svg>
                )}
                {cat === 'E-Commerce' && (
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" strokeWidth="2"/>
                    <circle cx="20" cy="21" r="1" strokeWidth="2"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeWidth="2"/>
                  </svg>
                )}
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Project Cards (2-Col on Mobile, 4-Col on Desktop) ── */}
        <motion.div layout className="grid gap-4 sm:gap-5 grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                onCaseStudy={setSelectedCaseStudy}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://github.com/HiyanjongRai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full min-[390px]:w-auto items-center justify-center gap-2.5 rounded-full border border-[#E5E7EB] bg-white px-7 py-3.5 text-[13px] font-bold text-[#374151] shadow-sm hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            View More on GitHub
            <ExternalLink className="h-3.5 w-3.5 text-[#9CA3AF]" />
          </a>
        </motion.div>
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
              className="absolute inset-0 bg-[#111827]/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="relative w-full max-w-lg rounded-[24px] border border-[#E5E7EB] bg-white shadow-2xl p-5 sm:p-7 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-11 w-11 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-6">
                {/* Header */}
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${selectedCaseStudy.badgeColor}`}>
                    {selectedCaseStudy.badge}
                  </span>
                  <h3 className="text-[18px] font-extrabold text-[#111827] mt-3 leading-tight">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] mt-2 leading-relaxed">
                    {selectedCaseStudy.description}
                  </p>
                </div>

                {/* Problem + Role */}
                <div className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFA] p-5 space-y-4">
                  <div className="space-y-2">
                    <span className="flex items-center gap-2 text-[10px] font-extrabold text-red-600 uppercase tracking-widest">
                      <AlertCircle className="h-3.5 w-3.5" /> The Problem
                    </span>
                    <p className="text-[12px] text-[#374151] leading-relaxed">{selectedCaseStudy.problemSolved}</p>
                  </div>
                  <div className="space-y-2 border-t border-[#E5E7EB] pt-4">
                    <span className="flex items-center gap-2 text-[10px] font-extrabold text-[#16A34A] uppercase tracking-widest">
                      <CheckCircle2 className="h-3.5 w-3.5" /> My Role
                    </span>
                    <p className="text-[12px] text-[#374151] leading-relaxed">{selectedCaseStudy.role}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-widest">Key Milestones</span>
                  <ul className="space-y-2">
                    {selectedCaseStudy.keyFeatures.map((feat, j) => (
                      <li key={j} className="flex gap-3 items-start text-[12px] text-[#374151] leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture */}
                <div className="space-y-2 border-t border-[#F3F4F6] pt-5">
                  <span className="flex items-center gap-2 text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-widest">
                    <Shield className="h-3.5 w-3.5" /> Architecture
                  </span>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed">{selectedCaseStudy.architecture}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.tags.map((tag) => (
                    <TagDot key={tag} tag={tag} />
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-2 border-t border-[#F3F4F6]">
                  <a
                    href={selectedCaseStudy.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-[13px] font-bold text-white hover:bg-[#1F2937] transition-colors"
                  >
                    View Repository
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {selectedCaseStudy.demo && (
                    <a
                      href={selectedCaseStudy.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white py-3 text-[13px] font-bold text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                    >
                      Live Demo
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
