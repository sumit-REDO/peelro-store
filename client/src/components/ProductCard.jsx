import { useState } from 'react';
import { Star, Check, Plus } from 'lucide-react';

export default function ProductCard({ product, addToCart, cartItem }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const originalPrice = (product.price || 0) + 30;
  const discountAmount = originalPrice - (product.price || 0);

  return (
    <div className="bg-[#ffffff] border border-[#e8e4dc] hover:border-[#dc2626] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg group">
      
      {/* Product Image Area */}
      <div className="relative aspect-square bg-[#fbf9f5] p-4 sm:p-5 flex items-center justify-center overflow-hidden border-b border-[#f2eee6]">
        
        {/* Save Badge */}
        <span className="absolute top-2.5 left-2.5 z-10 bg-[#dc2626] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
          SAVE ₹{discountAmount}
        </span>

        {/* Size Badge */}
        <span className="absolute top-2.5 right-2.5 z-10 bg-[#ffffff]/90 backdrop-blur-xs border border-[#e2dcd0] text-[#78716c] text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
          {product.size || '3" Vinyl'}
        </span>

        {/* Sticker Artwork */}
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* In-cart count badge */}
        {cartItem && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-[#1c1917] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <Check size={11} className="text-emerald-400 stroke-[3]" />
            <span>{cartItem.qty} in bag</span>
          </div>
        )}
      </div>

      {/* Details & Pricing */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#ffffff]">
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="currentColor" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-[#44403c] ml-1">4.9</span>
            <span className="text-[10px] text-[#a8a29e]">(Bengal Studio)</span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-[#1c1917] leading-snug line-clamp-1 group-hover:text-[#dc2626] transition-colors mb-2">
            {product.title}
          </h3>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-base sm:text-lg font-black text-[#1c1917]">
              ₹{product.price}
            </span>
            <span className="text-xs text-[#a8a29e] line-through font-medium">
              ₹{originalPrice}
            </span>
          </div>

          <p className="text-[11px] text-[#dc2626] font-semibold mb-3">
            or <strong className="font-black">₹19.90</strong> in 10-Pack
          </p>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#1c1917] hover:bg-[#dc2626] text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} className="stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus size={14} className="stroke-[3]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}