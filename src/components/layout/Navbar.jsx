'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

  return (
    <>
      {/* Top Banner: City Delivery & Operational Support */}
      <div className="bg-gradient-to-r from-royal-greenDark via-royal-green to-royal-greenDark border-b border-royal-gold/15 text-royal-gold px-4 py-1.5 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 font-bold text-amber-300">
              <MapPin className="w-3 h-3 text-royal-gold animate-bounce" />
              <span>City Limits Express Delivery</span>
            </span>
            <span className="hidden md:inline text-royal-gold/30">|</span>
            <span className="hidden md:flex items-center space-x-1 text-royal-goldMuted">
              <Clock className="w-3 h-3" />
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
              className="flex items-center space-x-1 text-royal-goldMuted font-semibold hover:text-royal-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">Bulk Orders</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-royal-greenDark/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-royal-gold/20' 
          : 'bg-royal-green/95 border-b border-royal-gold/10 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-royal-gold p-1.5 hover:bg-royal-gold/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0 mr-4 xl:mr-8">
              <div className="relative w-9 h-9 rounded-full bg-royal-gold/10 border border-royal-gold/30 flex items-center justify-center p-1 group-hover:border-royal-gold transition-all">
                <img src="/logo.svg" alt="Bindhyawasini" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-royal-gold group-hover:text-white transition-colors leading-tight">
                  BINDHYAWASINI
                </span>
                <span className="text-[8px] tracking-[0.2em] text-royal-goldMuted uppercase font-medium">
                  Traditional Sweets
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Minimal & Premium) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 text-xs font-semibold tracking-widest uppercase text-royal-goldMuted">
              <Link href="/" className="hover:text-royal-gold transition-colors py-1">
                Home
              </Link>
              <Link href="/shop" className="hover:text-royal-gold transition-colors py-1">
                Menu
              </Link>
              <Link href="/journey" className="hover:text-royal-gold transition-colors py-1 font-bold text-royal-gold">
                Our Legacy
              </Link>
              <Link href="/store-info" className="hover:text-royal-gold transition-colors py-1">
                Contact
              </Link>
            </nav>

            {/* Quick Action Icons */}
            <div className="flex items-center space-x-2.5 sm:space-x-4 shrink-0">
              
              <button 
                onClick={onOpenSearch}
                className="text-royal-goldMuted hover:text-royal-gold p-2 hover:bg-royal-gold/5 rounded-full transition-all"
                title="Search Sweets"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link 
                href="/shop?category=Wishlist" 
                className="relative text-royal-goldMuted hover:text-royal-gold p-2 hover:bg-royal-gold/5 rounded-full transition-all"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-royal-gold text-royal-green text-[9px] font-black rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button 
                onClick={toggleCartDrawer}
                className="gold-btn px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-gold-glow"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bag</span>
                {totalCartItems > 0 && (
                  <span className="bg-royal-green text-royal-gold px-1.5 py-0.5 rounded-full text-[10px] font-black">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <Link 
                  href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1.5 text-xs font-bold text-royal-gold bg-royal-greenDark border border-royal-gold/30 px-3 py-1.5 rounded-xl hover:border-royal-gold transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{user?.name ? user.name.split(' ')[0] : 'Patron'}</span>
                </Link>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="text-xs font-bold text-royal-gold border border-royal-gold/30 hover:border-royal-gold px-3 py-1.5 rounded-xl hover:bg-royal-gold/10 transition-all"
                >
                  Log In
                </button>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-royal-greenDark border-b border-royal-gold/20 px-6 py-5 space-y-4 text-xs animate-fade-in">
            <nav className="flex flex-col space-y-3 font-semibold text-royal-goldMuted tracking-wider uppercase">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-royal-gold py-1">Home</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-royal-gold py-1">Menu</Link>
              <Link href="/journey" onClick={() => setMobileMenuOpen(false)} className="hover:text-royal-gold text-royal-gold font-bold py-1">Our Legacy</Link>
              <Link href="/store-info" onClick={() => setMobileMenuOpen(false)} className="hover:text-royal-gold py-1">Contact</Link>
              {user?.role === 'admin' && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-royal-gold font-bold py-1">Admin Portal</Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
