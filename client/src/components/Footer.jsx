import React from 'react';
import { ArrowUpRight, MapPin, Printer, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#06070a] text-neutral-400 font-mono text-xs">
      
      {/* Upper Studio Identity Strip */}
      <div className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Statement */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-xl font-sans font-black tracking-widest text-white">
              PEELRO<span className="text-[#ff4d00]">.</span>
            </span>
            <span className="text-[10px] text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
              v1.0
            </span>
          </div>

          <p className="text-neutral-400 leading-relaxed text-xs max-w-sm mb-4">
            Independent adhesive graphics and desk prints. Small-batch produced on an Epson EcoTank, cold-laminated by hand, and shipped plastic-free in reinforced rigid mailers.
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded">
            <MapPin size={12} className="text-[#ff4d00]" />
            <span>Barrackpore, Kolkata, WB 700120</span>
          </div>
        </div>

        {/* Technical Print Spec Colophon */}
        <div className="md:col-span-4 space-y-2.5">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest block mb-3">
            Production Specs
          </span>
          <div className="flex items-center gap-2 text-neutral-300">
            <Printer size={13} className="text-[#ff4d00]" />
            <span>Epson Micro Piezo (Dye Inks)</span>
          </div>
          <div className="text-neutral-400">
            <span>Substrate: </span>
            <span className="text-neutral-300">High-Tack Matte Vinyl (A4)</span>
          </div>
          <div className="text-neutral-400">
            <span>Overlay: </span>
            <span className="text-neutral-300">70μm Pressure-Sensitive PVC</span>
          </div>
          <div className="text-neutral-400">
            <span>Finishing: </span>
            <span className="text-neutral-300">Manual Precision Die-Cut</span>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="md:col-span-3 space-y-2">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest block mb-3">
            Index
          </span>
          <ul className="space-y-1.5">
            <li>
              <a href="#catalogue" className="hover:text-white transition flex items-center justify-between">
                <span>All Drops</span>
                <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a href="#bundles" className="hover:text-white transition flex items-center justify-between">
                <span>10-Pack (₹199)</span>
                <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a href="#why-peelro" className="hover:text-white transition flex items-center justify-between">
                <span>Durability Tests</span>
                <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-white transition flex items-center justify-between">
                <span>Delivery & Care</span>
                <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Dispatch & Logistics Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <Shield size={13} className="text-emerald-400" />
          <span>Damaged in transit? Free replacement with zero questions asked.</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <span>Dispatch: Mon • Wed • Fri</span>
          <span>•</span>
          <span>Speed Post & Surface Courier</span>
        </div>
      </div>

    </footer>
  );
}