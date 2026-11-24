export default function BundleBanner() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bundles" className="my-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-between gap-6 border border-[#1F4A52] bg-[#1A1F22] p-6 text-[#FFFFFF] shadow-[0_20px_60px_rgba(255,14,26,0.08)] sm:p-8 md:flex-row">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 border border-[#1F4A52] bg-[#0D2F36] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFFACD]">
            Better together
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
            Pick your favourites. 12 for ₹199.
          </h3>
          <p className="text-sm text-[#8B8F8E] max-w-xl">
            Add any 12 stickers to your bag and pay <span className="text-white font-semibold">₹199</span> instead of ₹216.
            That is a little over ₹16 each, with free India-wide delivery once your order crosses ₹299.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={scrollToCatalog}
            className="min-h-20 border border-[#1F4A52] bg-[#0D2F36] px-5 py-3 text-center transition-colors hover:border-[#B50B16]"
          >
            <div className="text-xs text-[#8B8F8E] uppercase font-medium">12 stickers</div>
            <div className="text-lg font-bold text-white">₹199</div>
            <div className="text-[11px] text-[#A38C5A]">Save ₹17</div>
          </button>
          <button
            type="button"
            onClick={scrollToCatalog}
            className="min-h-20 border border-[#FF0E1A]/60 bg-[#0D2F36] px-5 py-3 text-center transition-colors hover:border-[#B50B16]"
          >
            <div className="text-xs text-[#8B8F8E] uppercase font-medium">24 stickers (2 packs)</div>
            <div className="text-lg font-bold text-white">₹398</div>
            <div className="text-[11px] text-[#A38C5A]">Save ₹34 + Free delivery</div>
          </button>
        </div>
      </div>
    </section>
  );
}