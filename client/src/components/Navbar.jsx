import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { INDIVIDUAL_PRICE } from '../lib/pricing';

export default function Navbar({
  cartCount,
  onOpenCart,
  products = [],
  onSelectProduct,
  onAddToCart,
  onNavigate,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const imageFallback = '/stickers/calendar-wtf.png';

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const searchResults = searchQuery.trim()
    ? products
        .filter((product) => {
          const title = (product?.title || '').toLowerCase();
          const category = (product?.category || '').toLowerCase();
          const description = (product?.description || '').toLowerCase();
          const term = searchQuery.trim().toLowerCase();
          if (term === 'waterproof') return true;
          return title.includes(term) || category.includes(term) || description.includes(term);
        })
        .slice(0, 6)
    : [];

  const POPULAR_TAGS = ['Meme', 'Quote', 'Aesthetic', 'College', 'Waterproof'];
  const navLinks = [
    { label: 'All Stickers', id: 'catalog' },
    { label: 'Where to Stick', id: 'surfaces' },
    { label: 'Our Story', id: 'our-story' },
    { label: 'FAQ', id: 'faqs' },
  ];

  const handleSelect = (product) => {
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
    if (onSelectProduct) onSelectProduct(product);
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1F4A52] bg-[#0A1518]/95 backdrop-blur-md text-white">
      <div className="bg-[#FF0E1A] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-widest text-white">
        WATERPROOF VINYL STICKERS • ₹18 EACH • 12 FOR ₹199 • FREE DELIVERY OVER ₹299
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="min-h-11 text-left focus-visible:outline-2 focus-visible:outline-[#FF0E1A]"
        >
          <span className="font-serif text-2xl font-black tracking-tighter text-white transition-colors hover:text-[#FFFACD]">
            PEELRO
          </span>
        </button>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="min-h-11 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#8B8F8E] transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div ref={searchContainerRef} className="relative hidden max-w-md flex-1 sm:block">
          <div className="flex min-h-11 items-center gap-2 border border-[#1F4A52] bg-[#1A1F22] px-3 py-1.5 transition-colors focus-within:border-[#FF0E1A]">
            <Search size={15} className="text-[#8B8F8E]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search stickers"
              aria-label="Search stickers"
              className="w-full bg-transparent text-xs text-white placeholder:text-[#8B8F8E] focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#8B8F8E] hover:bg-[#0A1518] hover:text-white"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            ) : (
              <span className="inline-flex items-center rounded border border-[#1F4A52] bg-[#0A1518] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#8B8F8E]">
                /
              </span>
            )}
          </div>

          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 border border-[#1F4A52] bg-[#1A1F22] p-4 shadow-[0_20px_60px_rgba(255,14,26,0.16)]">
              <div className="mb-3">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-[#8B8F8E]">
                  Popular searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setIsSearchOpen(true);
                      }}
                      className="min-h-9 border border-[#1F4A52] bg-[#0A1518] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#8B8F8E] transition-colors hover:border-[#B50B16]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {searchQuery.trim() && (
                <div className="border-t border-[#1F4A52] pt-3">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-[#8B8F8E]">
                    <span>Matching stickers</span>
                    <span>{searchResults.length}</span>
                  </div>

                  {searchResults.length === 0 ? (
                    <p className="py-3 text-center text-xs text-[#8B8F8E]">
                      No stickers found for “{searchQuery}”
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.map((item) => {
                        const unitPrice = Number(item.price) > 0 ? Number(item.price) : INDIVIDUAL_PRICE;

                        return (
                          <div
                            key={item._id}
                            className="flex items-center justify-between gap-2 rounded-sm border border-transparent p-1 transition-colors hover:border-[#1F4A52] hover:bg-[#0A1518]"
                          >
                            <button
                              type="button"
                              onClick={() => handleSelect(item)}
                              className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#FF0E1A]"
                            >
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#1F4A52] bg-[#0A1518] p-1">
                                <img
                                  src={item.imageUrl || imageFallback}
                                  alt={item.title || 'Sticker'}
                                  width={44}
                                  height={44}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-contain"
                                  onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = imageFallback;
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate font-serif text-xs font-bold text-white">
                                  {item.title || 'Sticker'}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-[#8B8F8E]">
                                  {item.category || 'Vinyl'}
                                </div>
                              </div>
                            </button>

                            <div className="flex shrink-0 items-center gap-2">
                              <span className="text-xs font-semibold text-white">₹{unitPrice}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (onAddToCart) onAddToCart({ ...item, price: unitPrice });
                                }}
                                className="min-h-9 border border-[#FF0E1A] bg-[#FF0E1A] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B50B16]"
                              >
                                add
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#1F4A52] bg-[#1A1F22] text-white transition-colors hover:border-[#B50B16] sm:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={18} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-11 items-center gap-2 border border-[#FF0E1A] bg-[#FF0E1A] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#B50B16] hover:bg-[#B50B16]"
          >
            <ShoppingBag size={14} />
            <span>Bag</span>
            <span className="min-w-5 bg-white px-1.5 py-0.5 text-center text-[10px] font-bold text-[#0A1518]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#1F4A52] bg-[#0A1518] px-4 py-4 sm:hidden">
          <div className="mb-3 flex min-h-11 items-center gap-2 border border-[#1F4A52] bg-[#1A1F22] px-3 py-2">
            <Search size={15} className="text-[#8B8F8E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search stickers"
              aria-label="Search stickers on mobile"
              className="w-full bg-transparent text-xs text-white placeholder:text-[#8B8F8E] focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="flex h-9 w-9 items-center justify-center text-[#8B8F8E]"
                aria-label="Clear mobile search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="min-h-11 border border-[#1F4A52] bg-[#1A1F22] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-[#8B8F8E]"
              >
                {tag}
              </button>
            ))}
          </div>

          {searchQuery.trim() && (
            <div className="mb-4 border border-[#1F4A52] bg-[#1A1F22] p-2">
              {searchResults.length === 0 ? (
                <p className="py-2 text-center text-xs text-[#8B8F8E]">
                  No stickers found for “{searchQuery}”
                </p>
              ) : (
                <div className="space-y-1.5">
                  {searchResults.map((item) => {
                    const unitPrice = Number(item.price) > 0 ? Number(item.price) : INDIVIDUAL_PRICE;

                    return (
                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-2 p-1 hover:bg-[#0A1518]"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(item)}
                          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-left"
                        >
                          <img
                            src={item.imageUrl || imageFallback}
                            alt={item.title || 'Sticker'}
                            width={36}
                            height={36}
                            loading="lazy"
                            decoding="async"
                            className="h-9 w-9 shrink-0 border border-[#1F4A52] bg-[#0A1518] object-contain p-0.5"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = imageFallback;
                            }}
                          />
                          <span className="truncate font-serif text-xs font-bold text-white">
                            {item.title}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onAddToCart) onAddToCart({ ...item, price: unitPrice });
                          }}
                          className="min-h-11 shrink-0 bg-[#FF0E1A] px-3 py-2 text-[10px] font-semibold uppercase text-white hover:bg-[#B50B16]"
                        >
                          + ₹{unitPrice}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="flex min-h-11 items-center justify-between border border-[#1F4A52] bg-[#1A1F22] px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-white"
              >
                <span>{link.label}</span>
                <ArrowRight size={13} />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}