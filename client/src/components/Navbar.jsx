import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Flame, Menu, X } from 'lucide-react';

export default function Navbar({ totalStickerCount, setIsCartOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP DYNAMIC INCENTIVE BANNER */}
      <div className="bg-[#0b1329] border-b border-blue-900/40 text-xs py-2 px-4 text-center text-slate-300 sticky top-0 z-50">
        {totalStickerCount >= 20 ? (
          <span className="text-[#38bdf8] font-bold tracking-wide flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-[#e11d48]" /> Mega 20-Pack Active + FREE Express Delivery across India!
          </span>
        ) : totalStickerCount >= 10 ? (
          <span className="text-white font-medium flex items-center justify-center gap-1">
            <Flame size={14} className="text-[#e11d48]" /> 10-Pack active! Add <strong className="text-[#e11d48]">{20 - totalStickerCount} more</strong> for the 20-Pack + FREE Delivery!
          </span>
        ) : (
          <span>
            💡 Add <strong className="text-[#e11d48] font-bold">{10 - totalStickerCount} more stickers</strong> to automatically get any 10 for only <strong className="text-white">₹199</strong>!
          </span>
        )}
      </div>

      {/* 2. THE STICKY NAVBAR */}
      <nav className="sticky top-[33px] z-40 bg-[#080c16]/90 backdrop-blur-md border-b border-blue-950/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-widest text-white">
              PEELRO<span className="text-[#e11d48]">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#catalogue" className="hover:text-white transition">Shop Drops</a>
            <a href="#bundles" className="hover:text-white transition">Pack Deals</a>
            <a href="#why-peelro" className="hover:text-white transition">Durability Proof</a>
            <a href="#faqs" className="hover:text-white transition">FAQs</a>
          </div>

          {/* Cart & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#0d162c] hover:bg-[#13203f] border border-blue-800/40 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <ShoppingBag size={16} className="text-[#e11d48]" />
              <span className="text-xs font-bold uppercase tracking-wider">Bag</span>
              {totalStickerCount > 0 && (
                <span className="bg-[#e11d48] text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {totalStickerCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0b1224] border-b border-blue-950 px-6 py-4 space-y-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <a href="#catalogue" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#e11d48]">
              Shop Drops
            </a>
            <a href="#bundles" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#e11d48]">
              Pack Deals
            </a>
            <a href="#why-peelro" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#e11d48]">
              Durability Proof
            </a>
            <a href="#faqs" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#e11d48]">
              FAQs
            </a>
          </div>
        )}
      </nav>
    </>
  );
}