import { CheckCircle, MapPin, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '7439112798';

const quickLinks = [
  { href: '#catalog', label: 'All Stickers' },
  { href: '#bundles', label: '12 for ₹199' },
  { href: '#surfaces', label: 'Where to Stick' },
  { href: '#our-story', label: 'Our Story' },
  { href: '#faqs', label: 'FAQ' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1F4A52] bg-[#0A1518] text-[#8B8F8E]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8">
        <div>
          <a href="#" className="font-serif text-2xl font-black tracking-tight text-white">
            PEELRO
          </a>
          <p className="mt-3 max-w-sm text-sm leading-6">
            Handcrafted waterproof vinyl stickers from a small studio in Barrackpore, Kolkata.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 border border-[#1F4A52] bg-[#1A1F22] px-3 py-2 text-xs text-[#8B8F8E]">
            <MapPin size={14} className="text-[#FFFACD]" />
            Barrackpore, West Bengal 700120
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Explore</h2>
          <nav className="mt-4 flex flex-col items-start gap-3 text-sm">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-[#FFFACD]">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Need help?</h2>
          <p className="mt-4 text-sm leading-6">
            Have a question about an order or want to say hi? WhatsApp us directly.
          </p>
          <a
            href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi PEELRO, I have a question about your stickers.')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 bg-[#FF0E1A] px-4 text-xs font-bold text-white transition hover:bg-[#B50B16]"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-[#1F4A52]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-[#A38C5A]" />
            Damaged in transit? We will replace it.
          </div>
          <p>© 2026 PEELRO. Made in Barrackpore.</p>
        </div>
      </div>
    </footer>
  );
}