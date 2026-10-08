import React from 'react';
import { Tag } from 'lucide-react';

export default function BundleBanner() {
  return (
    <section id="bundles" className="py-14 bg-[#fbf9f5] border-b border-[#e8e4dc]">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="bg-[#f5f2eb] border border-[#d6d0c4] p-7 sm:p-10 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-2">
            <Tag size={13} />
            <span>Smart Bundle Deal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] tracking-tight uppercase mb-3">
            Get Any 10 Stickers for Only ₹199.
          </h2>

          <p className="text-xs sm:text-sm text-[#57534e] max-w-xl leading-relaxed mb-6">
            Don't pay single prices! Just add any 10 stickers you like to your bag—the cart automatically gives you the ₹199 bundle rate (instant ₹291 savings).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-md text-left text-xs">
            <div className="bg-[#ffffff] border border-[#d6d0c4] p-4 rounded-xl shadow-2xs">
              <span className="text-[#78716c] block font-semibold">10-STICKER PACK</span>
              <span className="text-lg font-black text-[#1c1917] block mt-0.5">₹199</span>
              <span className="text-[11px] text-[#78716c] mt-0.5 block">Flat ₹40 Speed Post</span>
            </div>

            <div className="bg-[#ffffff] border border-[#d6d0c4] p-4 rounded-xl shadow-2xs">
              <span className="text-[#dc2626] block font-bold">20-STICKER PACK</span>
              <span className="text-lg font-black text-[#1c1917] block mt-0.5">₹349</span>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">Includes FREE Express Shipping</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}