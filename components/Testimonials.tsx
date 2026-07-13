'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Hiyan delivered a robust REST API backend for our platform ahead of schedule. His Spring Boot expertise, clean code structure, and proactive communication made the entire process seamless. One of the most reliable developers I've worked with.",
    name: 'Arun Sharma',
    role: 'CTO',
    company: 'KritimMind Technology',
    initials: 'AS',
    color: 'from-emerald-500 to-emerald-700',
    stars: 5,
  },
  {
    quote:
      "We hired Hiyan to improve our site's SEO and content structure. Within a month, our organic traffic grew by 35% and our page speed score jumped from 58 to 91. He understands both the technical and strategic sides beautifully.",
    name: 'James Mitchell',
    role: 'Marketing Director',
    company: 'Mirai Design & Print',
    initials: 'JM',
    color: 'from-blue-500 to-blue-700',
    stars: 5,
  },
  {
    quote:
      "Incredibly skilled backend engineer. Hiyan built our emergency services system from scratch — real-time geolocation, role-based access, and a clean API layer. The system handled our launch traffic without a single issue.",
    name: 'Prakash Thapa',
    role: 'Product Manager',
    company: 'Emergency Connect Nepal',
    initials: 'PT',
    color: 'from-violet-500 to-violet-700',
    stars: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-emerald-50/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-slate-50/80 blur-[100px]" />
      </div>

      <div className="container-custom mx-auto px-6 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-5 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            What People <span className="text-emerald-600">Say About Me</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-slate-500 font-semibold max-w-xl mx-auto leading-relaxed"
          >
            Real feedback from clients and colleagues I've had the privilege of working with.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm hover:border-emerald-100 hover:shadow-lg hover:shadow-slate-100/60 transition-all duration-300"
            >
              {/* Large faded quote background */}
              <Quote className="absolute top-5 right-6 h-10 w-10 text-slate-100 rotate-180 group-hover:text-emerald-50 transition-colors duration-300" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>

              {/* Quote text */}
              <p className="relative text-sm text-slate-600 font-semibold leading-[1.8] flex-1">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                {/* Avatar */}
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-white text-sm font-extrabold shadow-md`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{t.name}</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-100 bg-slate-50/60 px-8 py-5"
        >
          {[
            { num: '100%', label: 'Client Satisfaction' },
            { num: '4.9/5', label: 'Average Rating' },
            { num: '3+', label: 'Long-term Clients' },
            { num: '24h', label: 'Avg Response Time' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-extrabold text-slate-900">{s.num}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
