'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { GraduationCap, BookOpen, Calendar, Check, Shield, Trophy } from 'lucide-react';

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

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const educationTimeline = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Aadim National College, Tribhuvan University',
    dates: '2022 - Present',
    desc: 'Pursuing BCA with focus on software engineering, database systems, and web technologies. Building real-world projects alongside coursework.'
  },
  {
    icon: BookOpen,
    title: 'Higher Secondary Education (+2)',
    institution: 'Triyuga Janta Multiple Campus',
    dates: '2020 - 2022',
    desc: 'Completed +2 with computer science fundamentals, mathematics, and English. Gained strong programming foundations.'
  },
  {
    icon: GraduationCap,
    title: 'Secondary Education (SEE)',
    institution: 'Shree Sunkoshi Secondary School',
    dates: '2019 - 2020',
    desc: 'Completed secondary education with distinction. Developed early interest in technology and problem-solving.'
  }
];

const stats = [
  { icon: BookOpen, value: 6, suffix: '+', label: 'Years of Learning' },
  { icon: GraduationCap, value: 3, suffix: '', label: 'Degrees & Certifications' },
  { icon: Shield, value: 1000, suffix: '+', label: 'Hours of Self Learning' },
  { icon: Trophy, value: 15, suffix: '+', label: 'Courses Completed' }
];

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Framer Motion variants
  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 } }
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } }
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 + custom * 0.15 }
    })
  };

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + custom * 0.15 }
    })
  };

  return (
    <section 
      id="education" 
      ref={containerRef} 
      className="relative overflow-hidden bg-[#FAFAFA] py-16 lg:py-20 px-4 sm:px-5 lg:px-6"
    >
      {/* Subtle Blurred Radial Gradients (10% opacity glows) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-emerald-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-15%] w-[50%] h-[50%] rounded-full bg-blue-500/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-slate-400/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] w-full space-y-16">
        
        {/* ── Section Header ── */}
        <div className="text-center space-y-5">
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2 rounded-full border border-[#D8F5DF] bg-[#F3FAF5] px-6 py-3 h-[44px] text-xs font-semibold uppercase tracking-[0.08em] text-[#16A34A] shadow-sm select-none"
          >
            <GraduationCap className="h-4.5 w-4.5 text-[#16A34A]" />
            EDUCATION &amp; JOURNEY
          </motion.div>

          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-[38px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-tight text-[#111827] leading-[1.1] font-sans"
          >
            My Education.<br />
            <span className="bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] bg-clip-text text-transparent">
              My Foundation.
            </span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mx-auto max-w-[620px] text-lg sm:text-xl font-normal text-[#6B7280] leading-[1.7]"
          >
            A strong academic background that shaped my problem-solving skills and passion for technology.
          </motion.p>
        </div>

        {/* ── Two Column Layout (60% Left, 40% Right) ── */}
        <div className="grid gap-[40px] lg:grid-cols-[1.2fr_0.8fr] items-stretch">
          
          {/* Left Column: Timeline & Cards */}
          <div className="relative pl-[36px] sm:pl-[44px] flex flex-col gap-[28px] justify-between">
            
            {/* 2px Vertical Timeline Line */}
            <motion.div 
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="absolute left-[9px] sm:left-[13px] top-4 bottom-4 w-[2px] bg-[#4ADE80]/40 origin-top"
            />

            {educationTimeline.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="relative w-full">
                  {/* Glowing Node */}
                  <motion.div
                    custom={idx}
                    variants={nodeVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="absolute -left-[37px] sm:-left-[42px] top-8 h-[20px] w-[20px] rounded-full bg-white border-4 border-[#16A34A] shadow-[0_0_12px_rgba(22,163,74,0.4)] z-10 flex items-center justify-center"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  </motion.div>

                  {/* Card wrapper */}
                  <motion.div
                    custom={idx}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                      borderColor: '#4ADE80/30'
                    }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-[28px] border border-[#F1F5F9] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Icon Container (72x72) */}
                    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[18px] bg-[#F3FAF5] text-[#16A34A] group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                      <ItemIcon className="h-7 w-7 text-[#16A34A]" />
                    </div>

                    {/* Content Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h3 className="text-[24px] sm:text-[30px] font-bold text-[#111827] leading-[1.2]">
                          {item.title}
                        </h3>
                        
                        {/* Date Badge */}
                        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F3FAF5] border border-[#4ADE80]/30 px-4.5 py-1.5 text-xs font-semibold text-[#16A34A] self-start sm:self-auto">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.dates}
                        </div>
                      </div>

                      <h4 className="text-[18px] font-semibold text-[#16A34A]">
                        {item.institution}
                      </h4>

                      <p className="text-[16px] text-[#6B7280] leading-[1.7] font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="rounded-[32px] border border-[#EEF2F6] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col justify-between"
          >
            {/* Cap Image illustration container */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#FAFAFA] border border-[#EEF2F6] shadow-sm flex items-center justify-center group">
              <Image
                src="/images/education_illustration.png"
                alt="Continuous Learner Illustration"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              
              {/* Floating Green Star Badge */}
              <div className="absolute bottom-4 left-4 h-[48px] w-[48px] rounded-full bg-white border border-[#E5E7EB] shadow-md flex items-center justify-center text-[#16A34A] hover:scale-110 transition-transform duration-200">
                <StarIcon className="h-6 w-6 text-[#16A34A]" />
              </div>
            </div>

            {/* Feature Area */}
            <div className="mt-8 space-y-3">
              <h3 className="text-[28px] font-bold text-[#111827]">
                Continuous Learner
              </h3>
              <p className="text-[16px] text-[#6B7280] leading-[1.7] font-normal">
                I believe in lifelong learning and staying up to date with the latest technologies and best practices.
              </p>
            </div>

            {/* Thin Divider line */}
            <div className="h-px bg-[#EEF2F6] my-[28px]" />

            {/* Checklist */}
            <div className="space-y-[18px]">
              {[
                'Self-taught developer and designer',
                '1000+ hours of online learning',
                'Always exploring new technologies'
              ].map((bullet, idx) => (
                <div key={idx} className="flex gap-3 items-center text-[16px] text-[#6B7280] font-normal">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3FAF5] text-[#16A34A]">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* ── Bottom Statistics Section (Spanning full width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-[28px] border border-[#E5E7EB] bg-white p-9 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-[#E5E7EB]">
            {stats.map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div key={idx} className="flex items-center gap-4 px-2 lg:first:pl-0 lg:pl-8">
                  {/* Rounded icon box */}
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[18px] bg-[#F3FAF5] text-[#16A34A]">
                    <MetricIcon className="h-5.5 w-5.5 text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-[44px] font-extrabold text-[#16A34A] tracking-tight leading-none">
                      <AnimatedCounter to={metric.value} suffix={metric.suffix} />
                    </p>
                    <p className="mt-1.5 text-[16px] text-[#6B7280] font-medium leading-none">
                      {metric.label}
                    </p>
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

/* Custom Mini Star SVG */
function StarIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/>
    </svg>
  );
}
