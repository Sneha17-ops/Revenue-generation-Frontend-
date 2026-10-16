'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Crown } from 'lucide-react';

export const LegacyVideoSection = ({ 
  title = "A Taste Preserved Through Generations",
  subtitle = "Gaya's authentic artisanal Tilkut & sweet-making heritage",
  showTitle = true,
  className = ""
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

  // Detect accessibility prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Pause video when outside viewport to optimize performance
  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  // Toggle Audio
  const toggleSound = (e) => {
    e.stopPropagation(); // Prevent video click conflict
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div ref={containerRef} className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 ${className}`}>
      
      {/* Container Motion Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/35 shadow-[0_20px_50px_-15px_rgba(11,61,46,0.18)] hover:border-[#D4AF37]/60 transition-all duration-500 group bg-[#06241B]"
      >

        {/* Ambient Soft Gold Backlight Glow */}
        <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-[#D4AF37]/20 via-[#F3E5AB]/10 to-transparent blur-xl opacity-60 pointer-events-none" />

        {/* 
          RESPONSIVE CINEMATIC VIDEO FRAME:
          - Mobile: Dedicated taller frame (aspect-[4/5] or h-[480px] to h-[540px]), object-[center_35%] to keep hands & sweets centered.
          - Desktop: Wide cinematic ratio (aspect-video or h-[72vh]), object-cover centered.
        */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:h-[75vh] max-h-[760px] overflow-hidden bg-[#06241B]">
          
          <motion.video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster="/assets/MP6.jpeg"
            animate={(!prefersReducedMotion && isInView) ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.96] contrast-[1.05]"
          >
            <source src="/assets/MP7.mp4" type="video/mp4" />
            <img 
              src="/assets/MP6.jpeg" 
              alt="Vindhyawasini Tilkut Bhandar Artisanal Sweets Crafting" 
              className="w-full h-full object-cover object-[center_35%]" 
            />
          </motion.video>

          {/* Subtle Dark/Green Overlay for Cinematic Contrast & Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-[#06241B]/20 to-[#06241B]/40 pointer-events-none" />

          {/* Optional Title Overlay Banner (Minimal & Elegant) */}
          {showTitle && (
            <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pointer-events-none">
              <div className="inline-flex items-center space-x-2 bg-[#06241B]/80 backdrop-blur-md text-[#D4AF37] text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Gaya Sweets Heritage Film</span>
              </div>
            </div>
          )}

          {/* Bottom Left Narrative Text (Desktop & Tablet) */}
          {showTitle && (
            <div className="absolute bottom-6 left-6 right-24 sm:bottom-8 sm:left-8 sm:right-32 z-10 space-y-1 text-[#FAF7F2] pointer-events-none">
              <h3 className="font-serif-luxury text-xl sm:text-3xl font-extrabold text-[#F3E5AB] leading-snug drop-shadow-md">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/85 font-light leading-relaxed max-w-xl drop-shadow-sm">
                {subtitle}
              </p>
            </div>
          )}

          {/* 
            FLOATING MINIMAL SOUND-CONTROL BUTTON (Bottom-Right Corner)
            - 200-300ms transitions
            - Smooth gold glow when unmuted
            - Separate from video click interaction
          */}
          <button
            onClick={toggleSound}
            className={`absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 px-3.5 py-2.5 rounded-full backdrop-blur-md flex items-center space-x-2 border transition-all duration-300 shadow-lg cursor-pointer ${
              !isMuted 
                ? 'bg-[#0B3D2E]/90 text-[#D4AF37] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105' 
                : 'bg-[#06241B]/75 text-[#FAF7F2] border-[#D4AF37]/35 hover:border-[#D4AF37] hover:bg-[#0B3D2E] hover:text-[#D4AF37]'
            }`}
            title={isMuted ? "Enable Original Audio" : "Mute Audio"}
            aria-label={isMuted ? "Enable Original Audio" : "Mute Audio"}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#FAF7F2]" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#FAF7F2]/90">Sound Off</span>
              </>
            )}
          </button>

        </div>

      </motion.div>

    </div>
  );
};

export default LegacyVideoSection;
