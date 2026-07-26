'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  Lock, 
  CheckCircle2, 
  MessageSquare, 
  HeartHandshake, 
  ShieldCheck,
  User,
  Tag,
  Edit3,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import emailjs from '@emailjs/browser';

/* ─── Social Links ────────────────────────────────────────────── */
const socials = [
  {
    name: 'GitHub',
    url: socialLinks.github,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: socialLinks.linkedin,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  },
  {
    name: 'Dribbble',
    url: socialLinks.dribbble,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M3.5 9.3c4.2 1.2 9.8 1 13.9-.55" strokeLinecap="round" />
        <path d="M5.1 17.4c1.7-3.1 4.3-6.6 8-8.9 2-1.25 4-1.95 5.6-2.15" strokeLinecap="round" />
        <path d="M10.2 3.1c2 2.9 4.4 8 5.1 12.9.35 2.2.35 3.4.3 4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Behance',
    url: socialLinks.behance,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <rect x="1" y="1" width="22" height="22" rx="6" fill="none" />
        <text
          x="12"
          y="16.2"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="11.5"
          fontWeight="700"
          fill="currentColor"
        >
          Bē
        </text>
      </svg>
    )
  }
];

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      setShowSuccess(true);
      formRef.current.reset();
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send message. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative bg-[#F8FAFC] py-16 sm:py-20 lg:py-32 px-5 max-[360px]:px-4 sm:px-6 lg:px-8 border-t border-slate-100">

      <div className="mx-auto max-w-[1280px] w-full space-y-12 sm:space-y-16">
        
        {/* ── Two Column Content Grid ── */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
          
          {/* LEFT COLUMN: Header, Grid & Action Card */}
          <div className="space-y-8 sm:space-y-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600">Get In Touch</span>
            </motion.div>

            {/* Heading & Paragraph */}
            <div className="space-y-5">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-[32px] min-[390px]:text-[36px] sm:text-[38px] lg:text-[54px] font-extrabold tracking-tight text-[#111827] leading-[1.1]"
              >
                Let&apos;s Build Something<br className="hidden min-[390px]:block" />
                <span className="text-[#16A34A]">Amazing</span> Together<span className="text-[#16A34A]">.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[16px] text-[#6B7280] font-normal leading-relaxed max-w-xl"
              >
                Have a project in mind or want to discuss an idea? I'd love to hear from you. Let's create something great!
              </motion.p>
            </div>

            {/* Quick Contact Horizontal Grid (4 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-5 sm:gap-6"
            >
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location },
                { icon: Clock, label: 'Availability', value: personalInfo.availability }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="space-y-2 rounded-2xl border border-slate-100 bg-white/60 p-4 min-[390px]:border-0 min-[390px]:bg-transparent min-[390px]:p-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A] border border-[#D1FAE5]/60 shadow-sm shadow-[#E8F8EE]">
                      <ItemIcon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider leading-none mb-1.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="inline-flex min-h-11 items-center text-[#374151] hover:text-[#16A34A] text-[13px] font-bold transition-colors break-all leading-normal">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#374151] text-[13px] font-bold leading-normal">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Let's Work Together Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#F6FBF8]/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            >
              {/* decorative faint wave lines */}
              <svg
                className="pointer-events-none absolute -right-6 -bottom-10 h-40 w-72 text-emerald-600/10"
                viewBox="0 0 300 160"
                fill="none"
              >
                <path d="M0 120 C 60 60, 120 160, 180 90 S 300 40, 300 40" stroke="currentColor" strokeWidth="2" />
                <path d="M0 90 C 60 30, 120 130, 180 60 S 300 10, 300 10" stroke="currentColor" strokeWidth="2" />
                <path d="M0 150 C 60 90, 120 190, 180 120 S 300 70, 300 70" stroke="currentColor" strokeWidth="2" />
              </svg>

              {/* icon */}
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-white shadow-md shadow-emerald-900/10 mx-auto sm:mx-0">
                <Mail className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
              </div>

              <div className="relative flex-1 space-y-1.5 text-center sm:text-left">
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111827] leading-tight">Let&apos;s Work Together</h3>
                <p className="text-[12.5px] sm:text-[13px] text-[#6B7280] leading-relaxed max-w-sm">
                  I'm currently available for freelance projects and full-time opportunities.
                </p>
              </div>

              <button
                onClick={() => window.open(`mailto:${personalInfo.email}`)}
                className="relative inline-flex min-h-12 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-[#14532D] px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-900/15 hover:bg-[#166534] transition duration-200 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Schedule a Call
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Send Message Form Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
          >
            <div>
              {/* Form Title Header */}
              <div className="flex gap-3 sm:gap-4 items-center mb-6 pb-6 border-b border-[#F3F4F6]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3FAF5] text-[#16A34A]">
                  <Send className="h-5 w-5 rotate-[-45deg] translate-x-[2px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827] leading-none">Send Me a Message</h3>
                  <p className="text-[12px] sm:text-[11px] text-[#9CA3AF] font-bold mt-2 leading-snug sm:leading-none">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from_name" className="block text-xs font-bold text-[#374151] mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        required
                        placeholder="Enter your name"
                        className="min-h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-4 pr-11 py-3 text-base sm:text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                      />
                      <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-xs font-bold text-[#374151] mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        required
                        placeholder="Enter your email"
                        className="min-h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-4 pr-11 py-3 text-base sm:text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                      />
                      <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-[#374151] mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="What's this about?"
                      className="min-h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-4 pr-11 py-3 text-base sm:text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                    />
                    <Tag className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#374151] mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project or idea..."
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 pr-11 text-base sm:text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200 resize-none"
                    />
                    <Edit3 className="pointer-events-none absolute bottom-3.5 right-4 h-4 w-4 text-[#9CA3AF]" />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-12 w-full flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#15803D] py-3.5 text-sm font-bold text-white shadow-md shadow-[#D1FAE5]/40 hover:from-[#16A34A] hover:to-[#14532D] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Privacy disclaimer */}
                <div className="flex gap-2 items-start justify-center pt-1 text-[#9CA3AF] text-[11px] sm:text-[10px] font-bold leading-snug text-center">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Your information is safe with me. I don't share your data.</span>
                </div>
              </form>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM HORIZONTAL VALUE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-1 min-[390px]:grid-cols-2 lg:grid-cols-4 divide-y min-[390px]:divide-x divide-[#E5E7EB] overflow-hidden"
        >
          {/* Quick Response */}
          <div className="flex items-start gap-3 p-4 sm:p-5">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[#111827] leading-tight">Quick Response</h4>
              <p className="mt-1 text-[12px] sm:text-[10px] font-semibold text-[#6B7280] leading-snug">I usually reply within 24 hours.</p>
            </div>
          </div>

          {/* Let's Collaborate */}
          <div className="flex items-start gap-3 p-4 sm:p-5">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[#111827] leading-tight">Let&apos;s Collaborate</h4>
              <p className="mt-1 text-[12px] sm:text-[10px] font-semibold text-[#6B7280] leading-snug">Open to exciting projects.</p>
            </div>
          </div>

          {/* Privacy Guaranteed */}
          <div className="flex items-start gap-3 p-4 sm:p-5">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[#111827] leading-tight">Privacy Guaranteed</h4>
              <p className="mt-1 text-[12px] sm:text-[10px] font-semibold text-[#6B7280] leading-snug">Your info is 100% secure.</p>
            </div>
          </div>

          {/* Connect with me */}
          <div className="flex flex-col items-start gap-2 p-4 sm:p-5">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">Connect</span>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#16A34A] hover:bg-[#F3FAF5] hover:text-[#16A34A] transition shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </motion.div>

      </div>

      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-5 left-5 right-5 sm:left-auto sm:bottom-8 sm:right-8 z-50 rounded-2xl border border-emerald-100 bg-white p-5 max-w-sm shadow-2xl"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">Message Sent!</h4>
              <p className="text-xs text-slate-500 font-semibold mt-1 leading-normal">
                Thank you for reaching out. I'll respond shortly.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}