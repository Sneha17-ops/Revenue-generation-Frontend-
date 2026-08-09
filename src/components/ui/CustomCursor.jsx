'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'pointer' | 'view' | 'card'
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for center dot and trailing ring
  const dotSpringConfig = { stiffness: 800, damping: 40 };
  const ringSpringConfig = { stiffness: 220, damping: 26 };

  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Check if device supports fine cursor (desktop) and reduced motion preferences
    const mediaQueryTouch = window.matchMedia('(pointer: coarse)');
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQueryTouch.matches || mediaQueryReducedMotion.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      // Check for specific data-cursor attributes or interactive elements
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      if (cursorAttr === 'view') {
        setCursorMode('view');
      } else if (
        cursorAttr === 'pointer' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select')
      ) {
        setCursorMode('pointer');
      } else if (
        cursorAttr === 'card' ||
        target.closest('.group') ||
        target.closest('.shadow-luxury')
      ) {
        setCursorMode('card');
      } else {
        setCursorMode('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled) return null;

  // Determine size & styling depending on cursor mode
  const getRingVariants = () => {
    switch (cursorMode) {
      case 'pointer':
        return {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(212, 175, 55, 0.12)',
          borderColor: 'rgba(212, 175, 55, 0.9)',
          borderWidth: '1.5px',
          scale: isMouseDown ? 0.9 : 1.15,
        };
      case 'view':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(11, 61, 46, 0.9)',
          borderColor: 'rgba(212, 175, 55, 0.8)',
          borderWidth: '1.5px',
          scale: isMouseDown ? 0.95 : 1,
        };
      case 'card':
        return {
          width: 42,
          height: 42,
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          borderColor: 'rgba(212, 175, 55, 0.7)',
          borderWidth: '1px',
          scale: isMouseDown ? 0.85 : 1.05,
        };
      case 'default':
      default:
        return {
          width: 32,
          height: 32,
          backgroundColor: 'rgba(212, 175, 55, 0.04)',
          borderColor: 'rgba(212, 175, 55, 0.65)',
          borderWidth: '1px',
          scale: isMouseDown ? 0.8 : 1,
        };
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Trailing Outer Luxury Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getRingVariants()}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
      >
        {cursorMode === 'view' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Central Gold Cursor Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorMode === 'pointer' ? 0.6 : isMouseDown ? 1.5 : 1,
          opacity: cursorMode === 'view' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]"
      />
    </div>
  );
}
