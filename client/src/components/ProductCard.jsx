import { useState } from 'react';
import { INDIVIDUAL_PRICE } from '../lib/pricing';

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
  cartQuantity = 0,
  onUpdateQuantity,
}) {
  const [justAdded, setJustAdded] = useState(false);
  const imageFallback = '/stickers/calendar-wtf.png';
  const imageSource = product.imageUrl || imageFallback;
  const unitPrice = Number(product.price) > 0 ? Number(product.price) : INDIVIDUAL_PRICE;

  const handleAdd = (event) => {
    event.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article className="group flex min-w-0 flex-col justify-between border border-[#1F4A52] bg-[#1A1F22] p-3 transition-colors hover:border-[#B50B16] sm:p-4">
      <button
        type="button"
        onClick={() => onSelectProduct?.(product)}
        className="min-w-0 text-left focus-visible:outline-2 focus-visible:outline-[#FF0E1A]"
        aria-label={`View ${product.title}`}
      >
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px]">
          <span className="truncate font-mono uppercase tracking-wider text-[#8B8F8E]">
            {product.category || 'Vinyl'}
          </span>
          <span className="shrink-0 border border-[#1F4A52] bg-[#0D2F36] px-1.5 py-0.5 font-semibold uppercase text-[#8B8F8E]">
            {product.finish || 'matte'}
          </span>
        </div>

        <div className="mb-3 flex aspect-square w-full items-center justify-center overflow-hidden border border-[#1F4A52] bg-[#0A1518] p-3 transition-colors group-hover:bg-[#0D2F36]">
          <img
            src={imageSource}
            alt={product.title}
            width={300}
            height={300}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = imageFallback;
            }}
          />
        </div>

        <div>
          <h3 className="truncate font-serif text-xs font-bold text-white sm:text-sm">
            {product.title}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#8B8F8E]">
            Scratch-Proof Vinyl
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-white">₹{unitPrice}</span>
            <span className="text-xs text-[#8B8F8E]">single sticker</span>
          </div>
          <p className="mt-0.5 text-[10px] text-[#8B8F8E]">12-Sticker Pack for ₹199</p>
        </div>
      </button>

      {cartQuantity > 0 ? (
        <div className="mt-3 flex min-h-11 items-center justify-between border border-[#1F4A52] bg-[#0A1518]">
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(product._id, -1)}
            className="min-h-11 min-w-11 text-lg text-[#FFFACD] transition-colors hover:bg-[#1A1F22]"
            aria-label={`Decrease ${product.title} quantity`}
          >
            −
          </button>
          <span className="text-xs font-bold text-white" aria-live="polite">
            {cartQuantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(product._id, 1)}
            className="min-h-11 min-w-11 text-lg text-[#FFFACD] transition-colors hover:bg-[#1A1F22]"
            aria-label={`Increase ${product.title} quantity`}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-3 min-h-11 w-full border px-3 py-2 text-xs font-bold transition-colors ${
            justAdded
              ? 'border-[#A38C5A] bg-[#A38C5A] text-white'
              : 'border-[#FF0E1A] bg-[#FF0E1A] text-white hover:border-[#B50B16] hover:bg-[#B50B16]'
          }`}
        >
          {justAdded ? 'Added' : 'Add to bag'}
        </button>
      )}
    </article>
  );
}