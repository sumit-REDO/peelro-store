import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Will these stickers leave sticky residue on my laptop?",
      a: "No. We use automotive-grade release adhesive vinyl. When you peel them off to swap designs, they lift away cleanly without leaving gummy residue on aluminum or plastic."
    },
    {
      q: "Are these stickers truly waterproof?",
      a: "Yes. Every sticker is sealed under a 70μm cold-lamination PVC shield. You can wash your water bottles with dish soap and cold water—the ink will not bleed, smudge, or fade."
    },
    {
      q: "How long does delivery take to my city?",
      a: "Orders are printed, laminated, hand-cut, and dispatched within 24–48 hours from Barrackpore, West Bengal. Deliveries within Kolkata & WB take 2–3 days; all-India delivery takes 4–6 days via Speed Post / courier."
    },
    {
      q: "How does the 10-pack discount work?",
      a: "No coupon codes needed! Just add any 10 stickers you like to your cart. The website calculates the discount automatically and sets your subtotal to ₹199."
    },
    {
      q: "Can I order custom stickers with my own design/photo?",
      a: "Yes! We accept custom print jobs. You can send your artwork or memes directly on WhatsApp, and we will produce small-batch vinyl cuts for you."
    }
  ];

  return (
    <section id="faqs" className="py-20 max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#e04f34] mb-2">
          <HelpCircle size={12} />
          <span>HELP & CLARITY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] uppercase tracking-tight font-sans">
          Common Questions.
        </h2>
      </div>

      <div className="space-y-3 font-sans">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="bg-[#ffffff] border border-[#e5dfd3] hover:border-[#a8a29e] rounded-xl overflow-hidden cursor-pointer transition shadow-xs"
          >
            <div className="p-4 sm:p-5 flex justify-between items-center text-sm font-bold text-[#1c1917]">
              <span>{faq.q}</span>
              <ChevronDown
                size={16}
                className={`text-[#e04f34] transition-transform duration-200 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </div>
            {openIndex === idx && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#57534e] leading-relaxed border-t border-[#f2eee6] pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}