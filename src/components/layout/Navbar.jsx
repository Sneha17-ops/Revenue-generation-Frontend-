'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  // Sequential nav item animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const navLinks = [
    { name: 'Home', href: '/', active: true },
    { name: 'Menu', href: '/shop' },
    { name: 'Our Legacy', href: '/journey' },
    { name: 'Contact', href: '/store-info' },
  ];

  return (
    <>
      {/* Top Banner: City Delivery & Operational Support */}
      <div className="bg-[#06241B] border-b border-[#D4AF37]/20 text-[#FAF7F2] px-4 py-1.5 text-[11px] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 font-bold text-[#D4AF37]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
              <span>Gaya Flagship Store</span>
            </span>
            <span className="hidden md:inline text-[#D4AF37]/30">|</span>
            <span className="hidden md:flex items-center space-x-1 text-[#FAF7F2]/80">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>Hours: {CITY_DELIVERY_RULES.storeTimings}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Order</span>
            </a>
            
            <a 
              href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
              className="flex items-center space-x-1 text-[#F3E5AB] font-semibold hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">Bulk Orders</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Luxury Navigation Bar with Entrance Animation */}
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0B3D2E]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(6,36,27,0.4)] py-2.5 border-b border-[#D4AF37]/30' 
            : 'bg-[#0B3D2E] border-b border-[#D4AF37]/20 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#D4AF37] p-1.5 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center space-x-3.5 group shrink-0 mr-4 xl:mr-8">
              {/* Circular Premium Logo Container */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-transparent flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/logo.svg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors leading-tight">
                  VINDHYAWASINI TILKUT BHANDAR
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  Authentic Gaya Sweets
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Underline Animation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs font-semibold tracking-widest uppercase text-[#FAF7F2]">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Link 
                    href={link.href} 
                    className="relative py-1 group/link text-[#FAF7F2] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{link.name}</span>
                    {/* Hover Gold Underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] transition-all duration-300 group-hover/link:w-full rounded-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Quick Action Icons & Buttons */}
            <div className="flex items-center space-x-2.5 sm:space-x-4 shrink-0">
              
              <button 
                onClick={onOpenSearch}
                className="text-[#FAF7F2]/90 hover:text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-full transition-all"
                title="Search Sweets"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link 
                href="/shop?category=Wishlist" 
                className="relative text-[#FAF7F2]/90 hover:text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-full transition-all"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D4AF37] text-[#0B3D2E] text-[9px] font-black rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Gold Button with Dark Green Text */}
              <button 
                onClick={toggleCartDrawer}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-gold-glow"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bag</span>
                {totalCartItems > 0 && (
                  <span className="bg-[#0B3D2E] text-[#D4AF37] px-1.5 py-0.5 rounded-full text-[10px] font-black">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <Link 
                  href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1.5 text-xs font-bold text-[#D4AF37] bg-[#06241B] border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl hover:border-[#D4AF37] hover:shadow-gold-glow transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{user?.name ? user.name.split(' ')[0] : 'Patron'}</span>
                </Link>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="text-xs font-bold text-[#FAF7F2] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#D4AF37] px-3.5 py-2 rounded-xl hover:bg-[#D4AF37]/10 transition-all"
                >
                  Log In
                </button>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#06241B] border-b border-[#D4AF37]/20 px-6 py-5 space-y-4 text-xs">
            <nav className="flex flex-col space-y-3 font-semibold text-[#FAF7F2] tracking-wider uppercase">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1">Home</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1">Menu</Link>
              <Link href="/journey" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] text-[#D4AF37] font-bold py-1">Our Legacy</Link>
              <Link href="/store-info" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1">Contact</Link>
              {user?.role === 'admin' && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#D4AF37] font-bold py-1">Admin Portal</Link>
              )}
            </nav>
          </div>
        )}
      </motion.header>
    </>
  );
};
