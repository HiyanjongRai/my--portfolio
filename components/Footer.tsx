'use client';

import { ArrowUp, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { scrollToSection } from '@/lib/utils';
import { personalInfo, socialLinks } from '@/data/portfolio';

const navLinks = [
  { href: 'hero', label: 'Home', isRoute: false },
  { href: 'about', label: 'About', isRoute: false },
  { href: 'projects', label: 'Work', isRoute: false },
  { href: 'experience', label: 'Experience', isRoute: false },
  { href: 'expertise', label: 'Expertise', isRoute: false },
  { href: 'education', label: 'Education', isRoute: false },
  { href: '/moments', label: 'Moments', isRoute: true },
  { href: 'contact', label: 'Contact', isRoute: false },
];

const socials = [
  { name: 'GitHub', href: socialLinks.github },
  { name: 'LinkedIn', href: socialLinks.linkedin },
  { name: 'Instagram', href: socialLinks.instagram },
  { name: 'Facebook', href: socialLinks.facebook },
  { name: 'Pinterest', href: socialLinks.pinterest },
  { name: 'Blog', href: socialLinks.blog },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-neutral-400 py-16 sm:py-20 px-5 sm:px-8 border-t border-neutral-900">
      <div className="container-custom mx-auto space-y-12">

        {/* ── Top Row: Brand & Quick Navigation ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-neutral-900">
          <div className="space-y-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left text-xl font-bold uppercase tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer"
            >
              Hiyan Jong Rai
            </button>
            <p className="text-xs text-neutral-500 max-w-sm">
              Backend Developer crafting scalable APIs, secure authentication systems, and performant data layers.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              )
            ))}
          </nav>
        </div>

        {/* ── Bottom Row: Copyright, Socials & Back to Top ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-medium">
          {/* Copyright */}
          <p className="order-2 sm:order-1 text-center sm:text-left">
            HIYAN JONG RAI © {new Date().getFullYear()} · ALL RIGHTS RESERVED.
          </p>

          {/* Social Links */}
          <div className="order-1 sm:order-2 flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-wider text-neutral-400">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="order-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}