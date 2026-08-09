'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'pointer' | 'link' | 'view' | 'card'
  const [clickRipples, setClickRipples] = useState([]);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const trailParticlesRef = useRef([]);
  const requestRef = useRef(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Layered Springs for natural depth delay
  // 1. Center Dot (Fastest response)
  const dotSpringConfig = { stiffness: 900, damping: 38 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // 2. Main Inner Ring (Medium response)
  const ringSpringConfig = { stiffness: 220, damping: 26 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // 3. Outer Aura & Orbiting Particles (Softest response for depth)
  const auraSpringConfig = { stiffness: 120, damping: 22 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  useEffect(() => {
    // 1. Check Responsive / Touch fallback & Reduced Motion
    const mediaQueryTouch = window.matchMedia('(pointer: coarse)');
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQueryTouch.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    if (mediaQueryReducedMotion.matches) {
      setIsReducedMotion(true);
    }

    // 2. Mouse Position & Magnetic Attraction Listeners
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);

      // Add micro particle to fading trail canvas
      if (!mediaQueryReducedMotion.matches && canvasRef.current) {
        trailParticlesRef.current.push({
          x,
          y,
          size: Math.random() * 1.6 + 1,
          alpha: 0.4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          life: 1.0,
        });
      }
    };

    const handleMouseDown = (e) => {
      // Create a single elegant golden ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const buttonElem = target.closest('button') || target.closest('[role="button"]');
      const linkElem = target.closest('a');

      if (cursorAttr === 'view') {
        setCursorMode('view');
        setMagneticOffset({ x: 0, y: 0 });
      } else if (buttonElem) {
        setCursorMode('pointer');
        // Magnetic pull offset toward button center
        const rect = buttonElem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMagneticOffset({
          x: (centerX - mouseX.get()) * 0.22,
          y: (centerY - mouseY.get()) * 0.22,
        });
      } else if (linkElem) {
        setCursorMode('link');
        setMagneticOffset({ x: 0, y: 0 });
      } else if (cursorAttr === 'card' || target.closest('.group') || target.closest('.shadow-luxury')) {
        setCursorMode('card');
        setMagneticOffset({ x: 0, y: 0 });
      } else {
        setCursorMode('default');
        setMagneticOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // 3. Fading Golden Trail Canvas Loop
  useEffect(() => {
    if (!isEnabled || isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animateTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trailParticlesRef.current.length - 1; i >= 0; i--) {
        const p = trailParticlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.045; // Fades out in ~300ms

        if (p.life <= 0) {
          trailParticlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * p.life})`;
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isEnabled, isReducedMotion]);

  if (!isEnabled) return null;

  // Variants for main inner ring
  const getRingVariants = () => {
    switch (cursorMode) {
      case 'pointer':
        return {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(212, 175, 55, 0.14)',
          borderColor: 'rgba(212, 175, 55, 0.95)',
          borderWidth: '1.5px',
          scale: 1.15,
        };
      case 'view':
        return {
          width: 68,
          height: 68,
          backgroundColor: 'rgba(6, 36, 27, 0.92)',
          borderColor: 'rgba(212, 175, 55, 0.85)',
          borderWidth: '1.5px',
          scale: 1,
        };
      case 'link':
        return {
          width: 28,
          height: 28,
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          borderColor: 'rgba(212, 175, 55, 0.9)',
          borderWidth: '1.2px',
          scale: 1,
        };
      case 'card':
        return {
          width: 42,
          height: 42,
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          borderColor: 'rgba(212, 175, 55, 0.75)',
          borderWidth: '1px',
          scale: 1.05,
        };
      case 'default':
      default:
        return {
          width: 36,
          height: 36,
          backgroundColor: 'rgba(212, 175, 55, 0.04)',
          borderColor: 'rgba(212, 175, 55, 0.65)',
          borderWidth: '1px',
          scale: 1,
        };
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      
      {/* Canvas for Fading Micro Golden Trail */}
      {!isReducedMotion && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[99998]"
        />
      )}

      {/* 1. Outer Breathing Aura Ring */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          isReducedMotion
            ? { scale: 1, opacity: 0.15 }
            : {
                scale: [0.94, 1.1, 0.94],
                opacity: [0.12, 0.26, 0.12],
              }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-gradient-radial from-[#D4AF37]/20 via-[#D4AF37]/05 to-transparent border border-[#D4AF37]/30 blur-[2px]"
      />

      {/* 2. Orbiting Golden Heritage Particles (Always Rotating Around Aura Position) */}
      {!isReducedMotion && (
        <motion.div
          style={{
            x: auraX,
            y: auraY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="fixed top-0 left-0 w-12 h-12 flex items-center justify-center"
        >
          {/* Particle 1 (0 deg) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.9)] opacity-80" />
          {/* Particle 2 (120 deg) */}
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#F3E5AB] shadow-[0_0_6px_rgba(243,229,171,0.9)] opacity-70" />
          {/* Particle 3 (240 deg) */}
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_rgba(197,160,89,0.9)] opacity-75" />
        </motion.div>
      )}

      {/* 3. Main Antique Gold Inner Ring (Continuously Rotating + Magnetic Pull) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: `calc(-50% + ${magneticOffset.x}px)`,
          translateY: `calc(-50% + ${magneticOffset.y}px)`,
        }}
        animate={getRingVariants()}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_16px_rgba(212,175,55,0.22)]"
      >
        {/* Continuous Slow Rotating Ornamental Accent Ring */}
        {!isReducedMotion && (
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-3px] rounded-full border border-dashed border-[#D4AF37]/35 pointer-events-none"
          />
        )}

        {/* VIEW State Badge Label */}
        {cursorMode === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-extrabold tracking-widest text-[#D4AF37] uppercase select-none font-sans"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* 4. Central Glowing Gold Cursor Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          isReducedMotion
            ? { scale: 1 }
            : {
                scale: cursorMode === 'pointer' ? 0.7 : 1,
                opacity: cursorMode === 'view' ? 0 : 1,
              }
        }
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.95)]"
      />

      {/* 5. Click Ripples */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{
            x: ripple.x,
            y: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
            scale: 0.5,
            opacity: 0.85,
          }}
          animate={{
            scale: 2.2,
            opacity: 0,
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)] pointer-events-none"
          onAnimationComplete={() => {
            setClickRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}

    </div>
  );
}
