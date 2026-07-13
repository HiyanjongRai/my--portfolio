'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Pencil, Rocket, Database, Gauge, Lightbulb } from 'lucide-react';

/* ─── Expertise Cards ─────────────────────────────────────────── */
const expertiseCards = [
  {
    icon: Code2,
    title: 'Frontend Development',
    desc: 'Building responsive, fast, and interactive web interfaces.',
    pct: 78
  },
  {
    icon: Pencil,
    title: 'UI / UX Design',
    desc: 'Designing beautiful, intuitive and user-centered interfaces.',
    pct: 72
  },
  {
    icon: Rocket,
    title: 'Backend Development',
    desc: 'Building scalable APIs and robust backend systems.',
    pct: 85
  },
  {
    icon: Database,
    title: 'Database & Cloud',
    desc: 'Designing efficient databases and cloud-based solutions.',
    pct: 82
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    desc: 'Optimizing applications for speed and SEO performance.',
    pct: 76
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    desc: 'Solving complex problems with clean and efficient solutions.',
    pct: 90
  }
];

/* ─── Animated Progress Bar ───────────────────────────────────── */
function ProgressBar({ pct }: { pct: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mt-auto pt-4">
      <div className="flex justify-between items-center mb-1.5">
        <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden mr-3">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${pct}%` } : { width: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="h-full rounded-full bg-gradient-to-r from-[#16A34A] to-[#4ADE80]"
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xs font-bold text-[#16A34A] shrink-0"
        >
          {pct}%
        </motion.span>
      </div>
    </div>
  );
}

/* ─── Tech Stack Icons ────────────────────────────────────────── */
const techStack = [
  {
    name: 'Java',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect width="24" height="24" rx="5" fill="#E76F00" />
        <text x="12" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial">Java</text>
      </svg>
    )
  },
  {
    name: 'Spring Boot',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect width="24" height="24" rx="5" fill="#6DB33F" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="800" fontFamily="Arial">Spring</text>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <text x="12" y="17" textAnchor="middle" fill="#000" fontSize="9" fontWeight="900" fontFamily="Arial">JS</text>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text x="12" y="17" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="Arial">TS</text>
      </svg>
    )
  },
  {
    name: 'HTML5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E34F26">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    )
  },
  {
    name: 'CSS3',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#1572B6">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531l-.23-2.618 10.059.003-.77-2.365z"/>
      </svg>
    )
  },
  {
    name: 'MySQL',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="5" fill="#4479A1" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">MySQL</text>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="5" fill="#336791" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="800" fontFamily="Arial">PgSQL</text>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#47A248">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
      </svg>
    )
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#339933">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082 c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
      </svg>
    )
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F05032">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
      </svg>
    )
  },
  {
    name: 'Postman',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="5" fill="#FF6C37" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">POST</text>
      </svg>
    )
  }
];

