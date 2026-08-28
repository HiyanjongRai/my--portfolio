'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text?: string;
  speed?: number;        // ms per character (default 60ms)
  delay?: number;        // ms delay before starting (default 0)
  className?: string;
  showCursor?: boolean;
  hideCursorOnComplete?: boolean;
  once?: boolean;
  onComplete?: () => void;
  children?: React.ReactNode;
}

export function TypingText({
  text = 'Wanna know about me?',
  speed = 60,
  delay = 0,
  className = '',
  showCursor = true,
  hideCursorOnComplete = false,
  once = true,
  onComplete,
}: TypingTextProps) {
  const [inView, setInView] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Scroll trigger — native IntersectionObserver
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  // Character-by-character typing — only starts when inView is true
  // This is the user's original pattern: fires whenever displayed.length < text.length
  // Works perfectly in React Strict Mode because inView starts as false (state, not ref)
  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }

    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, displayed.length === 0 ? delay + speed : speed);
      return () => clearTimeout(timeout);
    } else if (!done) {
      setDone(true);
      onComplete?.();
    }
  }, [inView, displayed, text, speed, delay, done, onComplete]);

  const showCursorEl = showCursor && (!done || !hideCursorOnComplete);

  return (
    <span ref={spanRef} className={`inline ${className}`} aria-label={text}>
      <style>{`
        @keyframes blink-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .tw-cursor {
          margin-left: 1px;
          animation: blink-cursor 0.9s step-start infinite;
          font-weight: 300;
        }
        @media (prefers-reduced-motion: reduce) {
          .tw-cursor { animation: none; opacity: 0; }
        }
      `}</style>
      <span aria-hidden="true">{displayed}</span>
      {showCursorEl && (
        <span aria-hidden="true" className="tw-cursor">|</span>
      )}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export const TypewriterText = TypingText;
export default TypingText;
