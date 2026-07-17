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
    name: 'Spring Boot',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#6DB33F">
        <path d="m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z"/>
      </svg>
    )
  },
  {
    name: 'HTML',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#E34F26">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    )
  },
  {
    name: 'CSS',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#1572B6">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531l-.23-2.618 10.059.003-.77-2.365z"/>
      </svg>
    )
  },
  {
    name: 'JS',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <text x="12" y="17" textAnchor="middle" fill="#000" fontSize="9" fontWeight="900" fontFamily="Arial">JS</text>
      </svg>
    )
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <rect width="24" height="24" rx="5" fill="#20232A" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
      </svg>
    )
  },
  {
    name: 'MySQL',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#4479A1">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"/>
      </svg>
    )
  }
];

const designTools = [
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#000">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
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
    name: 'Render',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#46E3B7">
        <path d="M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75"/>
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
    name: 'IntelliJ IDEA',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FE315D">
        <path d="M0 0v24h24V0zm3.723 3.111h5v1.834h-1.39v6.277h1.39v1.834h-5v-1.834h1.444V4.945H3.723zm11.055 0H17v6.5c0 .612-.055 1.111-.222 1.556-.167.444-.39.777-.723 1.11-.277.279-.666.557-1.11.668a3.933 3.933 0 0 1-1.445.278c-.778 0-1.444-.167-1.944-.445a4.81 4.81 0 0 1-1.279-1.056l1.39-1.555c.277.334.555.555.833.722.277.167.611.278.945.278.389 0 .721-.111 1-.389.221-.278.333-.667.333-1.278zM2.222 19.5h9V21h-9z"/>
      </svg>
    )
  }
];

/* ─── Stats Footer ────────────────────────────────────────────── */
const statsFooter = [
  { value: '2+', label: 'Years Experience' },
  { value: '4', label: 'Projects Completed' },
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
