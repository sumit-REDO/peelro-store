import React from 'react';
import { ArrowUpRight, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e4dc] bg-[#f5f2eb] text-[#78716c] text-xs">
      
      <div className="max-w-6xl mx-auto px-4 py-10 border-b border-[#e5dfd3] grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Statement */}
        <div className="md:col-span-6">
          <span className="text-2xl font-black tracking-wider text-[#1c1917] block mb-2">
            PEELRO
          </span>

          <p className="text-[#57534e] leading-relaxed text-xs max-w-sm mb-4">
            Waterproof vinyl stickers and desk prints. Handcrafted with care in Barrackpore, West Bengal, and shipped safely in zero-bend packaging.
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#57534e] bg-[#ffffff] border border-[#d6d0c4] px-3 py-1.5 rounded-lg shadow-2xs">
            <MapPin size={12} className="text-[#dc2626]" />
            <span>Barrackpore, Kolkata, West Bengal 700120</span>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="md:col-span-6 flex flex-wrap gap-10 md:justify-end">
          <div className="space-y-2">
            <span className="text-[11px] uppercase font-bold text-[#1c1917] tracking-wider block mb-2">
              Explore
            </span>
            <ul className="space-y-1.5">
              <li><a href="#catalogue" className="hover:text-[#dc2626] transition">All Stickers</a></li>
              <li><a href="#bundles" className="hover:text-[#dc2626] transition">10-Pack Deal (₹199)</a></li>
              <li><a href="#why-peelro" className="hover:text-[#dc2626] transition">Quality Details</a></li>
              <li><a href="#faqs" className="hover:text-[#dc2626] transition">FAQs</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Shield size={13} className="text-emerald-700" />
          <span>Damaged in transit? Free replacement guaranteed.</span>
        </div>

        <p>© 2026 PEELRO. All rights reserved.</p>
      </div>

    </footer>
  );
}