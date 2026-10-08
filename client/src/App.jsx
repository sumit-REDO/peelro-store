import { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, ArrowRight, X, Tag, Plus, Minus, AlertCircle, RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QualitySpecs from './components/QualitySpecs';
import ProductCard from './components/ProductCard';
import BundleBanner from './components/BundleBanner';
import Faq from './components/Faq';
import Footer from './components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist Cart in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('peelro_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('peelro_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const fetchProducts = () => {
    setLoading(true);
    setFetchError(null);

    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError('Unable to connect to inventory server. Make sure node server.js is running.');
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const title = p.title || '';
    const desc = p.description || '';
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === id) {
            const newQty = item.qty + change;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
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

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1c1917] font-sans selection:bg-[#dc2626] selection:text-white">
      
      <Navbar 
        totalStickerCount={totalStickerCount} 
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero />
      <QualitySpecs />

      {/* Catalogue */}
      <section id="catalogue" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#e8e4dc]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] block">
              Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] tracking-tight uppercase mt-0.5">
              Available Stickers
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {['all', 'anime', 'tech', 'college', 'poster'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-xs'
                    : 'bg-[#ffffff] border-[#d6d0c4] text-[#78716c] hover:border-[#dc2626] hover:text-[#dc2626]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-[#78716c] text-xs">
            Loading stickers from database...
          </div>
        )}

        {fetchError && !loading && (
          <div className="text-center py-12 px-4 max-w-md mx-auto bg-amber-50 border border-amber-200 rounded-2xl my-6">
            <AlertCircle size={28} className="text-amber-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-[#1c1917] mb-1">{fetchError}</p>
            <button
              onClick={fetchProducts}
              className="mt-3 inline-flex items-center gap-1.5 bg-[#1c1917] hover:bg-[#dc2626] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
            >
              <RefreshCw size={13} />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {!loading && !fetchError && filteredProducts.length === 0 && (
          <div className="text-center py-16 text-[#78716c]">
            <p className="text-sm font-semibold mb-1">No stickers found matching "{searchQuery}"</p>
            <p className="text-xs">Try searching for "anime", "cat", or "tech"</p>
          </div>
        )}

        {!loading && !fetchError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                cartItem={cart.find((item) => item._id === product._id)}
              />
            ))}
          </div>
        )}
      </section>

      <BundleBanner />
      <Faq />
      <Footer />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#ffffff] border-l border-[#e5dfd3] h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#e8e4dc]">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#dc2626]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1c1917]">
                    Shopping Bag ({totalStickerCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#78716c] hover:text-[#1c1917] p-1 rounded hover:bg-[#f5f2eb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-[#78716c] text-xs text-center py-12">Your bag is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center bg-[#fbf9f5] p-3 rounded-lg border border-[#e5dfd3] text-xs">
                      <div className="flex-1 mr-2">
                        <h4 className="font-bold text-[#1c1917] mb-0.5 line-clamp-1">{item.title}</h4>
                        <p className="text-[#78716c] font-semibold">₹{item.price * item.qty}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center border border-[#d6d0c4] rounded-lg bg-[#ffffff] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="px-2 py-1 text-[#78716c] hover:bg-[#f5f2eb] hover:text-[#1c1917] transition cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 font-bold text-[#1c1917] text-xs">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="px-2 py-1 text-[#78716c] hover:bg-[#f5f2eb] hover:text-[#1c1917] transition cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-[#a8a29e] hover:text-rose-600 p-1.5 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#e8e4dc] space-y-2 text-xs">
                {bundleDiscount > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] p-2.5 rounded-lg flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag size={13} className="text-emerald-600" /> {bundleName}
                    </span>
                    <span className="font-bold">-₹{bundleDiscount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#57534e]">
                  <span>Subtotal</span>
                  <span>
                    {bundleDiscount > 0 && (
                      <span className="line-through text-[#a8a29e] mr-1.5">₹{rawItemTotal}</span>
                    )}
                    <span className="text-[#1c1917] font-bold">₹{subtotal.toFixed(0)}</span>
                  </span>
                </div>

                <div className="flex justify-between text-[#57534e]">
                  <span>Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#1c1917] pt-2 border-t border-[#e8e4dc]">
                  <span>Total</span>
                  <span className="text-[#dc2626] text-base font-black">₹{total.toFixed(0)}</span>
                </div>

                <button
                  onClick={() => alert(`Proceeding to checkout for ₹${total.toFixed(0)}!`)}
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition active:scale-95 mt-4 cursor-pointer text-xs uppercase tracking-wider shadow-sm"
                >
                  <span>Proceed to Buy</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}