const designTools = [
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 38 57" className="w-8 h-8">
        <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 01-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 000-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 019.5 0H19v19H9.5A9.5 9.5 0 010 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 019.5 19H19v19H9.5A9.5 9.5 0 010 28.5z" fill="#A259FF" />
      </svg>
    )
  },
  {
    name: 'VS Code',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8">
        <mask id="vsc-mask">
          <path fill="white" d="M70.912 4.819L38.17 35.448 15.045 18.799 3.835 24.5l26.004 25.5L3.835 75.5l11.21 5.701 23.125-16.649L70.912 95.18 96.165 82.5V17.5L70.912 4.819zM71 80.059L43.188 50 71 19.941V80.059z"/>
        </mask>
        <linearGradient id="vsc-grad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29B6F6"/>
          <stop offset="1" stopColor="#0288D1"/>
        </linearGradient>
        <rect width="100" height="100" rx="15" fill="url(#vsc-grad)" mask="url(#vsc-mask)" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#181717">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )
  },
  {
    name: 'IntelliJ',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#FE315D" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="Arial">IJ</text>
      </svg>
    )
  },
  {
    name: 'Photoshop',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#001E36" />
        <text x="12" y="17" textAnchor="middle" fill="#31A8FF" fontSize="8" fontWeight="900" fontFamily="Arial">Ps</text>
      </svg>
    )
  },
  {
    name: 'Webflow',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#4353FF">
        <path d="M17.803 7.014c-1.836 0-3.228 1.018-3.93 2.612-.71-2.426-2.452-2.612-4.29-2.612L7.87 14.3c.664-2.37 1.93-3.744 3.36-3.744 1.432 0 2.133.906 1.836 3.744h2.168l1.614-4.764c.592-1.734 1.59-2.75 2.95-2.75.704 0 1.282.362 1.282 1.016 0 1.52-2.318 2.458-3.532 3.496-.738.624-1.246 1.576-1.246 3.002h2.168c0-1.156.464-1.768 1.836-2.714C22.138 10.59 24 9.406 24 7.684c0-1.614-1.468-2.67-2.992-2.67-1.25 0-2.168.574-3.205 2zm-8.476 4.874C8.63 10.286 7.16 9.404 5.318 9.404c-2.204 0-3.676 1.634-4.594 3.796L0 16.96h2.168c.72-2.37 2.006-3.744 3.508-3.744 1.502 0 2.204.906 1.836 3.744h2.168l1.614-5.072h-1.967z"/>
      </svg>
    )
  },
  {
    name: 'Framer',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0055FF">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    )
  },
  {
    name: 'Adobe XD',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#470137" />
        <text x="12" y="17" textAnchor="middle" fill="#FF61F6" fontSize="8" fontWeight="900" fontFamily="Arial">XD</text>
      </svg>
    )
  },
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    )
  },
  {
    name: 'Netlify',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#00C7B7" />
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="800" fontFamily="Arial">Netlify</text>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg viewBox="0 0 54 33" className="w-8 h-8" fill="#06B6D4">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/>
      </svg>
    )
  },
  {
    name: 'Firebase',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="#FFCA28">
        <path d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0z" fill="#FFA000"/>
        <path d="M13.445 8.543l2.972 5.995-11.97 11.135z" fill="#F57F17"/>
        <path d="M23.123 7.003c.572-.55 1.164-.362 1.315.417l3.116 18.105-10.328 6.2c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z" fill="#FFCA28"/>
        <path d="M13.445 8.543l-9 17.13 3.944-18.568c.148-.78.71-1.017 1.248-.536z" fill="#FFA000"/>
      </svg>
    )
  }
];

/* ─── Stats Footer ────────────────────────────────────────────── */
const statsFooter = [
  { value: '2+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5', label: 'Awards Won' }
];

export default function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="expertise" ref={ref} className="relative bg-slate-950 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1280px] w-full space-y-14">

        {/* ── Section Header: editorial ───────────────── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500">Skills & Expertise</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
            >
              The tools I use<br />
              <span className="text-emerald-400 italic">to ship great work.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[17px] text-slate-400 font-medium leading-[1.7] lg:self-end lg:pb-1"
          >
            From backend APIs to frontend interfaces — I combine the right tools with disciplined engineering.
          </motion.p>
        </div>

        {/* ── 6 Expertise Cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {expertiseCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="group flex flex-col rounded-[20px] border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon box */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text */}
                <h3 className="text-[15px] font-bold text-white leading-tight mb-2">{card.title}</h3>
                <p className="text-[12px] text-slate-400 leading-relaxed flex-1">{card.desc}</p>

                {/* Animated progress bar */}
                <ProgressBar pct={card.pct} />
              </motion.div>
            );
          })}
        </div>

        {/* ── Tech Stack + Design Tools Panel ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* TECH STACK */}
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-7">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-emerald-500/10 text-emerald-400">
                  <Code2 className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-extrabold text-white uppercase tracking-wider">TECH STACK</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Always Learning
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-5 gap-y-6">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.04 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 group-hover:border-emerald-500/40 group-hover:-translate-y-1 transition-all duration-200">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 text-center leading-tight">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DESIGN & TOOLS */}
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-7">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-emerald-500/10 text-emerald-400">
                  <Pencil className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-extrabold text-white uppercase tracking-wider">DESIGN & TOOLS</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Tools I Love
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-5 gap-y-6">
              {designTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.04 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 group-hover:border-emerald-500/40 group-hover:-translate-y-1 transition-all duration-200">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 text-center leading-tight">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stats Footer Banner ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="rounded-[20px] border border-white/10 bg-white/5 px-8 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-0"
        >
          {/* Left: quote */}
          <div className="flex items-center gap-4 md:w-[260px] shrink-0 md:border-r md:border-white/10 md:pr-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-slate-300 leading-snug">
              Committed to excellence and always delivering my best.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:pl-8 flex-1 w-full">
            {statsFooter.map((stat, i) => {
              const icons = [
                <svg key="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                <svg key="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
                <svg key="smile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>,
                <svg key="award" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>
              ];
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    {icons[i]}
                  </div>
                  <div>
                    <p className="text-[28px] font-extrabold text-emerald-400 leading-none">{stat.value}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
