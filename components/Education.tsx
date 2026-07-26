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

        {/* ── Timeline ── */}
        <div className="relative pl-6 sm:pl-10 space-y-8 sm:space-y-10">
          {/* Vertical dashed connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute left-[3px] sm:left-[15px] top-3 bottom-3 w-0 border-l-2 border-dashed border-emerald-300 origin-top"
          />

          {educationTimeline.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Timeline node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 + idx * 0.15 }}
                className="absolute -left-[30px] sm:-left-[34px] top-6 h-5 w-5 rounded-full bg-white border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.35)] z-10 flex items-center justify-center"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.4 + idx * 0.12 }}
                className="group rounded-[22px] sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" strokeWidth={1.75} />
                    </div>

                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                        {item.tag === 'Ongoing' ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        {item.tag}
                      </span>
                      <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight">{item.title}</h3>
                      <p className="text-[13px] font-semibold text-emerald-600 mt-0.5">{item.institution}</p>
                    </div>
                  </div>

                  {/* Date only, top-right */}
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 shrink-0 sm:pt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.dates}
                  </div>
                </div>

                <p className="mt-4 text-[15px] sm:text-[14px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((hl, hi) => (
                    <span key={hi} className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-[12px] sm:text-[11px] font-semibold text-slate-600">
                      <hl.icon className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                      {hl.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
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