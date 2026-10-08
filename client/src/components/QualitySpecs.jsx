import React from 'react';
import { Droplets, ShieldCheck, Check, Layers } from 'lucide-react';

export default function QualitySpecs() {
  const specs = [
    {
      icon: <Droplets className="text-[#0284c7]" size={20} />,
      title: "100% Waterproof Barrier",
      desc: "Water will never wash your sticker away. Every design is sealed with a protective transparent shield so you can wash your water bottles with dish soap without ink bleeding."
    },
    {
      icon: <ShieldCheck className="text-[#dc2626]" size={20} />,
      title: "Key & Scratch-Resistant",
      desc: "Laptops get crammed into backpacks next to chargers, pens, and metal items. Our matte lamination absorbs friction so your sticker artwork never scratches off."
    },
    {
      icon: <Check className="text-emerald-700" size={20} />,
      title: "Leaves No Sticky Glue",
      desc: "When you want to remove or swap stickers, they peel away cleanly. Zero gummy white residue or paper stains left on your expensive laptop or phone."
    },
    {
      icon: <Layers className="text-[#7c3aed]" size={20} />,
      title: "Thick Vinyl, Not Paper",
      desc: "Ordinary paper stickers tear easily. PEELRO stickers are printed on durable synthetic vinyl film that bends smoothly around water bottles without tearing."
    }
  ];

  return (
    <section id="why-peelro" className="py-16 bg-[#f5f2eb] border-b border-[#e8e4dc]">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-5 border-b border-[#e2dcd0]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] block mb-1">
              Why Choose PEELRO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] tracking-tight uppercase">
              Stickers Made to Last.
            </h2>
          </div>
          <p className="text-xs text-[#57534e] max-w-md">
            Most stickers online are made of thin paper that fades in a week. We make heavy-duty vinyl stickers that look brand new for years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] border border-[#e5dfd3] p-5 rounded-xl flex flex-col justify-between hover:border-[#a8a29e] transition shadow-2xs"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#fbf9f5] border border-[#e5dfd3] flex items-center justify-center mb-3.5">
                  {item.icon}
                </div>

                <h3 className="text-sm font-bold text-[#1c1917] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#57534e] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}