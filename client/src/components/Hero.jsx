import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-14 pb-16 md:pt-20 md:pb-24 border-b border-[#e8e4dc] bg-[#fbf9f5]">
      <div className="max-w-6xl mx-auto px-4 relative">
        
        {/* Origin Stamp */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#f2eee6] border border-[#d6d0c4] px-3 py-1 rounded text-[11px] font-mono tracking-wider text-[#57534e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e04f34]" />
            <span>BATCH 01 // BARRACKPORE, BENGAL</span>
          </div>
          <span className="text-[11px] font-mono text-[#78716c] hidden sm:inline">
            70μM COLD LAMINATE • 300 DPI ARCHIVAL DYE
          </span>
        </div>

        {/* Editorial Headline */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1c1917] uppercase leading-[0.98] mb-6 font-sans">
            Tactile Decals & <br />
            <span className="text-[#78716c] font-serif italic lowercase font-normal">quietly radical</span> <br />
            <span className="underline decoration-[#e04f34] decoration-2 underline-offset-8">
              Desktop Art.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] max-w-xl font-normal leading-relaxed mb-8">
            High-tack vinyl stickers and A4 prints. Printed on an Epson EcoTank, cold-laminated for waterproof durability, and hand-finished in Barrackpore to survive monsoon moisture, daily train commutes, and keys in your bag.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <a
              href="#catalogue"
              className="bg-[#1c1917] hover:bg-[#292524] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition shadow-sm active:translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore The Drops</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#bundles"
              className="bg-[#ffffff] hover:bg-[#f5f2eb] border border-[#d6d0c4] text-[#1c1917] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition flex items-center gap-2"
            >
              <Flame size={14} className="text-[#e04f34]" />
              <span>Any 10 for ₹199</span>
            </a>
          </div>
        </div>

        {/* Technical Spec Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-[#e8e4dc] text-xs font-mono">
          <div>
            <span className="text-[#78716c] block text-[10px] uppercase">Material Base</span>
            <span className="text-[#1c1917] font-bold">Matte Synthetic Vinyl</span>
          </div>
          <div>
            <span className="text-[#78716c] block text-[10px] uppercase">Shielding</span>
            <span className="text-[#1c1917] font-bold">70μm Pressure PVC</span>
          </div>
          <div>
            <span className="text-[#78716c] block text-[10px] uppercase">Water Resistance</span>
            <span className="text-[#1c1917] font-bold">Dishwasher & Soap Safe</span>
          </div>
          <div>
            <span className="text-[#78716c] block text-[10px] uppercase">Adhesive Residue</span>
            <span className="text-[#e04f34] font-bold">0.0% Clean Peel</span>
          </div>
        </div>

      </div>
    </section>
  );
}