import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Will these stickers leave sticky residue on my laptop?',
      a: 'No. We use clean-peel removable adhesive vinyl. When you peel them off to swap designs, they lift away in one piece without leaving gummy glue on aluminum or plastic.',
    },
    {
      q: 'Can I put these on water bottles and wash them?',
      a: 'Yes. Every sticker is sealed under a waterproof protective overcoat. You can hand-wash your bottles with dish soap and cold water—the ink will not bleed or smudge.',
    },
    {
      q: 'How long does delivery take to my city?',
      a: 'Orders are printed, laminated, hand-trimmed, and dispatched within 24–48 hours from Barrackpore, West Bengal. Deliveries within Kolkata and WB take 2–3 days; all-India delivery takes 4–6 days via Speed Post / courier.',
    },
    {
      q: 'How does the sticker pack deal work?',
      a: 'No coupon code needed. Add any 12 stickers to your bag and the website applies the ₹199 pack price automatically.',
    },
    {
      q: 'Can I order custom stickers with my own design or meme?',
      a: 'Yes! We accept custom small-batch print runs. Send your artwork or photo directly on WhatsApp, and we will print, laminate, and hand-cut them for you.',
    },
  ];

  return (
    <section id="faqs" className="mx-auto max-w-3xl px-4 py-20">
      <div className="mb-10 text-left">
        <div className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#FFFACD]">
          <HelpCircle size={13} />
          <span>HELP & CLARITY</span>
        </div>
        <h2 className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl">
          Common Questions.
        </h2>
      </div>

      <div className="space-y-3 font-sans">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.q}
              className={`overflow-hidden border transition-colors ${
                isOpen
                  ? 'border-[#FF0E1A] bg-[#1A1F22]'
                  : 'border-[#1F4A52] bg-[#1A1F22] hover:border-[#B50B16]'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex min-h-16 w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold text-white sm:p-5"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#FFFACD] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-[#1F4A52] px-4 pt-3 pb-4 text-xs leading-relaxed text-[#8B8F8E] sm:px-5 sm:pb-5">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}