import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import QualitySpecs from './components/QualitySpecs';
import Surfaces from './components/Surfaces';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import BundleBanner from './components/BundleBanner';
import CartDrawer from './components/CartDrawer';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { calculateCart, INDIVIDUAL_PRICE } from './lib/pricing';

const API_BASE = import.meta.env.VITE_API_URL || 'https://peelro-store.onrender.com';
const WHATSAPP_NUMBER = (
  import.meta.env.VITE_WHATSAPP_NUMBER || '917439112798'
).replace(/\D/g, '');
const CART_STORAGE_KEY = 'peelro_cart_v1';

function loadValidatedCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof item._id === 'string' &&
          item._id.trim() !== '' &&
          typeof item.title === 'string' &&
          item.title.trim() !== '' &&
          Number.isFinite(Number(item.quantity)) &&
          Number(item.quantity) >= 1
      )
      .map((item) => ({
        ...item,
        _id: item._id.trim(),
        title: item.title.trim(),
        price: Number(item.price) > 0 ? Number(item.price) : INDIVIDUAL_PRICE,
        quantity: Math.floor(Number(item.quantity)),
      }));
  } catch {
    return [];
  }
}

const FALLBACK_PRODUCTS = [
  {
    _id: 'fallback-1',
    title: "Breaking News: I Don't Care",
    category: 'meme',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/breaking-news.png',
    description: 'Live broadcast news graphic. Sarcastic waterproof vinyl badge.',
    inStock: true,
  },
  {
    _id: 'fallback-2',
    title: "Hello, I'm A Bad Idea",
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/bad-idea.png',
    description: 'Classic red name-tag badge. High-tack weatherproof vinyl.',
    inStock: true,
  },
  {
    _id: 'fallback-3',
    title: 'Calendar Says WTF',
    category: 'meme',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/calendar-wtf.png',
    description: 'After Monday and Tuesday, even the calendar says WTF.',
    inStock: true,
  },
  {
    _id: 'fallback-4',
    title: 'Note to Self: Do Not Quit',
    category: 'quote',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/do-not-quit.png',
    description: 'Yellow lined sticky note reminder with tape graphic accent.',
    inStock: true,
  },
  {
    _id: 'fallback-5',
    title: 'Enjoy The Little Things',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/enjoy-the-little-things.png',
    description: 'Minimalist butterfly linework and cursive script decal.',
    inStock: true,
  },
  {
    _id: 'fallback-6',
    title: 'Every Day Routine',
    category: 'meme',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/every-day.png',
    description: 'Yellow industrial icon sequence badge for desks and gear.',
    inStock: true,
  },
  {
    _id: 'fallback-7',
    title: 'From Another Point Of View',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/from-another-point-of-view.png',
    description: 'Inverted monospaced typography framed border decal.',
    inStock: true,
  },
  {
    _id: 'fallback-8',
    title: 'Allergic To People',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/hello-i-am-allergic-to-people.png',
    description: 'Pastel purple introvert name-tag badge with flower accent.',
    inStock: true,
  },
  {
    _id: 'fallback-9',
    title: 'Kindly Fuck Off',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/kindly-fuck-off.png',
    description: 'Pink paper airplane with teal dashed flight trail.',
    inStock: true,
  },
  {
    _id: 'fallback-10',
    title: 'Evil Eye Protection Badge',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/evil-eye.png',
    description: 'May every evil eye in your life go blind. Deep cobalt circular vinyl.',
    inStock: true,
  },
  {
    _id: 'fallback-11',
    title: 'May The Books Be With You',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/books-with-you.png',
    description: 'Sci-fi inspired yellow typography for readers and Kindle covers.',
    inStock: true,
  },
  {
    _id: 'fallback-12',
    title: "I'm A Multi-Tasker",
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/multitasker.png',
    description: 'I can listen, ignore, and forget all at the same time.',
    inStock: true,
  },
  {
    _id: 'fallback-13',
    title: 'National Sarcasm Society',
    category: 'meme',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/national-sarcasm-society.png',
    description: 'Like we need your support. Yellow frame parody badge.',
    inStock: true,
  },
  {
    _id: 'fallback-14',
    title: 'Okay? Okay. (TFIOS)',
    category: 'quote',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/okay-okay.png',
    description: 'Detailed typographic collage inspired by The Fault In Our Stars.',
    inStock: true,
  },
  {
    _id: 'fallback-15',
    title: 'Okay To Make Mistakes',
    category: 'quote',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/ok-to-mistake.png',
    description: 'Soft pink school eraser illustration with encouraging text.',
    inStock: true,
  },
  {
    _id: 'fallback-16',
    title: 'Positive Vibes Only',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/positive-vibe-only.png',
    description: 'Horizontal cursive script with pastel daisy flower center.',
    inStock: true,
  },
  {
    _id: 'fallback-17',
    title: "Life Doesn't Get Easier",
    category: 'meme',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/skeleton-stronger.png',
    description: 'Flexing crowned skeleton with green flame aura. You just get stronger.',
    inStock: true,
  },
  {
    _id: 'fallback-18',
    title: 'Stay Positive (Battery)',
    category: 'quote',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/stay-positive.png',
    description: 'Yellow battery cell graphic with positive charge symbol.',
    inStock: true,
  },
  {
    _id: 'fallback-19',
    title: 'Stronger Than You Think',
    category: 'quote',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/stronger-than-you-think.png',
    description: 'Pink pastel pinned memo note with subtle heart illustrations.',
    inStock: true,
  },
  {
    _id: 'fallback-20',
    title: 'Trust The Process!',
    category: 'quote',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/trust-the-process.png',
    description: 'Sage green earthy crest with two-leaf sprout illustration.',
    inStock: true,
  },
  {
    _id: 'new-bubble-cat-black',
    title: 'Bubble Cat (Black)',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/bubble-cat-black.png',
    description: 'A tiny black cat tucked inside a bubble.',
    inStock: true,
  },
  {
    _id: 'new-bubble-cat-orange',
    title: 'Bubble Cat (Orange)',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/bubble-cat-orange.png',
    description: 'A curious orange cat in a little bubble.',
    inStock: true,
  },
  {
    _id: 'new-caffeine-iv-drip',
    title: 'Caffeine IV Drip',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/caffeine-iv-drip.png',
    description: 'For the days when coffee feels like essential equipment.',
    inStock: true,
  },
  {
    _id: 'new-cat-reading-newspaper',
    title: 'Cat Reading the Newspaper',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/cat-reading-newspaper.png',
    description: 'A quiet little cat catching up on the news.',
    inStock: true,
  },
  {
    _id: 'new-chaos-kitty',
    title: 'Chaos Kitty',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/chaos-kitty.png',
    description: 'A playful cat for your more chaotic days.',
    inStock: true,
  },
  {
    _id: 'new-coffee-saline',
    title: 'Coffee Saline',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/coffee-saline.png',
    description: 'A little medical-grade coffee humor for long days.',
    inStock: true,
  },
  {
    _id: 'new-cool-kitty',
    title: 'Cool Kitty',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/cool-kitty.png',
    description: 'A laid-back cat with effortless cool.',
    inStock: true,
  },
  {
    _id: 'new-cute-angry-cat',
    title: 'Cute Angry Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/cute-angry-cat.png',
    description: 'Small cat, very strong opinions.',
    inStock: true,
  },
  {
    _id: 'new-doctor-cat',
    title: 'Doctor Cat',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/doctor-cat.png',
    description: 'A tiny doctor cat ready for your laptop or bottle.',
    inStock: true,
  },
  {
    _id: 'new-only-element-coffee',
    title: 'Only Element: Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/only-element-coffee.png',
    description: 'A periodic-table-style tribute to coffee.',
    inStock: true,
  },
  {
    _id: 'new-periodic-table-coffee',
    title: 'Periodic Table of Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/periodic-table-coffee.png',
    description: 'Chemistry class, with a much-needed coffee break.',
    inStock: true,
  },
  {
    _id: 'new-recharging-with-coffee',
    title: 'Recharging with Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/recharging-with-coffee.png',
    description: 'Running low? This sticker understands.',
    inStock: true,
  },
  {
    _id: 'new-shhh-coffee-first',
    title: 'Shhh, Coffee First',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/shhh-coffee-first.png',
    description: 'A gentle reminder to let the coffee happen first.',
    inStock: true,
  },
  {
    _id: 'new-shocked-cat',
    title: 'Shocked Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/shocked-cat.png',
    description: 'A very relatable cat having a very relatable reaction.',
    inStock: true,
  },
  {
    _id: 'new-stoned-cat-vibes',
    title: 'Stoned Cat Vibes',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/stoned-cat-vibes.png',
    description: 'A mellow cat for your laid-back gear.',
    inStock: true,
  },
  {
    _id: 'new-surprised-cat-meme',
    title: 'Surprised Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/surprised-cat-meme.png',
    description: 'A wide-eyed cat for unexpected plot twists.',
    inStock: true,
  },
  {
    _id: 'new-breaking-code',
    title: 'Breaking Code',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/breaking-code.png',
    description: 'A programming twist on a breaking-news classic.',
    inStock: true,
  },
  {
    _id: 'new-admin-password-123456',
    title: 'Username: Admin / Password: 123456',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/admin-password-123456.png',
    description: 'A familiar security warning for your laptop or notebook.',
    inStock: true,
  },
  {
    _id: 'new-font-style-italic',
    title: 'Pisa: font-style: italic;',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/font-style-italic.png',
    description: 'A little CSS wordplay for type and code lovers.',
    inStock: true,
  },
  {
    _id: 'new-the-codefather',
    title: 'The Codefather',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/the-codefather.png',
    description: 'A classic movie-inspired badge for programmers.',
    inStock: true,
  },
  {
    _id: 'new-github-hub',
    title: 'GitHub Parody Badge',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/github-hub.png',
    description: 'A playful GitHub-inspired badge for your gear.',
    inStock: true,
  },
  {
    _id: 'new-i-know-html',
    title: 'I Know H.T.M.L.',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/i-know-html.png',
    description: 'For anyone whose first language is markup.',
    inStock: true,
  },
  {
    _id: 'new-in-case-of-fire-git',
    title: 'In Case of Fire: git push',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/in-case-of-fire-git.png',
    description: 'A developer emergency plan, ready to stick.',
    inStock: true,
  },
  {
    _id: 'new-keep-calm-react',
    title: 'Keep Calm and React',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/keep-calm-react.png',
    description: 'A calm reminder for your next React project.',
    inStock: true,
  },
  {
    _id: 'new-lets-escape-together',
    title: "Let's Escape Together (Esc Key)",
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/lets-escape-together.png',
    description: 'A keyboard-themed sticker for the escape artists.',
    inStock: true,
  },
  {
    _id: 'new-sql-injection',
    title: 'SQL Injection Syringe',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/sql-injection.png',
    description: 'A cheeky database-themed sticker for developers.',
    inStock: true,
  },
  {
    _id: 'new-linux-skills-warning',
    title: 'Warning: Armed With Linux Skills',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: INDIVIDUAL_PRICE,
    imageUrl: '/stickers/linux-skills-warning.png',
    description: 'A warning label for your terminal-powered setup.',
    inStock: true,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Stickers' },
  { id: 'meme', label: 'Memes & Pop' },
  { id: 'quote', label: 'Quotes' },
  { id: 'aesthetic', label: 'Aesthetic' },
  { id: 'college', label: 'College & B-Tech' },
];

const FINISHES = [
  { id: 'all', label: 'All Finishes' },
  { id: 'matte', label: 'Matte' },
  { id: 'gloss', label: 'Gloss' },
];

function getCatalogFilterFromUrl(parameter, options) {
  const value = new URLSearchParams(window.location.search).get(parameter);
  return options.some((option) => option.id === value) ? value : 'all';
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(loadValidatedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(() =>
    getCatalogFilterFromUrl('category', CATEGORIES)
  );
  const [selectedFinish, setSelectedFinish] = useState(() =>
    getCatalogFilterFromUrl('finish', FINISHES)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const pendingScrollSectionRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', selectedCategory);
    }

    if (selectedFinish === 'all') {
      url.searchParams.delete('finish');
    } else {
      url.searchParams.set('finish', selectedFinish);
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`
    );
  }, [selectedCategory, selectedFinish]);

  useEffect(() => {
    const restoreFiltersFromUrl = () => {
      setSelectedCategory(getCatalogFilterFromUrl('category', CATEGORIES));
      setSelectedFinish(getCatalogFilterFromUrl('finish', FINISHES));
    };

    window.addEventListener('popstate', restoreFiltersFromUrl);
    return () => window.removeEventListener('popstate', restoreFiltersFromUrl);
  }, []);

  useEffect(() => {
    const sectionId = pendingScrollSectionRef.current;
    if (!sectionId || selectedProduct) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    pendingScrollSectionRef.current = null;
  }, [selectedProduct]);

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          const apiProducts =
            Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;
          const apiImageUrls = new Set(apiProducts.map((item) => item.imageUrl));
          const newStickerProducts = FALLBACK_PRODUCTS.filter(
            (item) => item._id.startsWith('new-') && !apiImageUrls.has(item.imageUrl)
          );
          setProducts([...apiProducts, ...newStickerProducts]);
        }
      } catch (err) {
        console.error('Error fetching catalog, using built-in studio catalog:', err);
        if (isMounted) setProducts(FALLBACK_PRODUCTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const syncProductFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const productId = hash.replace('#product-', '');
        const match = products.find((item) => item._id === productId);
        if (match) setSelectedProduct(match);
      } else {
        setSelectedProduct(null);
      }
    };

    syncProductFromHash();
    window.addEventListener('hashchange', syncProductFromHash);
    window.addEventListener('popstate', syncProductFromHash);
    return () => {
      window.removeEventListener('hashchange', syncProductFromHash);
      window.removeEventListener('popstate', syncProductFromHash);
    };
  }, [products]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    window.location.hash = `product-${product._id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId) => {
    if (selectedProduct) {
      setSelectedProduct(null);
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    pendingScrollSectionRef.current = sectionId;
  };

  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((item) => item.category === catId).length;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesFinish =
      selectedFinish === 'all' || (product.finish || 'matte') === selectedFinish;
    const term = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !term ||
      (product.title && product.title.toLowerCase().includes(term)) ||
      (product.category && product.category.toLowerCase().includes(term)) ||
      (product.description && product.description.toLowerCase().includes(term));

    return matchesCategory && matchesFinish && matchesSearch;
  });

  const handleAddToCart = (product, qty = 1) => {
    if (!product || product.inStock === false) return;
    const countToAdd = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + countToAdd }
            : item
        );
      }
      return [...prev, { ...product, quantity: countToAdd }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const handleQuickCompletePack = () => {
    const { remainingStickers } = calculateCart(cart);
    if (remainingStickers === 0 || products.length === 0) return;

    const needed = 12 - remainingStickers;
    const cartIds = new Set(cart.map((item) => item._id));
    const unpickedProducts = products.filter(
      (product) => product.inStock !== false && !cartIds.has(product._id)
    );
    const shuffledProducts = [...unpickedProducts];

    for (let index = shuffledProducts.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffledProducts[index], shuffledProducts[swapIndex]] = [
        shuffledProducts[swapIndex],
        shuffledProducts[index],
      ];
    }

    const selectedProducts = shuffledProducts.slice(0, needed);
    while (selectedProducts.length < needed) {
      const availableProducts = products.filter((product) => product.inStock !== false);
      if (availableProducts.length === 0) return;
      selectedProducts.push(
        availableProducts[Math.floor(Math.random() * availableProducts.length)]
      );
    }

    setCart((prev) => {
      const additions = new Map();
      selectedProducts.forEach((product) => {
        const current = additions.get(product._id);
        additions.set(product._id, {
          product,
          quantity: (current?.quantity || 0) + 1,
        });
      });

      const existingIds = new Set(prev.map((item) => item._id));
      const updatedItems = prev.map((item) => {
        const addition = additions.get(item._id);
        return addition
          ? { ...item, quantity: item.quantity + addition.quantity }
          : item;
      });
      const newItems = [...additions.values()]
        .filter(({ product }) => !existingIds.has(product._id))
        .map(({ product, quantity }) => ({ ...product, quantity }));

      return [...updatedItems, ...newItems];
    });
  };

  const handleProceedToCheckout = async ({
    cart: items,
    customer,
  }) => {
    const fallbackSummary = calculateCart(items);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    let response;

    try {
      response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: String(item._id),
            title: item.title,
            quantity: item.quantity,
            unitPrice: INDIVIDUAL_PRICE,
          })),
          customer,
        }),
        signal: controller.signal,
      }).catch(() => null);
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (response && response.status >= 400 && response.status < 500) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Check your order and delivery details.');
    }

    let savedOrder = null;
    if (response?.ok) {
      try {
        const orderBody = await response.json();
        if (
          typeof orderBody.orderNumber === 'string' &&
          Number.isFinite(orderBody.total) &&
          Number.isFinite(orderBody.subtotal) &&
          Number.isFinite(orderBody.deliveryFee)
        ) {
          savedOrder = orderBody;
        }
      } catch {
        savedOrder = null;
      }
    }

    const orderNumber =
      savedOrder?.orderNumber ||
      `PEELRO-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = savedOrder?.subtotal ?? fallbackSummary.subtotal;
    const deliveryFee = savedOrder?.deliveryFee ?? fallbackSummary.deliveryFee;
    const total = savedOrder?.total ?? fallbackSummary.total;
    const packSavings = Math.max(
      0,
      fallbackSummary.rawSubtotal - subtotal
    );
    const itemLines = items
      .map((item, idx) => {
        return `${idx + 1}. ${item.title} × ${item.quantity} — ₹${INDIVIDUAL_PRICE * item.quantity}`;
      })
      .join('\n');
    const deliveryText = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
    const packDiscountText = packSavings > 0 ? `\nPack discount: -₹${packSavings}` : '';
    const addressBlock = `\n\nDelivery Details:\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}, ${customer.city} - ${customer.pincode}\nPayment preference: ${customer.paymentMethod}`;
    const message = `Hi PEELRO! I would like to place an order.\nOrder reference: ${orderNumber}\n\n${itemLines}${packDiscountText}\n\nTotal stickers: ${fallbackSummary.totalStickers}\nSubtotal: ₹${subtotal}\nDelivery: ${deliveryText}\nTotal payable: ₹${total}${addressBlock}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    return {
      orderNumber,
      whatsappUrl,
      backupSaved: Boolean(savedOrder),
      total,
    };
  };

  const {
    totalStickers: cartCount,
    packCount,
    remainingStickers: remainingForPack,
    subtotal: currentSubtotal,
  } = calculateCart(cart);

  return (
    <div className="flex min-h-screen flex-col bg-[#0A1518] font-sans text-[#FFFFFF] selection:bg-[#FF0E1A] selection:text-white">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail
            key={selectedProduct._id}
            product={selectedProduct}
            allProducts={products}
            onBack={handleBackToCatalog}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ) : (
          <>
            <Hero
              featuredProducts={products.slice(0, 4)}
              onSelectProduct={handleSelectProduct}
            />
            <QualitySpecs />
            <Surfaces />

            <section id="catalog" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-widest text-[#8B8F8E]">
                    Sticker Collection
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    Handcrafted Vinyl Stickers
                  </h2>
                </div>
                <div className="text-xs text-[#8B8F8E]">
                  Showing {filteredProducts.length} of {products.length} designs
                </div>
              </div>

              <div className="mb-8 flex flex-col justify-between gap-3 border-b border-[#1F4A52] pb-4 lg:flex-row lg:items-center">
                <div className="scrollbar-none flex items-center gap-2 overflow-x-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`min-h-11 border-b-2 px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'border-[#FF0E1A] bg-[#FF0E1A] text-white'
                          : 'border-[#1F4A52] bg-[#1A1F22] text-[#8B8F8E] hover:border-[#B50B16] hover:text-white'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="ml-1.5 font-mono text-[10px] opacity-75">
                        ({getCategoryCount(cat.id)})
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 self-start lg:self-auto">
                  <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-[#8B8F8E]">
                    Finish:
                  </span>
                  {FINISHES.map((fin) => (
                    <button
                      key={fin.id}
                      type="button"
                      onClick={() => setSelectedFinish(fin.id)}
                      className={`min-h-11 border px-3 py-2 text-xs font-semibold transition-colors ${
                        selectedFinish === fin.id
                          ? 'border-[#FF0E1A] bg-[#FF0E1A] text-white'
                          : 'border-[#1F4A52] bg-[#1A1F22] text-[#8B8F8E] hover:border-[#B50B16] hover:text-white'
                      }`}
                    >
                      {fin.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="py-24 text-center">
                  <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#FF0E1A] border-t-transparent" />
                  <p className="text-sm text-[#8B8F8E]">Loading studio collection...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="border-y border-[#1F4A52] bg-[#1A1F22] p-8 py-24 text-center">
                  <p className="mb-2 font-serif text-lg font-bold text-white">
                    No stickers found
                  </p>
                  <p className="mx-auto mb-4 max-w-sm text-sm text-[#8B8F8E]">
                    Try another category or finish filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedFinish('all');
                      setSearchQuery('');
                    }}
                    className="min-h-11 bg-[#FF0E1A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B50B16]"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid min-w-0 grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={handleSelectProduct}
                      cartQuantity={
                        cart.find((item) => item._id === product._id)?.quantity || 0
                      }
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>
              )}
            </section>

            <BundleBanner />
            <AboutUs />
            <Faq />
          </>
        )}
      </main>

      <Footer />

      {cartCount > 0 && !isCartOpen && !selectedProduct && (
        <div className="fixed inset-x-0 bottom-4 z-30 mx-auto max-w-xl px-4">
          <div className="flex items-center justify-between gap-3 border border-[#FF0E1A]/50 bg-[#1A1F22] px-4 py-3 text-white shadow-2xl">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Sparkles size={13} className="shrink-0 text-[#FFFACD]" />
                <span className="truncate">
                  {remainingForPack === 0
                    ? `${packCount} × 12-Sticker Pack Unlocked (₹199/pack)!`
                    : `${remainingForPack}/12 in pack · Add ${12 - remainingForPack} more for ₹199 deal`}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#8B8F8E]">
                {cartCount} sticker{cartCount > 1 ? 's' : ''} in bag · Subtotal ₹{currentSubtotal}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 bg-[#FF0E1A] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B50B16]"
            >
              <ShoppingBag size={13} />
              <span>View Bag</span>
            </button>
          </div>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        onQuickCompletePack={handleQuickCompletePack}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}