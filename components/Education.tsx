'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Calendar,
  BookMarked,
  CheckCircle2,
  Database,
  Globe,
  Code2,
  Monitor,
  Sigma,
  Terminal,
  FlaskConical,
  Calculator,
  Puzzle,
  GraduationCap,
  BookOpen,
  School,
} from 'lucide-react';

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
          const step = Math.ceil(to / 45);
          const timer = setInterval(() => {
            start = Math.min(start + step, to);
            setCount(start);
            if (start >= to) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const educationTimeline = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Aadim National College, Tribhuvan University',
    dates: '2022 – Present',
    tag: 'Ongoing',
    desc: 'Pursuing BCA with focus on software engineering, database systems, and web technologies. Building real-world projects alongside coursework.',
    highlights: [
      { icon: Database, label: 'Data Structures & Algorithms' },
      { icon: Database, label: 'DBMS & SQL' },
      { icon: Globe, label: 'Web Technologies' },
      { icon: Code2, label: 'OOP with Java' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Higher Secondary Education (+2)',
    institution: 'Triyuga Janta Multiple Campus',
    dates: '2020 – 2022',
    tag: 'Completed',
    desc: 'Completed +2 with computer science fundamentals, mathematics, and English. Gained strong programming foundations.',
    highlights: [
      { icon: Monitor, label: 'Computer Science' },
      { icon: Sigma, label: 'Mathematics' },
      { icon: Terminal, label: 'C++ Programming' },
    ],
  },
  {
    icon: School,
    title: 'Secondary Education (SEE)',
    institution: 'Shree Sunkoshi Secondary School',
    dates: '2019 – 2020',
    tag: 'Completed',
    desc: 'Completed secondary education with distinction. Developed early interest in technology and problem-solving.',
    highlights: [
      { icon: FlaskConical, label: 'Science & Technology' },
      { icon: Calculator, label: 'Maths' },
      { icon: Puzzle, label: 'Problem Solving' },
    ],
  },
];

const stats = [
  { value: 6, suffix: '+', label: 'Years of Learning' },
  { value: 3, suffix: '', label: 'Qualifications' },
  { value: 1000, suffix: '+', label: 'Hours of Study' },
  { value: 15, suffix: '+', label: 'Courses Done' },
];

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative bg-white py-16 sm:py-20 lg:py-32 px-5 max-[360px]:px-4 sm:px-6 lg:px-8 border-t border-slate-100"
    >
      <div className="mx-auto max-w-[1280px] w-full space-y-12 sm:space-y-20">

        {/* ── Header: Left-aligned editorial ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-5"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600">Education Journey</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
            >
              Where I learned<br className="hidden min-[390px]:block" />
              <span className="text-emerald-600 italic">to build things.</span>
            </motion.h2>

            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 block h-1 w-10 origin-left rounded-full bg-emerald-500"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="border-l-2 border-emerald-500 pl-4 sm:pl-5"
          >
            <p className="text-[16px] sm:text-[17px] text-slate-500 leading-[1.75] sm:leading-[1.8] font-medium">
              A strong academic foundation — shaped by formal degrees, self-study, and a relentless curiosity for technology.
            </p>
          </motion.div>
        </div>

        {/* ── Education Cards ── */}
        <div className="space-y-5 sm:space-y-7">
          {educationTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-[18px] sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Left emerald accent bar */}
              <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-emerald-500 opacity-80 group-hover:opacity-100 group-hover:top-3 group-hover:bottom-3 transition-all duration-300" />

              {/* Step number — decorative background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-[60px] sm:text-[90px] font-black leading-none text-emerald-50 group-hover:text-emerald-100/70 transition-colors duration-300"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Card content */}
              <div className="relative z-10 flex gap-3 sm:gap-5">
                {/* Icon */}
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200 self-start">
                  <item.icon className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-600" strokeWidth={1.75} />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  {/* Tag + Date row — stacks on very small screens */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.tag === 'Ongoing' ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      )}
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {item.dates}
                    </div>
                  </div>

                  <h3 className="text-[15px] sm:text-[17px] font-extrabold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-emerald-600 mt-0.5 mb-2 sm:mb-3">{item.institution}</p>
                  <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed font-medium mb-3">{item.desc}</p>

                  {/* Highlights — wraps naturally */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((hl, hi) => (
                      <span
                        key={hi}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-slate-600"
                      >
                        <hl.icon className="h-3 w-3 text-emerald-600" strokeWidth={2} />
                        {hl.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 min-[390px]:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white px-6 sm:px-8 py-7 sm:py-8 text-center">
              <p className="text-[32px] sm:text-[36px] font-extrabold text-emerald-700 leading-none tracking-tight">
                <AnimatedCounter to={stat.value} />
                {stat.suffix && <span className="text-[0.75em] font-bold">{stat.suffix}</span>}
              </p>
              <p className="mt-2.5 text-[11px] text-slate-400 font-semibold uppercase tracking-[0.1em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Self-learning callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.85 }}
          className="flex flex-col min-[390px]:flex-row items-start gap-4 sm:gap-5 rounded-[22px] sm:rounded-3xl bg-emerald-50 border border-emerald-100 p-5 sm:p-7"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-emerald-100 text-emerald-600">
            <BookMarked className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-[15px]">Beyond the classroom</p>
            <p className="text-[13px] text-slate-500 font-medium mt-1 leading-relaxed">
              I supplement formal education with 1,000+ hours of self-study through Udemy, Coursera, YouTube, and building real projects — because the best learning happens when you ship code.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}