import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ totalStickerCount, setIsCartOpen, searchQuery, setSearchQuery }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#f0ebe1] border-b border-[#e2dcd0] text-[11px] py-2 px-4 text-center text-[#44403c] sticky top-0 z-50 font-medium">
        <span className="flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-[#dc2626]" />
          <span><strong>Free Delivery</strong> across India on orders above ₹299 • Dispatched within 24–48 Hours</span>
        </span>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="sticky top-[33px] z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e8e4dc]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Clean Brand Logo */}
          <a href="#" className="text-2xl font-black tracking-wider text-[#1c1917] shrink-0">
            PEELRO
          </a>

          {/* Real-time Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-xs relative">
            <Search size={15} className="absolute left-3 text-[#78716c]" />
            <input
              type="text"
              placeholder="Search stickers, anime, memes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#d6d0c4] focus:border-[#dc2626] text-[#1c1917] text-xs rounded-full pl-9 pr-4 py-2 outline-none transition shadow-2xs placeholder:text-[#a8a29e]"
            />
          </div>

          {/* Standard Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#78716c]">
            <a href="#catalogue" className="hover:text-[#dc2626] transition">All Stickers</a>
            <a href="#bundles" className="hover:text-[#dc2626] transition">Sticker Packs</a>
            <a href="#why-peelro" className="hover:text-[#dc2626] transition">Quality</a>
            <a href="#faqs" className="hover:text-[#dc2626] transition">FAQs</a>
          </div>

          {/* Right Action: Cart & Mobile Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#ffffff] hover:bg-[#f5f2eb] border border-[#d6d0c4] text-[#1c1917] px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-2xs cursor-pointer"
            >
              <ShoppingBag size={16} className="text-[#dc2626]" />
              <span className="text-xs font-bold uppercase tracking-wider">Cart</span>
              {totalStickerCount > 0 && (
                <span className="bg-[#dc2626] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {totalStickerCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#78716c] hover:text-[#1c1917]"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#f5f2eb] border-b border-[#e8e4dc] px-4 py-4 space-y-3">
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3 top-2.5 text-[#78716c]" />
              <input
                type="text"
                placeholder="Search stickers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#d6d0c4] text-xs rounded-lg pl-9 pr-3 py-2 outline-none"
              />
            </div>
            <a href="#catalogue" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold uppercase py-1 text-[#57534e] hover:text-[#dc2626]">
              All Stickers
            </a>
            <a href="#bundles" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold uppercase py-1 text-[#57534e] hover:text-[#dc2626]">
              Sticker Packs
            </a>
            <a href="#why-peelro" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold uppercase py-1 text-[#57534e] hover:text-[#dc2626]">
              Quality
            </a>
            <a href="#faqs" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold uppercase py-1 text-[#57534e] hover:text-[#dc2626]">
              FAQs
            </a>
          </div>
        )}
      </nav>
    </>
  );
}