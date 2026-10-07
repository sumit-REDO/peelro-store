import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-800">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f222e15_1px,transparent_1px),linear-gradient(to_bottom,#1f222e15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">
        
        {/* Studio Origin Pill */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700/80 px-3 py-1 rounded text-[11px] font-mono tracking-wider text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-ping" />
            <span>STUDIO RUN 01 // BARRACKPORE, WB</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            70μM COLD LAMINATE • 300 DPI
          </span>
        </div>

        {/* Brutalist Editorial Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-100 uppercase leading-[0.95] mb-6">
            Laptops are boring. <br />
            <span className="text-neutral-300">We make heavy vinyl</span> <br />
            <span className="underline decoration-[#ff4d00] decoration-wavy decoration-2 underline-offset-8">
              to fix that.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-normal leading-relaxed mb-8">
            Waterproof die-cuts and desk prints. Small-batch produced on an Epson EcoTank, cold-laminated by hand, and cut to survive keys, monsoon humidity, and daily commute friction.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#catalogue"
              className="bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded transition shadow-sm active:translate-y-0.5 flex items-center gap-2"
            >
              <span>Browse The Drops</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#bundles"
              className="bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-xs font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded transition flex items-center gap-2"
            >
              <Flame size={14} className="text-[#ff4d00]" />
              <span>Any 10 for ₹199</span>
            </a>
          </div>
        </div>

        {/* Technical Spec Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neutral-800/80 text-xs font-mono">
          <div>
            <span className="text-neutral-400 block text-[10px]">MATERIAL BASE</span>
            <span className="text-neutral-200 font-semibold">Tearproof White Vinyl</span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px]">SHIELD</span>
            <span className="text-neutral-200 font-semibold">70μm Pressure Laminate</span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px]">SURFACE TEST</span>
            <span className="text-neutral-200 font-semibold">Dishwasher & Scrub Safe</span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px]">PEEL RESIDUE</span>
            <span className="text-[#ff4d00] font-semibold">0.0% Sticky Glue</span>
          </div>
        </div>

      </div>
    </section>
  );
}