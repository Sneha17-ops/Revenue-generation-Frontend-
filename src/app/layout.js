'use client';

import React, { useState } from 'react';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { AuthModal } from '../components/auth/AuthModal';
import { QuickSearchModal } from '../components/layout/QuickSearchModal';

import CustomCursor from '../components/ui/CustomCursor';

export default function RootLayout({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>VINDHYAWASINI TILKUT BHANDAR | Traditional Bihari Sweets & Luxury Confectionery</title>
        <meta name="description" content="India's most trusted premium sweets brand preserving the traditional culture of Bihar. Handcrafted Gaya Tilkut, Silao Khaja, and pure A2 ghee sweets." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#FAF7F2] text-[#1C2B26] min-h-screen flex flex-col antialiased">
        <CustomCursor />
        <Navbar 
          onOpenSearch={() => setSearchModalOpen(true)}
        />
        
        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <AuthModal />
        <QuickSearchModal 
          isOpen={searchModalOpen} 
          onClose={() => setSearchModalOpen(false)} 
        />
      </body>
    </html>
  );
}
