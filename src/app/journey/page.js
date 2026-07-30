'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Play,
  Pause,
  Heart,
  ShieldCheck,
  Award,
  Sliders
} from 'lucide-react';
import { useJourneyGalleryStore } from '../../store/useJourneyGalleryStore';

export default function OurLegacyPage() {
  const { photos } = useJourneyGalleryStore();
  const activePhotos = photos.filter((p) => p.enabled);
  const coverPhoto = photos.find((p) => p.isCover) || activePhotos[0] || photos[0];

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Before & After Interactive Slider State (0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);

  // Toggle Video Playback
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % activePhotos.length);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activePhotos.length]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C2B26] overflow-x-hidden selection:bg-[#B8860B] selection:text-white font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* 1. FULL-SCREEN HERO CINEMATIC VIDEO SECTION           */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B2519]">
        
        {/* Video / Ambient Cinematic Canvas */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/Mp1.jpeg"
            className="w-full h-full object-cover opacity-40 filter brightness-90 saturate-110 scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-preparing-dough-for-baking-41138-large.mp4" type="video/mp4" />
            <img src="/assets/Mp1.jpeg" alt="Cinematic Legacy" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2519] via-[#0B2519]/50 to-[#0B2519]/80" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#D4AF37]/15 rounded-full blur-[220px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-5 py-2 rounded-full border border-[#D4AF37]/30 backdrop-blur-md shadow-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>OUR LEGACY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#FDFBF7] tracking-tight"
          >
            Our Journey Through the Years
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-[#D4AF37] text-xl sm:text-3xl font-serif-luxury italic max-w-2xl mx-auto tracking-wide font-light"
          >
            Every picture tells a story.
          </motion.p>
        </div>

        {/* Video Play/Pause Control Button */}
        <div className="absolute bottom-8 right-8 z-20">
          <button
            onClick={togglePlay}
            className="p-3 bg-[#0B2519]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#0B2519] backdrop-blur-md transition-all shadow-xl"
            title={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. ELEGANT MISSION SECTION (ANIMATED FAMILY QUOTE)   */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8 bg-[#FAF7F2]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="space-y-6 bg-[#F5F0E6] p-12 sm:p-16 rounded-3xl border border-[#D4AF37]/25 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#B8860B] bg-[#B8860B]/10 px-4 py-1.5 rounded-full border border-[#B8860B]/20">
            OUR MISSION
          </span>

          <blockquote className="font-serif-luxury text-2xl sm:text-4xl text-[#1C2B26] leading-relaxed font-medium italic">
            "Our mission is to bring families together around authentic recipes, crafted with pure devotion and timeless warmth."
          </blockquote>

          <div className="pt-2 flex justify-center items-center space-x-3 text-xs font-semibold text-[#8B6508] uppercase tracking-widest">
            <Heart className="w-4 h-4 text-[#B8860B] fill-current" />
            <span>Preserving Family Sweets Heritage</span>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. ANIMATED PHOTO WALL JOURNEY SECTION                */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 sm:py-32 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-36">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold bg-[#B8860B]/10 px-4 py-1.5 rounded-full border border-[#B8860B]/20">
            PHOTO WALL JOURNEY
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1C2B26]">
            Moments in Time
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D55] max-w-lg mx-auto">
            Smooth vertical parallax reveal showcasing our authentic confectionery journey.
          </p>
        </div>

        <div className="space-y-36">
          {activePhotos.map((photo, index) => (
            <AnimatedPhotoWallCard
              key={photo.id}
              photo={photo}
              index={index}
              onOpenLightbox={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. INTERACTIVE BEFORE & AFTER COMPARISON SLIDER      */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 bg-[#F3EDE2] border-y border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold bg-[#B8860B]/10 px-4 py-1.5 rounded-full border border-[#B8860B]/20">
              TRADITION IN ACTION
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1C2B26]">
              Before & After Transformation
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D55] max-w-md mx-auto">
              Drag the slider to compare raw ingredients in copper mortars with our finished sweet creations.
            </p>
          </div>

          {/* Slider Canvas Container */}
          <div 
            className="relative w-full h-[55vh] sm:h-[65vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30 select-none cursor-ew-resize"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              setSliderPosition((x / rect.width) * 100);
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
              setSliderPosition((x / rect.width) * 100);
            }}
          >
            {/* After Image (Full background) */}
            <img 
              src="/assets/MP2.jpeg" 
              alt="Handcrafted Sweet Artwork" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-6 right-8 bg-[#0B2519]/80 backdrop-blur-md text-[#D4AF37] px-4 py-2 rounded-xl text-xs font-mono font-bold border border-[#D4AF37]/30">
              AFTER: Golden Bihari Sweet Artwork
            </span>

            {/* Before Image (Clipped overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="/assets/Mp1.jpeg" 
                alt="Raw Mortar Preparation" 
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <span className="absolute bottom-6 left-8 bg-[#0B2519]/80 backdrop-blur-md text-[#D4AF37] px-4 py-2 rounded-xl text-xs font-mono font-bold border border-[#D4AF37]/30">
                BEFORE: Pure Sesame & Brass Vessel Mortars
              </span>
            </div>

            {/* Slider Divider Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-gold-glow cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#0B2519] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-2xl">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. FAMILY GALLERY SECTION                            */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold bg-[#B8860B]/10 px-4 py-1.5 rounded-full border border-[#B8860B]/20">
            HERITAGE & BELONGING
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1C2B26]">
            The Family Gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D55] max-w-md mx-auto">
            Celebrating traditional celebrations, family smiles, and genuine sweet moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePhotos.slice(0, 3).map((p, idx) => (
            <motion.div 
              key={`family-${p.id}`}
              whileHover={{ y: -8 }}
              onClick={() => setLightboxIndex(idx)}
              className="bg-[#F5F0E6] rounded-3xl border border-[#D4AF37]/30 p-4 space-y-4 shadow-lg cursor-pointer group"
            >
              <div className="h-72 rounded-2xl overflow-hidden relative">
                <img 
                  src={p.url} 
                  alt={p.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="px-2 pb-2">
                <p className="text-xs font-mono text-[#8B6508] uppercase tracking-wider">{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. PREMIUM MASONRY GALLERY WITH BLUR REVEAL           */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 bg-[#F3EDE2] border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B8860B] font-bold bg-[#B8860B]/10 px-4 py-1.5 rounded-full border border-[#B8860B]/20">
              EDITORIAL ARCHIVES
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1C2B26]">
              Premium Masonry Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D55] max-w-md mx-auto">
              Click any image to view in high resolution fullscreen lightbox.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {activePhotos.map((photo, idx) => (
              <motion.div
                key={`masonry-${photo.id}`}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(idx)}
                className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-lg cursor-pointer group break-inside-avoid bg-[#0B2519]"
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2519]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">{photo.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. ELEGANT VISION SECTION                            */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8 bg-[#FAF7F2]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="space-y-6 bg-[#0B2519] p-12 sm:p-16 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />

          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
            OUR VISION
          </span>

          <blockquote className="font-serif-luxury text-2xl sm:text-4xl text-[#FDFBF7] leading-relaxed font-light italic">
            "Our vision is to preserve the authentic taste of Bihar's heritage for generations to come, serving every family with uncompromised craftsmanship."
          </blockquote>

          <div className="pt-2 flex justify-center items-center space-x-3 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Quality • Tradition • Devotion</span>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* INTERACTIVE LIGHTBOX MODAL (FULLSCREEN & ZOOM)        */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {lightboxIndex !== null && activePhotos[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center z-20" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center space-x-3 text-[#D4AF37]">
                <span className="text-xs font-mono uppercase tracking-wider bg-[#0B2519] px-3 py-1.5 rounded-xl border border-[#D4AF37]/30">
                  {lightboxIndex + 1} / {activePhotos.length}
                </span>
                <span className="text-xs text-[#D4AF37]/70 hidden sm:inline-block">
                  Protected Image Asset
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 bg-[#0B2519] text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
                  className="p-2.5 bg-[#0B2519] text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Fullscreen Image Area */}
            <div 
              className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setLightboxIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
                  setIsZoomed(false);
                }}
                className="absolute left-4 z-20 p-3 bg-[#0B2519]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0B2519] transition-all shadow-2xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div 
                className={`relative max-w-6xl max-h-[78vh] transition-transform duration-500 cursor-pointer ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img 
                  src={activePhotos[lightboxIndex].url} 
                  alt={activePhotos[lightboxIndex].caption} 
                  className="max-h-[78vh] max-w-full object-contain rounded-2xl border border-[#D4AF37]/30 shadow-2xl pointer-events-auto"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              <button 
                onClick={() => {
                  setLightboxIndex((prev) => (prev + 1) % activePhotos.length);
                  setIsZoomed(false);
                }}
                className="absolute right-4 z-20 p-3 bg-[#0B2519]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0B2519] transition-all shadow-2xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="z-20 text-center max-w-4xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-mono uppercase tracking-widest bg-[#0B2519]/90 px-4 py-2 rounded-xl border border-[#D4AF37]/20 inline-block">
                {activePhotos[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ---------------------------------------------------- //
// ANIMATED PHOTO WALL CARD COMPONENT                   //
// ---------------------------------------------------- //
function AnimatedPhotoWallCard({ photo, index, onOpenLightbox }) {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      <motion.div 
        style={{ y: parallaxY }}
        onClick={onOpenLightbox}
        className="relative w-full h-[60vh] sm:h-[72vh] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl cursor-pointer group bg-[#0B2519]"
      >
        <img 
          src={photo.url} 
          alt={photo.caption} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-[#0B2519] text-[#D4AF37] border border-[#D4AF37]/40 px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-gold-glow">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </span>
        </div>

        <div className="absolute top-6 left-6">
          <span className="text-[11px] font-mono font-bold text-[#D4AF37] bg-[#0B2519]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/30 shadow">
            PHOTO 0{index + 1}
          </span>
        </div>
      </motion.div>

      <div className="flex justify-between items-center px-4">
        <p className="text-xs sm:text-sm font-mono text-[#8B6508] uppercase tracking-widest">
          {photo.caption}
        </p>
        <span className="text-[10px] text-[#4A5D55] uppercase tracking-widest font-mono">
          Bindhyawasini Archives
        </span>
      </div>
    </motion.div>
  );
}
