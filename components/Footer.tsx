'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, Calendar, Heart, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';
import { personalInfo } from '@/data/portfolio';

const footerLinks = [
  { href: 'hero', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'expertise', label: 'Skills' },
  { href: 'experience', label: 'Experience' },
  { href: 'projects', label: 'Projects' },
  { href: 'contact', label: 'Contact' }
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 lg:py-20">
        <div className="container-custom max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-4 mb-12">

            {/* Column 1: Brand & Logo */}
            <div className="md:col-span-2 space-y-5">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white text-2xl font-black tracking-tight flex items-center gap-2 hover:text-emerald-400 transition cursor-pointer"
              >
                Hiyan JonG Rai<span className="text-emerald-500">.</span>
              </button>

              <p className="text-sm font-medium leading-relaxed max-w-sm text-slate-400">
                Full Stack Developer &amp; UI/UX Designer specializing in clean, user-friendly, and high-performance digital products. Focused on clean code and performance.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{personalInfo.location} · Available for Remote</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-5">Navigation</h4>
              <nav className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-semibold hover:text-emerald-400 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact & Info */}
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">Availability</h4>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to Work
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-3">Resume</h4>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Download PDF Resume &rarr;
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Hiyan Jong Rai. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 fill-emerald-500 text-emerald-500 animate-pulse" />
              <span>using Next.js &amp; Tailwind</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Back to top"
          whileHover={{ y: -3 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </>
  );
}
