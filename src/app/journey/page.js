'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  Star,
  Quote,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';

export default function OurLegacyPage() {
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showTextBanner, setShowTextBanner] = useState(true);

  // Automatically fade out the video text banner after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextBanner(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Gallery items using local high-res assets
  const galleryItems = [
    {
      id: 'gallery-1',
      title: 'Traditional Tilkut Hand-Pounding',
      subtitle: 'Karigars pounding white sesame in wooden mortars',
      url: '/assets/MP6.jpeg',
      category: 'Master Craftsmen'
    },
    {
      id: 'gallery-2',
      title: 'Royal Brand Heritage Emblem',
      subtitle: '35 Years of trusted confectionery excellence',
      url: '/assets/MP8.jpeg',
      category: 'Brand Heritage'
    },
    {
      id: 'gallery-3',
      title: 'Authentic Gaya Gud Tilkut',
      subtitle: 'Crisp sesame slabs prepared with organic jaggery',
      url: '/assets/Mp1.jpeg',
      category: 'Traditional Tilkut'
    },
    {
      id: 'gallery-4',
      title: 'Golden Sweet Hampers & Tokris',
      subtitle: 'Festive packaging for Bihar wedding celebrations',
      url: '/assets/MP2.jpeg',
      category: 'Festive Celebrations'
    },
    {
      id: 'gallery-5',
      title: 'Flaky 64-Layer Silao Khaja',
      subtitle: 'Pure A2 cow ghee sweet perfection',
      url: '/assets/MP3.jpeg',
      category: 'Premium Sweets'
    },
    {
      id: 'gallery-6',
      title: 'Generations of Sweet Memories',
      subtitle: 'Bringing smiles to families since 1995',
      url: '/assets/MP4.jpeg',
      category: 'Happy Families'
    }
  ];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

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

  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0B3D2E] overflow-x-hidden font-sans selection:bg-[#D4AF37] selection:text-[#0B3D2E]">
      
      {/* ========================================================================= */}
      {/* SECTION 1 – HERO VIDEO BANNER                                             */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setShowTextBanner(true)}
          className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] rounded-[20px] overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30 group"
        >
          {/* Autoplay Cinematic Heritage Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/MP6.jpeg"
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
          >
            <source src="/assets/MP7.mp4" type="video/mp4" />
            <img src="/assets/MP6.jpeg" alt="VINDHYAWASINI TILKUT BHANDAR Heritage" className="w-full h-full object-cover" />
          </video>

          {/* Subtle 25% Dark Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/90 via-[#06241B]/20 to-transparent pointer-events-none" />

          {/* Floating Top Badge Overlay */}
          <div className="absolute top-6 left-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-[#0B3D2E]/80 backdrop-blur-md text-[#D4AF37] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-gold-glow text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Legacy Since 1995</span>
            </div>
          </div>

          {/* Bottom Glassmorphism Banner Overlay: Appears for 2.5s and smoothly fades out */}
          <AnimatePresence>
            {showTextBanner && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 z-10 bg-[#06241B]/85 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/35 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto"
              >
                <div className="space-y-1 max-w-2xl text-[#FAF7F2]">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#F3E5AB] block">
                    FAMILY • TRADITION • HERITAGE • TRUST
                  </span>
                  <h1 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-wide text-white drop-shadow-sm">
                    Crafting Authentic Bihari Sweets Since 1995
                  </h1>
                </div>

                {/* Video Play/Pause Control Button */}
                <button
                  onClick={togglePlay}
                  className="self-start md:self-auto px-4 py-2 bg-[#0B3D2E] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0B3D2E] rounded-xl border border-[#D4AF37]/40 transition-all text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shrink-0 shadow-lg"
                  title={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 – LOGO REVEAL & ABOUT SECTION                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Animated Logo Emblem with Floating Animation & Soft Golden Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Radial Golden Background Glow */}
              <div className="absolute inset-0 bg-[#D4AF37]/25 rounded-3xl blur-[70px] pointer-events-none" />

              {/* Floating Uncropped Container Frame */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                className="relative w-72 sm:w-96 p-4 rounded-[28px] bg-gradient-to-tr from-[#06241B] via-[#0B3D2E] to-[#135440] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.45)] flex items-center justify-center group"
              >
                <img 
                  src="/assets/MP8.jpeg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR Royal Heritage Logo" 
                  className="w-full h-auto max-h-80 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: About Narrative, Highlighted Quote, and Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#D4AF37] bg-[#0B3D2E] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">
                OUR LEGACY
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E] leading-tight">
                Serving the Authentic Taste of Gaya for Over 35 Years
              </h2>
            </div>

            <div className="space-y-4 text-[#0B3D2E]/85 text-base leading-relaxed font-normal">
              <p>
                For more than three decades, <strong>VINDHYAWASINI TILKUT BHANDAR</strong> has been more than just a sweet shop—it has been a part of countless family celebrations, festivals, and cherished memories. Every Tilkut is handcrafted using traditional recipes, premium ingredients, and the same dedication that has been passed down through generations.
              </p>
              <p>
                From grandparents bringing their grandchildren to the shop to families celebrating every special occasion with our sweets, our journey is built on trust, authenticity, and timeless traditions.
              </p>
            </div>

            {/* Premium Highlighted Quote Card */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border-l-4 border-[#D4AF37] shadow-luxury space-y-2 my-4 relative overflow-hidden">
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-3 right-3" />
              <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#0B3D2E] italic">
                "Every Bite Carries a Legacy."
              </p>
              <span className="text-xs text-[#997D20] font-semibold tracking-wider uppercase block">
                — Vindhyawasini Family Promise
              </span>
            </div>

            {/* Elegant Hover Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={scrollToGallery}
                className="gold-btn w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-gold-glow group hover:-translate-y-1 transition-all duration-300"
              >
                <span>Learn Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link 
                href="/shop"
                className="forest-btn w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:-translate-y-1 transition-all duration-300"
              >
                <span>Explore Our Sweets</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 – HERITAGE GALLERY ("A JOURNEY THROUGH TIME")                    */}
      {/* ========================================================================= */}
      <section ref={galleryRef} className="py-20 sm:py-28 bg-[#F5EFE6] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#997D20] bg-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">
              A JOURNEY THROUGH TIME
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E]">
              Moments of Craftsmanship & Celebration
            </h2>
            <p className="text-xs sm:text-sm text-[#0B3D2E]/75">
              Explore 35 years of artisanal devotion, karigar handiwork, and traditional sweet-making heritage.
            </p>
          </div>

          {/* Luxury Masonry Grid Layout with Cinematic Spacing */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => setLightboxIndex(idx)}
                className="relative rounded-[24px] overflow-hidden border border-[#D4AF37]/30 shadow-luxury group cursor-pointer break-inside-avoid bg-[#06241B]"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/90 via-[#06241B]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#0B3D2E] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </div>

                  {/* Expand Lightbox Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="p-2 bg-[#0B3D2E]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2] space-y-1">
                    <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FAF7F2]/80 font-light">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 – CUSTOMER RATINGS PLACEHOLDER ("LOVED BY GENERATIONS")          */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#D4AF37] bg-[#0B3D2E] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">
            PATRON TESTIMONIALS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E]">
            Loved by Generations
          </h2>
          <p className="text-sm text-[#0B3D2E]/80 font-medium">
            Thousands of Happy Families. One Trusted Tradition.
          </p>
        </div>

        {/* Google Ratings & Trust Summary Header Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#FFFFFF] p-8 rounded-[24px] border-2 border-[#D4AF37]/40 shadow-luxury max-w-4xl mx-auto text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-1 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#0B3D2E]">
              4.9 / 5.0 Star Rated Sweets Brand
            </h3>
            <p className="text-xs text-[#0B3D2E]/70 font-semibold uppercase tracking-wider">
              Based on 2,500+ Verified Customer & Google Reviews
            </p>
          </div>
        </motion.div>

        {/* Testimonials Placeholder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Review Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FFFFFF] p-6 rounded-[24px] border border-[#D4AF37]/30 shadow-luxury space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#0B3D2E]/85 italic leading-relaxed">
                "The Gaya Gud Tilkut brings back childhood memories of winter mornings with grandfather. Pure A2 ghee flavor!"
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-[#0B3D2E]">Rajesh Sharma</h4>
                <span className="text-[10px] text-[#997D20] font-semibold">Verified Patron • Patna</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </motion.div>

          {/* Review Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#FFFFFF] p-6 rounded-[24px] border border-[#D4AF37]/30 shadow-luxury space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#0B3D2E]/85 italic leading-relaxed">
                "Ordered Silao Khaja for my daughter's wedding hampers. The flaky crispness and royal packaging wowed all our guests!"
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-[#0B3D2E]">Meenakshi Verma</h4>
                <span className="text-[10px] text-[#997D20] font-semibold">Wedding Order Patron • Gaya</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </motion.div>

          {/* Review Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#FFFFFF] p-6 rounded-[24px] border border-[#D4AF37]/30 shadow-luxury space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#0B3D2E]/85 italic leading-relaxed">
                "Sugar-Free Anjeer Barfi and Gud Tilkut are staple winter treats for our entire family. 35 years of uncompromised quality!"
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-[#0B3D2E]">Dr. Amitabh Roy</h4>
                <span className="text-[10px] text-[#997D20] font-semibold">Loyal Patron • Kolkata</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </motion.div>

        </div>

        {/* Trust Badges Bar */}
        <div className="bg-[#0B3D2E] text-[#FAF7F2] p-8 rounded-[24px] border border-[#D4AF37]/40 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <Award className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB]">30+ Years Legacy</h4>
            <p className="text-[11px] text-[#FAF7F2]/75">Established in 1995</p>
          </div>

          <div className="space-y-1">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB]">100% Pure A2 Ghee</h4>
            <p className="text-[11px] text-[#FAF7F2]/75">Zero Artificial Additives</p>
          </div>

          <div className="space-y-1">
            <MapPin className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB]">Gaya & Silao Origin</h4>
            <p className="text-[11px] text-[#FAF7F2]/75">Authentic Regional Karigars</p>
          </div>

          <div className="space-y-1">
            <Users className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB]">Generations of Trust</h4>
            <p className="text-[11px] text-[#FAF7F2]/75">Thousands of Happy Families</p>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryItems[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Top Lightbox Bar */}
            <div className="flex justify-between items-center z-20" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center space-x-3 text-[#D4AF37]">
                <span className="text-xs font-mono uppercase tracking-wider bg-[#0B3D2E] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/30">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
                <span className="text-xs text-[#D4AF37]/80 font-semibold hidden sm:inline-block">
                  VINDHYAWASINI TILKUT BHANDAR • Heritage Archive
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 bg-[#0B3D2E] text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
                  className="p-2.5 bg-[#0B3D2E] text-[#D4AF37] rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Display */}
            <div 
              className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
                  setIsZoomed(false);
                }}
                className="absolute left-4 z-20 p-3 bg-[#0B3D2E]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0B3D2E] transition-all shadow-2xl"
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
                  src={galleryItems[lightboxIndex].url} 
                  alt={galleryItems[lightboxIndex].title} 
                  className="max-h-[78vh] max-w-full object-contain rounded-2xl border border-[#D4AF37]/30 shadow-2xl"
                />
              </div>

              <button 
                onClick={() => {
                  setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
                  setIsZoomed(false);
                }}
                className="absolute right-4 z-20 p-3 bg-[#0B3D2E]/80 text-[#D4AF37] rounded-full border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0B3D2E] transition-all shadow-2xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="z-20 text-center max-w-4xl mx-auto w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-[#0B3D2E]/90 px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 inline-block space-y-0.5">
                <p className="text-sm font-bold text-[#F3E5AB]">
                  {galleryItems[lightboxIndex].title}
                </p>
                <p className="text-xs text-[#FAF7F2]/80">
                  {galleryItems[lightboxIndex].subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
