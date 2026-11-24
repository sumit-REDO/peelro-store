import { useState } from 'react';
import ProductCard from './ProductCard';
import { INDIVIDUAL_PRICE } from '../lib/pricing';

export default function ProductDetail({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onSelectProduct,
  cart,
  onUpdateQuantity,
}) {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const imageFallback = '/stickers/calendar-wtf.png';
  const imageSource = product.imageUrl || imageFallback;
  const unitPrice = Number(product.price) > 0 ? Number(product.price) : INDIVIDUAL_PRICE;

  const recommended = allProducts
    .filter((item) => item._id !== product._id)
    .sort((a, b) => {
      const aMatches = a.category === product.category;
      const bMatches = b.category === product.category;

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    })
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 sm:py-10 sm:pb-10 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B8F8E] transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span>
        <span>Back to all stickers</span>
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col items-center">
          <div className="group relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden border border-[#1F4A52] bg-[#1A1F22] p-7 sm:p-10">
            <span className="absolute left-4 top-4 border border-[#1F4A52] bg-[#0A1518] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#FFFACD]">
              Scratch-Proof Vinyl
            </span>
            <img
              src={imageSource}
              alt={product.title}
              width={400}
              height={400}
              decoding="async"
              className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = imageFallback;
              }}
            />
          </div>

          <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2 text-center">
            <div className="border border-[#1F4A52] bg-[#1A1F22] p-2 text-[11px] font-bold text-white">
              100% Waterproof
            </div>
            <div className="border border-[#1F4A52] bg-[#1A1F22] p-2 text-[11px] font-bold text-white">
              Scratch-Proof
            </div>
            <div className="border border-[#1F4A52] bg-[#1A1F22] p-2 text-[11px] font-bold text-white">
              Zero Sticky Residue
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#FF0E1A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {product.category || 'Vinyl'}
              </span>
              <span className="text-xs font-semibold text-[#A38C5A]">
                {product.inStock === false ? 'Currently unavailable' : 'In stock · Ships in 24h'}
              </span>
            </div>

            <h1 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span className="text-3xl font-extrabold text-white">₹{unitPrice}</span>
              <span className="text-sm text-[#8B8F8E]">single sticker</span>
              <span className="border border-[#FF0E1A]/50 bg-[#0D2F36] px-2 py-0.5 text-xs font-bold text-[#FFFACD]">
                INDIVIDUAL PRICE
              </span>
            </div>

            <div className="space-y-1 border-y border-[#1F4A52] bg-[#1A1F22] p-3.5 text-xs">
              <div className="font-bold text-white">12-Sticker Pack for ₹199</div>
              <p className="text-[#8B8F8E]">
                Add any 12 stickers and the special ₹199 pack price is applied automatically.
              </p>
            </div>

            <p className="pt-2 text-sm leading-relaxed text-[#8B8F8E]">
              {product.description ||
                'Printed on waterproof vinyl with Epson EcoTank inks, hand-cut with precision craft scissors, and made for laptops, bottles, phones, and other smooth surfaces. Peels off clean with zero sticky residue.'}
            </p>

            <div className="border-t border-[#1F4A52] pt-3 text-xs">
              <div className="flex justify-between gap-4 border-b border-[#1F4A52] py-2">
                <span className="text-[#8B8F8E]">Size</span>
                <span className="text-right font-semibold text-white">{product.size || '3-inch'}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F4A52] py-2">
                <span className="text-[#8B8F8E]">Finish</span>
                <span className="text-right font-semibold capitalize text-white">
                  {product.finish || 'matte'}
                </span>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1F4A52] py-2">
                <span className="text-[#8B8F8E]">Made in</span>
                <span className="text-right font-semibold text-white">Barrackpore</span>
              </div>
            </div>
          </div>

          <div className="hidden border-t border-[#1F4A52] pt-4 sm:block">
            <BuyControls
              quantity={quantity}
              setQuantity={setQuantity}
              handleAdd={handleAdd}
              addedNotice={addedNotice}
              price={unitPrice}
            />
          </div>
        </div>
      </div>

      <section className="mt-12 sm:mt-20">
        <div className="mb-6">
          <div className="mb-1 font-mono text-xs uppercase tracking-widest text-[#8B8F8E]">
            Build your pack
          </div>
          <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
            Stickers You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {recommended.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              cartQuantity={
                cart.find((cartItem) => cartItem._id === item._id)?.quantity || 0
              }
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1F4A52] bg-[#0A1518]/95 p-3 shadow-[0_-12px_40px_rgba(255,14,26,0.12)] backdrop-blur sm:hidden">
        <BuyControls
          quantity={quantity}
          setQuantity={setQuantity}
          handleAdd={handleAdd}
          addedNotice={addedNotice}
          price={unitPrice}
        />
      </div>
    </div>
  );
}

function BuyControls({ quantity, setQuantity, handleAdd, addedNotice, price }) {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-2">
      <div className="flex items-center overflow-hidden border border-[#1F4A52] bg-[#0A1518]">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          className="min-h-12 min-w-11 text-lg text-[#8B8F8E] hover:bg-[#1A1F22]"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="px-3 text-sm font-bold text-white">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((current) => current + 1)}
          className="min-h-12 min-w-11 text-lg text-[#8B8F8E] hover:bg-[#1A1F22]"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`min-h-12 flex-1 px-3 text-sm font-bold text-white transition-colors ${
          addedNotice ? 'bg-[#A38C5A]' : 'bg-[#FF0E1A] hover:bg-[#B50B16]'
        }`}
      >
        {addedNotice ? 'Added to bag' : `Add to bag · ₹${price * quantity}`}
      </button>
    </div>
  );
}