import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Trash2, ArrowRight, X, Tag, ShieldCheck, Droplets, Scissors, ChevronDown, CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Fetch products from Node backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const totalStickerCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const rawItemTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  let subtotal = rawItemTotal;
  let bundleDiscount = 0;
  let bundleName = '';

  if (totalStickerCount >= 20) {
    subtotal = 349 + (totalStickerCount - 20) * 17.5;
    bundleDiscount = rawItemTotal - subtotal;
    bundleName = 'Mega 20-Pack Activated!';
  } else if (totalStickerCount >= 10) {
    subtotal = 199 + (totalStickerCount - 10) * 19.9;
    bundleDiscount = rawItemTotal - subtotal;
    bundleName = '10-Pack Deal Unlocked (₹199)!';
  }

  const isFreeShipping = totalStickerCount >= 20 || subtotal >= 299;
  const shippingFee = totalStickerCount === 0 ? 0 : isFreeShipping ? 0 : 40;
  const total = subtotal + shippingFee;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 font-sans selection:bg-[#e11d48] selection:text-white">
      
      {/* OUR MODULAR NAVBAR COMPONENT */}
      <Navbar 
        totalStickerCount={totalStickerCount} 
        setIsCartOpen={setIsCartOpen} 
      />

      {/* HERO SECTION */}
      <Hero />

      {/* QUALITY PROOF */}
      <section id="why-peelro" className="py-16 bg-[#060912] border-b border-blue-950/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#e11d48]">Anatomy of Quality</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Why Normal Stickers Ruin Your Stuff</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1224] border border-blue-950 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-blue-950/60 rounded-xl flex items-center justify-center text-[#38bdf8] mb-4">
                <Droplets size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">100% Cold-Laminated Shield</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cheap sticker paper turns into soggy mush when washed. PEELRO applies a crystal-clear 70μm protective film that locks ink in and keeps water, oil, and sweat completely out.
              </p>
            </div>

            <div className="bg-[#0b1224] border border-blue-950 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-blue-950/60 rounded-xl flex items-center justify-center text-[#e11d48] mb-4">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Coin & Key Scratch-Tested</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Laptop stickers live in cramped backpacks with chargers and keys. Our pressure-sensitive matte lamination absorbs abrasive friction with zero colour loss.
              </p>
            </div>

            <div className="bg-[#0b1224] border border-blue-950 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-blue-950/60 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
                <Scissors size={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Clean Peel, No Sticky Gunk</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nothing is worse than peeling an old sticker only to leave dirty adhesive residue on your expensive MacBook or phone. Our high-tack vinyl peels off cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#e11d48]">Available Drops</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Explore Curated Stickers</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'anime', 'tech', 'college', 'poster'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-md shadow-rose-950/40'
                    : 'bg-[#0d162c]/80 border-blue-900/40 text-slate-400 hover:border-blue-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            Fetching fresh stickers from MongoDB Atlas...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#0b1224] border border-blue-950 hover:border-blue-700/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-blue-950/30"
              >
                <div className="h-60 bg-[#060a14] relative overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-[#080c16]/90 backdrop-blur-md border border-blue-900/60 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                      {product.finish || 'Matte'}
                    </span>
                    <span className="bg-[#080c16]/90 backdrop-blur-md border border-blue-900/40 text-slate-400 text-[10px] uppercase px-2 py-1 rounded-md">
                      {product.size || '3-inch'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-300 transition">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {product.description || 'Waterproof, scratchproof premium vinyl sticker.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-950">
                    <div>
                      <span className="text-[11px] text-slate-500 block uppercase">Single Price</span>
                      <span className="text-xl font-extrabold text-white">₹{product.price}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#e11d48] hover:bg-[#f43f5e] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-rose-950/50 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BUNDLE PROMO BANNER */}
      <section id="bundles" className="py-12 bg-[#060912] border-y border-blue-950/60">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#0b1224] via-[#0f1a36] to-[#0b1224] border border-blue-800/40 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#e11d48]">Automatic Bundle Math</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">Pick Any 10 Stickers for ₹199</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Don't pay ₹49 per sticker. As soon as you add any 10 stickers to your bag, our cart automatically applies the ₹199 bundle rate (Save ₹291 instantly).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              <div className="bg-[#080c16]/80 border border-blue-900/40 p-4 rounded-xl">
                <span className="text-xs text-slate-400 font-semibold block">10-PACK DEAL</span>
                <span className="text-xl font-black text-white block mt-1">₹199</span>
                <span className="text-[11px] text-slate-500">Flat ₹40 delivery across India</span>
              </div>

              <div className="bg-[#080c16]/80 border border-blue-900/40 p-4 rounded-xl">
                <span className="text-xs text-[#38bdf8] font-semibold block">MEGA 20-PACK</span>
                <span className="text-xl font-black text-white block mt-1">₹349</span>
                <span className="text-[11px] text-emerald-400 font-bold">Includes FREE Express Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faqs" className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#e11d48]">Got Doubts?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Will this leave sticky glue or ruin my laptop?",
              a: "Zero sticky glue. We use automotive-grade release adhesive vinyl. When you want to remove or swap designs, it peels off cleanly without leaving gummy residue."
            },
            {
              q: "Can I put these on water bottles and wash them?",
              a: "Yes. Every sticker is protected with a waterproof cold-laminate barrier. You can wash your bottles with dish soap and cold water—the ink will not bleed or fade."
            },
            {
              q: "How long does shipping take?",
              a: "Orders are printed, laminated, hand-finished, and dispatched within 24–48 hours from Barrackpore. Delivery takes 2–3 days within West Bengal and 4–6 days nationwide via Speed Post / Courier."
            },
            {
              q: "How does the 10-pack discount work?",
              a: "You don't need any promo codes! Simply browse the store and click 'Add to Bag' on any 10 stickers you like. The cart automatically reduces the subtotal to ₹199."
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#0b1224] border border-blue-950 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => toggleFaq(idx)}
            >
              <div className="p-4 flex justify-between items-center text-sm font-bold text-white">
                <span>{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-[#e11d48] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} 
                />
              </div>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-blue-950/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#0b1224] border-l border-blue-900/50 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-blue-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#e11d48]" />
                  <h2 className="text-base font-bold text-white">Your Shopping Bag ({totalStickerCount})</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-12">Your bag is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center bg-[#070b16] p-3 rounded-xl border border-blue-950">
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">{item.title}</h4>
                        <p className="text-xs text-blue-300">₹{item.price} each × {item.qty}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-rose-500 hover:text-rose-400 p-1.5 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-blue-950 space-y-2.5">
                {bundleDiscount > 0 && (
                  <div className="bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs p-2.5 rounded-lg flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Tag size={14} className="text-[#e11d48]" /> {bundleName}
                    </span>
                    <span className="font-bold text-white">-₹{bundleDiscount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Items Total ({totalStickerCount} stickers)</span>
                  <span>
                    {bundleDiscount > 0 && (
                      <span className="line-through text-slate-500 mr-1.5">₹{rawItemTotal}</span>
                    )}
                    <span className="text-white font-medium">₹{subtotal.toFixed(0)}</span>
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-blue-950">
                  <span>Total</span>
                  <span className="text-[#e11d48] text-xl font-black">₹{total.toFixed(0)}</span>
                </div>

                <button
                  onClick={() => alert(`Proceeding to checkout for ₹${total.toFixed(0)}!`)}
                  className="w-full bg-[#e11d48] hover:bg-[#f43f5e] text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 mt-4 cursor-pointer shadow-lg shadow-rose-950/60"
                >
                  <span>Proceed to Buy</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}