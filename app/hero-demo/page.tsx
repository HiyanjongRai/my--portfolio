'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const portfolioMediaContent: MediaContentCollection = {
  video: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    background: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
    title: 'Backend Development Journey',
    date: 'My Portfolio',
    scrollToExpand: 'Scroll to Explore',
    about: {
      overview: 'As a Backend Developer specializing in Spring Boot, I create robust REST APIs and database architectures. This interactive showcase demonstrates my approach to building immersive web experiences that combine technical excellence with engaging user interfaces.',
      conclusion: 'From Nepal to the world, I build software that works reliably, scales effectively, and delivers real value. Let\'s collaborate on your next project.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=1280&auto=format&fit=crop',
    background: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    title: 'Code That Powers Ideas',
    date: 'Spring Boot Developer',
    scrollToExpand: 'Scroll to Discover',
    about: {
      overview: 'With expertise in Java, Spring Boot, MySQL, and PostgreSQL, I transform complex business requirements into clean, maintainable code. This portfolio showcases my ability to blend technical proficiency with creative presentation.',
      conclusion: 'Every project is an opportunity to learn, grow, and deliver exceptional solutions. Based in Kathmandu, working globally.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = portfolioMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-[#f6f1e8]'>
        About This Experience
      </h2>
      
      <div className='space-y-6'>
        <p className='text-lg text-[#d6d0c7] leading-relaxed'>
          {currentMedia.about.overview}
        </p>

        <div className='grid md:grid-cols-3 gap-6 my-8'>
          <div className='glass-card p-6 text-center'>
            <div className='text-3xl font-bold text-gradient mb-2'>20+</div>
            <div className='text-sm text-[#b7afa3]'>Projects Built</div>
          </div>
          <div className='glass-card p-6 text-center'>
            <div className='text-3xl font-bold text-gradient mb-2'>3+</div>
            <div className='text-sm text-[#b7afa3]'>Years Learning</div>
          </div>
          <div className='glass-card p-6 text-center'>
            <div className='text-3xl font-bold text-gradient mb-2'>10+</div>
            <div className='text-sm text-[#b7afa3]'>Technologies</div>
          </div>
        </div>

        <p className='text-lg text-[#d6d0c7] leading-relaxed'>
          {currentMedia.about.conclusion}
        </p>

        <div className='flex flex-wrap gap-4 pt-6'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-semibold'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Portfolio</span>
          </Link>
          
          <Link
            href='/#projects'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border-2 border-[#d39a45]/40 text-[#f0d2a1] font-semibold hover:bg-[#d39a45]/10 hover:border-[#d39a45]/60 transition-all'
          >
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function HeroDemoPage() {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = portfolioMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen bg-[#07111d]'>
      {/* Toggle Buttons */}
      <div className='fixed top-4 right-4 z-50 flex gap-2'>
        <button
          onClick={() => setMediaType('video')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mediaType === 'video'
              ? 'bg-gradient-to-r from-[#d39a45] to-[#72a79a] text-white shadow-lg'
              : 'bg-[#0d1724] text-[#d6d0c7] border border-[#d39a45]/30 hover:border-[#d39a45]/60'
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setMediaType('image')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mediaType === 'image'
              ? 'bg-gradient-to-r from-[#d39a45] to-[#72a79a] text-white shadow-lg'
              : 'bg-[#0d1724] text-[#d6d0c7] border border-[#d39a45]/30 hover:border-[#d39a45]/60'
          }`}
        >
          Image
        </button>
      </div>

      {/* Home Link */}
      <Link
        href='/'
        className='fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d1724]/80 backdrop-blur-sm border border-[#d39a45]/30 text-[#f0d2a1] hover:bg-[#d39a45]/10 hover:border-[#d39a45]/60 transition-all'
      >
        <ArrowLeft className='w-4 h-4' />
        <span className='hidden sm:inline'>Home</span>
      </Link>

      {/* ScrollExpandMedia Component */}
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
}
