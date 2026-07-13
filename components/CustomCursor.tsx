'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const dotSpringX = useSpring(dotX, { stiffness: 150, damping: 18 });
  const dotSpringY = useSpring(dotY, { stiffness: 150, damping: 18 });

  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleEnter = () => {
      isHovering.current = true;
      if (ringRef.current) {
        ringRef.current.classList.add('scale-[2.5]', 'bg-emerald-500/10', 'border-emerald-500');
        ringRef.current.classList.remove('border-slate-400/40');
      }
    };

    const handleLeave = () => {
      isHovering.current = false;
      if (ringRef.current) {
        ringRef.current.classList.remove('scale-[2.5]', 'bg-emerald-500/10', 'border-emerald-500');
        ringRef.current.classList.add('border-slate-400/40');
      }
    };

    window.addEventListener('mousemove', move);

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Dot — fast, tight follow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 hidden md:block"
        style={{ x: springX, y: springY }}
      />
      {/* Ring — slow, lagging follow */}
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400/40 transition-all duration-200 hidden md:block"
        style={{ x: dotSpringX, y: dotSpringY }}
      />
    </>
  );
}
