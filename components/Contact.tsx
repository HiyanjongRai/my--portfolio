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
  ShieldCheck 
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
    name: 'Pinterest',
    url: socialLinks.pinterest,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.195-.334 1.363-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: socialLinks.facebook,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
    <section id="contact" ref={ref} className="relative bg-[#F8FAFC] py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-100">

      <div className="mx-auto max-w-[1280px] w-full space-y-16">
        
        {/* ── Two Column Content Grid ── */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-start">
          
          {/* LEFT COLUMN: Header, Grid & Action Card */}
          <div className="space-y-10">
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
                className="text-[38px] sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#111827] leading-[1.1]"
              >
                Let's Build Something<br />
                <span className="text-[#16A34A]">Amazing</span> Together<span className="text-[#16A34A]">.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15.5px] text-[#6B7280] font-normal leading-relaxed max-w-xl"
              >
                Have a project in mind or want to discuss an idea? I'd love to hear from you. Let's create something great!
              </motion.p>
            </div>

            {/* Quick Contact Horizontal Grid (4 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location },
                { icon: Clock, label: 'Availability', value: personalInfo.availability }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A] border border-[#D1FAE5]/60 shadow-sm shadow-[#E8F8EE]">
                      <ItemIcon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider leading-none mb-1.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#374151] hover:text-[#16A34A] text-[13px] font-bold transition-colors break-all leading-normal">
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
              className="rounded-[28px] border border-[#E5E7EB] bg-[#F6FBF8]/80 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            >
              {/* Mail envelope inline mockup */}
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 100 80" fill="none" className="w-[85%] h-[85%] text-[#16A34A]">
                  {/* Envelope body */}
                  <rect x="10" y="25" width="80" height="50" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />
                  {/* Sliding Sheet */}
                  <path d="M22 15h56v30H22z" fill="white" stroke="#E5E7EB" strokeWidth="1.5" rx="3" />
                  {/* Check circle inside sheet */}
                  <circle cx="50" cy="30" r="10" fill="#16A34A" />
                  <path d="M46 30l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Envelope flap open back */}
                  <path d="M10 25l40 25 40-25" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              
              <div className="space-y-2 text-center sm:text-left w-full">
                <h3 className="text-[16px] font-bold text-[#111827] leading-tight">Let's Work Together</h3>
                <p className="text-[12.5px] text-[#6B7280] leading-relaxed">
                  I'm currently available for freelance projects and full-time opportunities.
                </p>
                <button
                  onClick={() => window.open(`mailto:${personalInfo.email}`)}
                  className="mt-2.5 inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-xs font-bold text-[#374151] shadow-sm hover:bg-[#FAFAFA] hover:border-[#D1FAE5] hover:text-[#16A34A] transition duration-200 cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-slate-500" />
                  Schedule a Call
                </button>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Send Message Form Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
          >
            <div>
              {/* Form Title Header */}
              <div className="flex gap-4 items-center mb-6 pb-6 border-b border-[#F3F4F6]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3FAF5] text-[#16A34A]">
                  <Send className="h-5 w-5 rotate-[-45deg] translate-x-[2px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827] leading-none">Send Me a Message</h3>
                  <p className="text-[11px] text-[#9CA3AF] font-bold mt-2 leading-none">
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
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-xs font-bold text-[#374151] mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-[#374151] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#374151] mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-medium focus:border-[#16A34A] focus:outline-none transition duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 rounded-2xl bg-[#16A34A] py-3.5 text-sm font-bold text-white shadow-md shadow-[#D1FAE5]/40 hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
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
                <div className="flex gap-2 items-center justify-center pt-1 text-[#9CA3AF] text-[10px] font-bold">
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
          className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB] gap-6 md:gap-0 items-center"
        >
          {/* Quick Response */}
          <div className="flex-1 flex items-center gap-3.5 px-6 py-4 md:py-0 w-full justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] leading-tight">Quick Response</h4>
              <p className="mt-1 text-[10px] font-semibold text-[#6B7280] leading-none">I usually reply within 24 hours.</p>
            </div>
          </div>

          {/* Let's Collaborate */}
          <div className="flex-1 flex items-center gap-3.5 px-6 py-4 md:py-0 w-full justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] leading-tight">Let's Collaborate</h4>
              <p className="mt-1 text-[10px] font-semibold text-[#6B7280] leading-none">I'm open to exciting projects and partnerships.</p>
            </div>
          </div>

          {/* Privacy Guaranteed */}
          <div className="flex-1 flex items-center gap-3.5 px-6 py-4 md:py-0 w-full justify-center md:justify-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3FAF5] text-[#16A34A]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#111827] leading-tight">Privacy Guaranteed</h4>
              <p className="mt-1 text-[10px] font-semibold text-[#6B7280] leading-none">Your information is 100% secure with me.</p>
            </div>
          </div>

          {/* Connect with me */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 px-6 py-4 md:py-0 w-full">
            <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">Connect with me</span>
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#16A34A] hover:bg-[#F3FAF5] hover:text-[#16A34A] transition shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon className="h-4.5 w-4.5" />
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
          className="fixed bottom-8 right-8 z-50 rounded-2xl border border-emerald-100 bg-white p-5 max-w-sm shadow-2xl"
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
