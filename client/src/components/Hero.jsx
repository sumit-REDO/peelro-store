import { ArrowRight, Check, Star } from 'lucide-react';

const defaultStickers = [
  { title: 'Calendar Says WTF', imageUrl: '/stickers/calendar-wtf.png' },
  { title: 'Every Day Routine', imageUrl: '/stickers/every-day.png' },
  { title: 'Note to Self: Do Not Quit', imageUrl: '/stickers/do-not-quit.png' },
  { title: "Breaking News: I Don't Care", imageUrl: '/stickers/breaking-news.png' },
];

export default function Hero({
  onExploreClick,
  featuredProducts = [],
  onSelectProduct,
}) {
  const scrollToCatalog = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBundles = () => {
    const el = document.getElementById('bundles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stickers = featuredProducts.length ? featuredProducts.slice(0, 4) : defaultStickers;
  const tickerItems = [
    '100% waterproof vinyl',
    'scratch-proof',
    '12 stickers for ₹199',
    '₹18 each',
    'zero sticky residue',
    'free delivery ₹299+',
  ];

  const trustItems = [
    '100% Waterproof',
    'Scratch-Proof',
    'Zero Sticky Residue',
    'Free Delivery ₹299+',
  ];

  return (
    <div className="relative overflow-hidden bg-[#0A1518] text-white">
      <section id="hero" className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background: 'radial-gradient(circle at 35% top, rgba(255,14,26,0.22), transparent 58%)',
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#1F4A52] bg-[#1A1F22] px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[#8B8F8E]">
              <span className="h-2 w-2 rounded-full bg-[#FFFACD]" />
              PEELRO • WATERPROOF VINYL DROP
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl font-serif text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-none">
                Real vinyl stickers for your everyday gear.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-[#8B8F8E] sm:text-base">
                Waterproof, scratch-proof vinyl stickers for laptops, bottles, phones, and helmets. Hand-cut with precision craft scissors and made to peel off clean with zero sticky residue.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex min-h-11 items-center gap-2 bg-[#FF0E1A] px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#B50B16]"
              >
                Shop stickers (₹18 each)
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={scrollToBundles}
                className="inline-flex min-h-11 items-center border border-[#1F4A52] bg-[#1A1F22] px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#FFFACD]"
              >
                12-Sticker pack for <span className="ml-1 font-bold text-[#FFFACD]">₹199</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 border border-[#1F4A52] bg-[#1A1F22] px-2.5 py-2 text-[10px] font-medium uppercase tracking-wider text-[#8B8F8E]"
                >
                  <Check size={14} className="text-[#A38C5A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden border border-[#1F4A52] bg-[#0D2F36] p-6 sm:min-h-[28rem] sm:p-10">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(255,14,26,0.18), rgba(13,47,54,0.5) 55%, transparent 75%)',
              }}
            />

            <div className="relative flex h-72 w-full max-w-[22rem] items-center justify-center sm:h-80">
              {stickers.map((sticker, index) => {
                const positions = ['left-10 top-10', 'right-0 top-0', 'left-8 bottom-4', 'right-2 bottom-8'];
                const rotations = ['-rotate-6', 'rotate-3', 'rotate-6', '-rotate-3'];

                return (
                  <button
                    type="button"
                    key={`${sticker.title || 'sticker'}-${index}`}
                    onClick={() => {
                      if (sticker._id && onSelectProduct) {
                        onSelectProduct(sticker);
                      } else {
                        scrollToCatalog();
                      }
                    }}
                    aria-label={`View ${sticker.title || 'featured sticker'}`}
                    className={`absolute z-10 aspect-square w-28 border-2 border-white bg-white p-2 shadow-xl transition-transform duration-200 hover:z-20 hover:scale-110 focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-[#FF0E1A] sm:w-36 ${positions[index]} ${rotations[index]}`}
                  >
                    <img
                      src={sticker.imageUrl || '/stickers/calendar-wtf.png'}
                      alt={sticker.title || 'PEELRO sticker'}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/stickers/calendar-wtf.png';
                      }}
                    />
                  </button>
                );
              })}

              <div className="absolute left-0 top-0 z-20 border border-[#1F4A52] bg-[#0A1518] px-2.5 py-2 text-[9px] font-semibold uppercase tracking-widest text-white shadow-lg sm:left-2">
                DIE-CUT VINYL
              </div>

              <div className="absolute -right-1 bottom-2 z-20 border border-[#1F4A52] bg-[#1A1F22] px-2.5 py-2 text-[9px] font-semibold uppercase tracking-widest text-[#FFFACD] shadow-lg sm:right-0">
                ZERO RESIDUE
              </div>

              <div className="absolute right-0 top-10 z-20 border border-[#1F4A52] bg-[#FF0E1A] px-2.5 py-2 text-[9px] font-semibold uppercase tracking-widest text-white shadow-lg sm:right-1">
                ₹18 / STICKER
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[#1F4A52] bg-[#FF0E1A] text-white">
        <div className="overflow-hidden whitespace-nowrap py-2.5">
          <div className="animate-ticker items-center gap-6 px-6 text-[10px] font-medium uppercase tracking-widest">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-6">
                <span>{item}</span>
                <Star size={10} className="text-[#FFFACD]" fill="currentColor" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}