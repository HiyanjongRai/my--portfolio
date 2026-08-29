'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Server, Database, Globe, LineChart, Code2, Cloud, Layers } from 'lucide-react';
import { TypingText } from '@/components/ui/typing-text';

/* ─── Services / Expertise Cards ──────────────────────────────── */
const services = [
  {
    num: '01',
    title: 'Backend Development',
    desc: 'Building REST APIs, secure authentication with JWT and Spring Security, and reliable backend applications using Spring Boot.',
    icon: Server,
  },
  {
    num: '02',
    title: 'Database Development',
    desc: 'Working with PostgreSQL and MySQL to design clean database structures, write efficient queries, and manage relationships between data.',
    icon: Database,
  },
  {
    num: '03',
    title: 'Full-Stack Web Development',
    desc: 'Building responsive and high-performance websites and web applications with Next.js, React, and Java-based backends.',
    icon: Globe,
  },
  {
    num: '04',
    title: 'SEO',
    desc: 'Improving website visibility with technical SEO, faster page performance, keyword optimization, and structured data.',
    icon: LineChart,
  },
  {
    num: '05',
    title: 'API & System Integration',
    desc: 'Connecting payment gateways, email services, and third-party APIs while making sure systems handle errors reliably.',
    icon: Code2,
  },
  {
    num: '06',
    title: 'Deployment & DevOps',
    desc: 'Deploying and managing web applications using platforms like Vercel, Render, and cloud services, with a focus on simple and reliable deployment.',
    icon: Cloud,
  },
];

/* ─── Categorized Skills ───────────────────────────────────────── */
const skillGroups = [
  {
    category: 'BACKEND & ARCHITECTURE',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JWT Auth', 'Hibernate ORM', 'Spring Data JPA', 'RESTful APIs', 'MVC Architecture'],
  },
  {
    category: 'DATABASE & DATA LAYER',
    skills: ['PostgreSQL', 'MySQL', 'SQL Optimization', 'Relational Schema Design', 'Prisma ORM', 'Database Indexing'],
  },
  {
    category: 'FRONTEND & UI',
    skills: ['Next.js', 'React', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 / Semantic CSS', 'Framer Motion'],
  },
  {
    category: 'TOOLS, SEO & DEVOPS',
    skills: ['Git / GitHub', 'Technical SEO', 'Google Search Console', 'Google Analytics', 'Vercel', 'Render', 'VS Code', 'IntelliJ IDEA'],
  },
];

export default function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="expertise" ref={ref} className="relative bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 border-b border-neutral-200">
      <div className="container-custom mx-auto space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="editorial-label"
          >
            04 — EXPERTISE &amp; SKILLS
          </motion.div>

          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02] whitespace-nowrap">
            <TypingText
              text="What am I good at?"
              speed={40}
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
            I work with modern technologies to build reliable, fast, and user-friendly web applications—from backend systems and databases to frontend development, APIs, and deployment.
          </motion.p>
        </div>

        {/* ── Editorial Service Cards (Interactive Inversion on Hover) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="group relative flex flex-col justify-between border border-neutral-200 bg-white p-7 sm:p-8 rounded-sm transition-all duration-300 hover:bg-black hover:border-black hover:-translate-y-1 cursor-default"
              >
                <div className="space-y-6">
                  {/* Top Bar: Number and minimal Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300">
                      {service.num}
                    </span>
                    <Icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#525252] group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Arrow Indicator */}
                <div className="pt-6 mt-4 border-t border-neutral-100 group-hover:border-neutral-800 transition-colors duration-300 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-neutral-400 transition-colors duration-300">
                    Specialization
                  </span>
                  <ArrowRight className="h-4 w-4 text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Minimalist Outlined Skill Matrix (Grouped by Category) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="border-t border-neutral-200 pt-14 space-y-10"
        >
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-black">
              These are the tools I use.
            </p>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black uppercase">
              Technology Stack &amp; Tooling
            </h3>
            <p className="text-sm text-[#525252]">
              Standardized languages, frameworks, databases, and development workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {skillGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3.5">
                <p className="text-xs font-bold font-mono tracking-widest uppercase text-neutral-400">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-neutral-300 bg-white hover:border-black hover:bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 rounded-sm transition-colors duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}