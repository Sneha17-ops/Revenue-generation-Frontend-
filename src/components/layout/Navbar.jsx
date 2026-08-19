'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Menu, 
  X,
  Phone,
  MessageSquare,
  Clock
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Navbar = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { cart, toggleCartDrawer } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { user, isAuthenticated, openAuthModal } = useAuthStore();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Legacy', href: '/journey' },
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/shop' },
    { name: 'Contact', href: '/store-info' },
  ];

  return (
    <>
      {/* Top Utility Banner: Deep Forest Green with Gold Accents */}
      <div className="bg-[#06241B] border-b border-[#D4AF37]/20 text-[#FAF7F2] px-4 py-2 text-[11px] relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left Side: Clickable Store Location, Store Pickup Available & Operating Hours */}
          <div className="flex items-center space-x-2.5 sm:space-x-4 flex-wrap">
            
            {/* 1. Clickable Store Location (Opens Google Maps) */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Vindhyawasini+Tilkut+Bhandar+Gaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 font-bold text-[#FAF7F2] hover:text-[#D4AF37] transition-all group"
              title="Open Vindhyawasini Tilkut Bhandar in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] group-hover:-translate-y-0.5 transition-transform shrink-0" />
              <span className="uppercase tracking-wider">STORE LOCATION</span>
            </a>

            <span className="text-[#D4AF37]/30">|</span>

            {/* 2. Store Pickup Available Notice */}
            <span className="flex items-center space-x-1.5 font-bold text-[#D4AF37]">
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="uppercase tracking-wider">STORE PICKUP AVAILABLE</span>
            </span>

            <span className="hidden md:inline text-[#D4AF37]/30">|</span>

            {/* 3. Operating Hours */}
            <span className="hidden md:flex items-center space-x-1.5 text-[#FAF7F2]/80 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>HOURS: 7:00 AM – 10:00 PM</span>
            </span>
          </div>

          {/* Right Side: WhatsApp Enquiry & Bulk Orders */}
          <div className="flex items-center space-x-3.5 shrink-0">
            
            {/* WhatsApp Us Link */}
            <a 
              href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            
            <span className="text-[#D4AF37]/30">|</span>

            {/* Bulk Orders Call Link */}
            <a 
              href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
              className="flex items-center space-x-1.5 text-[#F3E5AB] font-semibold hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Bulk Orders</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Luxury Deep Forest Green Navigation Bar with Slide-Down Entrance */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0B3D2E]/95 backdrop-blur-xl shadow-2xl py-3 border-b border-[#D4AF37]/30' 
            : 'bg-[#0B3D2E] border-b border-[#D4AF37]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0 mr-4 xl:mr-8">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#06241B] border border-[#D4AF37]/50 flex items-center justify-center p-1 group-hover:border-[#D4AF37] group-hover:scale-105 transition-all shadow-gold-glow overflow-hidden">
                <img 
                  src="/assets/MP8.jpeg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR" 
                  className="w-full h-full object-contain rounded-xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-sm sm:text-base xl:text-lg font-extrabold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                  VINDHYAWASINI TILKUT BHANDAR
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  Authentic Gaya Sweets • Est. 1995
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Sequential Stagger & Hover Underline */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12 text-xs font-bold tracking-widest uppercase text-white">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="relative py-1"
                  >
                    <Link 
                      href={link.href} 
                      className={`transition-colors duration-300 font-semibold tracking-widest ${
                        isActive 
                          ? 'text-[#D4AF37] font-extrabold' 
                          : 'text-white/90 hover:text-[#D4AF37]'
                      }`}
                    >
                      {link.name}
                    </Link>

                    {/* Animated Golden Underline */}
                    {isActive ? (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#997D20] rounded-full shadow-gold-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Quick Action Buttons & Profile */}
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              
              {/* Search Icon */}
              <button 
                onClick={onOpenSearch}
                className="text-white/90 hover:text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-full transition-all"
                title="Search Sweets"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link 
                href="/shop?category=Wishlist" 
                className="relative text-white/90 hover:text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-full transition-all"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#0B3D2E] text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Bag Primary CTA Button: Gold with Dark Green Text & Glow */}
              <button 
                onClick={toggleCartDrawer}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-gold-glow group hover:shadow-gold-glow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline uppercase tracking-wider">Bag</span>
                {totalCartItems > 0 && (
                  <span className="bg-[#0B3D2E] text-[#D4AF37] px-2 py-0.5 rounded-full text-[10px] font-black">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* User Account / Login */}
              {isAuthenticated ? (
                <Link 
                  href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] bg-[#06241B] border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                >
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span className="hidden md:inline">{user?.name ? user.name.split(' ')[0] : 'Patron'}</span>
                </Link>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="text-xs font-bold text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#D4AF37] px-3.5 py-2 rounded-xl hover:bg-[#D4AF37]/10 transition-all"
                >
                  Log In
                </button>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#06241B] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 text-xs shadow-2xl"
            >
              <nav className="flex flex-col space-y-4 font-bold text-white tracking-widest uppercase">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className={`py-1.5 transition-colors border-b border-white/5 ${
                      pathname === link.href ? 'text-[#D4AF37] font-extrabold' : 'hover:text-[#D4AF37]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user?.role === 'admin' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#D4AF37] font-bold py-1.5">
                    Admin Portal
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
