'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Download, MapPin, GraduationCap, Briefcase, Code2, Quote, ShieldCheck, Layers, Gauge, Terminal } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { scrollToSection } from '@/lib/utils';
import { TypingText } from '@/components/ui/typing-text';

const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal' },
  { icon: GraduationCap, label: 'Degree', value: 'BCA (Aadim / TU)' },
  { icon: Briefcase, label: 'Experience', value: '2+ Years' },
  { icon: Code2, label: 'Specialty', value: 'Backend & Full-Stack' },
];

const storyParagraphs = [
  "Hi, I'm Hiyan Jong Rai (हियान जोङ राई), a Backend and Full-Stack Developer from Udayapur, Nepal, currently based in Kathmandu.",
  "I'm currently studying Bachelor of Computer Applications (BCA) at Tribhuvan University, Aadim National College.",
  "I mainly work with Java, Spring Boot, REST APIs, MySQL, and PostgreSQL. I enjoy building backend systems, designing databases, and writing clean and maintainable code. I'm also interested in full-stack development and enjoy turning ideas into real, working applications.",
  "Along with development, I've worked on SEO and digital growth for businesses including Delito Kathmandu, Himalayan Hub, and Mirai Design & Print.",
  "I'm always learning and improving my skills through personal projects, practice, and continuous self-study. I enjoy solving problems and building software that is simple, reliable, and useful.",
];

const mindset = [
  { icon: Gauge, label: 'Scalability First', sub: 'Systems engineered for growing load and concurrency' },
  { icon: ShieldCheck, label: 'Security Conscious', sub: 'Strict JWT authorization, sanitization & validation' },
  { icon: Layers, label: 'Clean Architecture', sub: 'Layered MVC, domain encapsulation, readable patterns' },
  { icon: Terminal, label: 'Continuous Craft', sub: 'Adopting modern tooling, optimization & best practices' },
];

const stats = [
  { num: '02+', label: 'Years Experience' },
  { num: '04+', label: 'Featured Projects' },
  { num: '03', label: 'Jobs / Internships' },
  { num: '1000+', label: 'Hours Self-Study' },
];

export default function AboutIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative bg-[#FAFAFA] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 border-b border-neutral-200">
      <div className="container-custom mx-auto space-y-16 sm:space-y-20">

        {/* ── Section Header ── */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="editorial-label"
          >
            01 — INTRODUCTION
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.02]">
            <TypingText
              text="Wanna know about me?"
              speed={65}
              delay={200}
              showCursor={true}
              hideCursorOnComplete={false}
            />
          </h2>
        </div>

        {/* ── Editorial Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Editorial Portrait & Facts ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 max-w-[420px] mx-auto lg:mx-0 w-full"
          >
            {/* Image Frame */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-neutral-900 bg-neutral-200">
              <Image
                src="/images/profile1.jpg"
                alt={personalInfo.name}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
                className="transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* Status pill overlay */}
              <div className="absolute top-4 right-4 bg-white/95 border border-neutral-200 px-3 py-1 text-[11px] font-bold text-black uppercase tracking-wider rounded-sm shadow-sm">
                ● Available for Work
              </div>

              {/* Name & Origin */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 backdrop-blur-sm rounded-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-300">Origin</p>
                <p className="text-sm font-semibold">{personalInfo.origin} · Based in {personalInfo.location}</p>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {quickFacts.map((fact, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200 p-3.5 rounded-sm"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 leading-none">{fact.label}</p>
                  <p className="text-xs font-bold text-black mt-1.5 truncate">{fact.value}</p>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full"
            >
              <Download className="h-4 w-4 text-neutral-600" />
              Download Full Resume (PDF)
            </a>
          </motion.div>

          {/* ── Right: Editorial Bio, Pull Quote & Mindset ── */}
          <div className="space-y-8 sm:space-y-10">

            {/* Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="border-l-2 border-black pl-5 py-1"
            >
              <p className="text-lg sm:text-xl font-medium text-neutral-900 leading-relaxed italic">
                &ldquo;I like to travel, explore new places, and create memories. In the same way, I want to explore a system — how it works, and what it does.&rdquo;
              </p>
            </motion.blockquote>

            {/* Biography Paragraphs */}
            <div className="space-y-5 text-[15px] sm:text-[16px] text-[#525252] leading-[1.75]">
              {storyParagraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Stats Grid with Clean Dividers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 border-y border-neutral-200 py-6 my-4 gap-6 sm:gap-0"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`text-left sm:text-center ${
                    i < stats.length - 1 ? 'sm:border-r sm:border-neutral-200' : ''
                  }`}
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-black leading-none">{stat.num}</p>
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Engineering Principles / Mindset */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="bg-white border border-neutral-200 p-6 rounded-sm space-y-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Engineering Principles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mindset.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-black mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black uppercase tracking-tight">{item.label}</p>
                        <p className="text-[12px] text-neutral-500 leading-snug mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* See Work CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-2"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary group"
              >
                Explore Selected Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}