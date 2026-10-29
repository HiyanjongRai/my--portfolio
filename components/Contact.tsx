'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  User,
  Tag,
  Edit3,
  ExternalLink
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import emailjs from '@emailjs/browser';
import { TypingText } from '@/components/ui/typing-text';

const socials = [
  { name: 'GitHub', url: socialLinks.github },
  { name: 'LinkedIn', url: socialLinks.linkedin },
  { name: 'Instagram', url: socialLinks.instagram },
  { name: 'Facebook', url: socialLinks.facebook },
  { name: 'Pinterest', url: socialLinks.pinterest },
  { name: 'Dev Blog', url: socialLinks.blog },
];

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);
    setSubmitError(null);

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
      setSubmitError('Failed to send your message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative bg-black text-white py-24 sm:py-32 lg:py-40 px-5 sm:px-8 border-b border-neutral-900">
      <div className="container-custom mx-auto space-y-16 sm:space-y-20">
        
        {/* ── Contact Header ── */}
        <div className="space-y-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400"
          >
            06 — CONTACT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-white"
          >
            Let&apos;s Build<br />
            Something Great<br />
            Together<span className="text-neutral-500">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] sm:text-[18px] text-neutral-400 leading-[1.65] max-w-xl"
          >
            Have an open role, an architecture idea, or a new project in mind? Reach out directly and let&apos;s turn concepts into production code.
          </motion.p>
        </div>

        {/* ── Two-Column Grid: Contact Info & Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Direct Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="space-y-8"
          >
            {/* Quick Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:-translate-y-0.5 hover:bg-neutral-900/60 p-5 rounded-sm space-y-1 transition-all duration-200">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Direct Email</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-neutral-300 transition-colors break-all inline-block"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div className="group border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:-translate-y-0.5 hover:bg-neutral-900/60 p-5 rounded-sm space-y-1 transition-all duration-200">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Phone</p>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-neutral-300 transition-colors inline-block"
                >
                  {personalInfo.phone}
                </a>
              </div>

              <div className="group border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:-translate-y-0.5 hover:bg-neutral-900/60 p-5 rounded-sm space-y-1 transition-all duration-200">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Location</p>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {personalInfo.location}
                </p>
              </div>

              <div className="group border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:-translate-y-0.5 hover:bg-neutral-900/60 p-5 rounded-sm space-y-1 transition-all duration-200">
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Availability</p>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {personalInfo.availability}
                </p>
              </div>
            </div>

            {/* Direct Email Outlined CTA */}
            <div className="border border-neutral-800 hover:border-neutral-700 p-6 rounded-sm space-y-4 transition-colors duration-200">
              <h3 className="text-base font-bold uppercase tracking-tight text-white">
                Start a Conversation
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Available for backend engineering positions, full-stack builds, or freelance technical architecture.
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-black hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-sm w-full sm:w-auto"
              >
                Send Direct Email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            {/* Social Channels */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Social Networks</p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                {socials.map((social, index) => (
                  <span key={social.name} className="flex items-center gap-4">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white hover:-translate-y-0.5 transition-all duration-150 inline-block"
                    >
                      {social.name}
                    </a>
                    {index < socials.length - 1 && <span className="text-neutral-700">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Minimalist Monochrome Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 rounded-sm space-y-6 shadow-xl"
          >
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill out the brief form below and I will respond within 24 hours.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div aria-live="polite" aria-atomic="true">
                {submitError && (
                  <div role="alert" className="border border-red-500/50 bg-red-950/40 px-4 py-3 text-xs font-semibold text-red-300 rounded-sm">
                    {submitError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="from_name" className="block text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none rounded-sm transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="from_email" className="block text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none rounded-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Backend Project / Contract Role"
                  className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none rounded-sm transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your goals, timelines, or specifications..."
                  className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white/20 focus:outline-none rounded-sm transition-all duration-200 resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-white text-black hover:bg-neutral-200 hover:-translate-y-0.5 active:translate-y-0 border border-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0 shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] font-mono text-neutral-500">
                <Lock className="h-3 w-3" />
                <span>Your information is protected. No spam.</span>
              </div>
            </form>
          </motion.div>

        </div>

      </div>

      {/* Success Notification Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-white text-black p-5 border border-black rounded-sm shadow-2xl max-w-sm"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Message Sent Successfully</h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Thank you for reaching out. I will get back to you shortly.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}