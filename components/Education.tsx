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
import { TypingText } from '@/components/ui/typing-text';

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
    step: '01',
    icon: GraduationCap,
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Aadim National College, Tribhuvan University',
    dates: '2022 – Present',
    tag: 'Ongoing',
    desc: 'Pursuing undergraduate degree in Computer Applications with in-depth focus on software engineering, relational database systems, algorithms, and full-stack development.',
    highlights: [
      'Data Structures & Algorithms',
      'DBMS & SQL Schema Architecture',
      'Web Technologies & MVC',
      'Object-Oriented Programming (Java)',
    ],
  },
  {
    step: '02',
    icon: BookOpen,
    title: 'Higher Secondary Education (+2 Science/CS)',
    institution: 'Triyuga Janta Multiple Campus',
    dates: '2020 – 2022',
    tag: 'Completed',
    desc: 'Completed +2 with computer science fundamentals, advanced mathematics, and programming logic. Built early foundational software algorithms in C/C++.',
    highlights: [
      'Computer Science Fundamentals',
      'Discrete Mathematics',
      'C/C++ Programming Logic',
    ],
  },
  {
    step: '03',
    icon: School,
    title: 'Secondary Education Examination (SEE)',
    institution: 'Shree Sunkoshi Secondary School',
    dates: '2019 – 2020',
    tag: 'Completed',
    desc: 'Completed secondary education with distinction. Developed foundational analytical rigor, problem-solving skills, and passion for technology.',
    highlights: [
      'Science & Technology',
      'Mathematics',
      'Problem Solving',
    ],
  },
];

const stats = [
  { value: 6, suffix: '+', label: 'Years of Learning' },
  { value: 3, suffix: '', label: 'Qualifications' },
  { value: 1000, suffix: '+', label: 'Hours of Self-Study' },
  { value: 15, suffix: '+', label: 'Completed Courses' },
];

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
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
            05 — EDUCATION
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02]">
            <TypingText
              text="Where did I learn to build things?"
              speed={45}
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
            A strong academic grounding paired with continuous self-directed learning in software engineering and modern backend architectures.
          </motion.p>
        </div>

        {/* ── Education Timeline Cards ── */}
        <div className="space-y-6">
          {educationTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
              className="bg-white border border-neutral-200 p-6 sm:p-8 rounded-sm hover:border-black transition-colors duration-200 space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-mono font-black text-black">
                    {item.step}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                    {item.dates}
                  </span>
                </div>
                <span className="border border-neutral-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black rounded-xs">
                  {item.tag}
                </span>
              </div>

              {/* Title & Institution */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-0.5">
                  {item.institution}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#525252] leading-relaxed">
                {item.desc}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-2">
                {item.highlights.map((hl, hi) => (
                  <span
                    key={hi}
                    className="border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-700 rounded-xs"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Strip (Clean Monochrome Grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 border border-neutral-200 bg-white divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 rounded-sm"
        >
          {stats.map((stat, i) => (
            <div key={i} className="p-6 sm:p-8 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-black leading-none font-mono">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Self-Learning Callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border border-neutral-300 bg-white p-6 sm:p-7 rounded-sm flex items-start gap-4"
        >
          <BookMarked className="h-5 w-5 text-black shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-black uppercase tracking-tight">Continuous Self-Directed Mastery</p>
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
              Complementing formal academic studies with over 1,000+ hours of independent exploration into enterprise frameworks, backend system design, database tuning, and production software shipping.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}