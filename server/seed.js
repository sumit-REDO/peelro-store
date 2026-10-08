import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const realStickers = [
  {
    title: "Breaking News: I Don't Care",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/breaking-news.png',
    description: 'Live broadcast news graphic. Sarcastic waterproof vinyl badge.',
    inStock: true
  },
  {
    title: "Hello, I'm A Bad Idea",
    category: "meme",
    size: '3-inch',
    finish: 'gloss',
    price: 49,
    imageUrl: '/stickers/bad-idea.jpg',
    description: 'Classic red name-tag badge. High-tack weatherproof vinyl.',
    inStock: true
  },
  {
    title: "Calendar Says WTF",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/calendar-wtf.png',
    description: 'After Monday and Tuesday, even the calendar says WTF.',
    inStock: true
  },
  {
    title: "Note to Self: Do Not Quit",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/do-not-quit.jpg',
    description: 'Yellow lined sticky note reminder with tape graphic accent.',
    inStock: true
  },
  {
    title: "Enjoy The Little Things",
    category: "aesthetic",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/enjoy-the-little-things.jpg',
    description: 'Minimalist butterfly linework and cursive script decal.',
    inStock: true
  },
  {
    title: "Every Day Routine",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/every-day.jpg',
    description: 'Yellow industrial icon sequence badge for desks and gear.',
    inStock: true
  },
  {
    title: "From Another Point Of View",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 49,
    imageUrl: '/stickers/from-another-point-of-view.png',
    description: 'Inverted monospaced typography framed border decal.',
    inStock: true
  },
  {
    title: "Allergic To People",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/hello-i-am-allergic-to-people.png',
    description: 'Pastel purple introvert name-tag badge with flower accent.',
    inStock: true
  },
  {
    title: "Kindly Fuck Off",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 59,
    imageUrl: '/stickers/kindly-fuck-off.jpg',
    description: 'Pink paper airplane with teal dashed flight trail.',
    inStock: true
  },
  {
    title: "Evil Eye Protection Badge",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 59,
    imageUrl: '/stickers/evil-eye.jpg',
    description: 'May every evil eye in your life go blind. Deep cobalt circular vinyl.',
    inStock: true
  },
  {
    title: "May The Books Be With You",
    category: "college",
    size: '3-inch',
    finish: 'gloss',
    price: 49,
    imageUrl: '/stickers/books-with-you.jpg',
    description: 'Sci-fi inspired yellow typography for readers and Kindle covers.',
    inStock: true
  },
  {
    title: "I'm A Multi-Tasker",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/multitasker.png',
    description: 'I can listen, ignore, and forget all at the same time.',
    inStock: true
  },
  {
    title: "National Sarcasm Society",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/national-sarcasm-society.jpg',
    description: 'Like we need your support. Yellow frame parody badge.',
    inStock: true
  },
  {
    title: "Okay? Okay. (TFIOS)",
    category: "quote",
    size: '3-inch',
    finish: 'gloss',
    price: 59,
    imageUrl: '/stickers/okay-okay.png',
    description: 'Detailed typographic collage inspired by The Fault In Our Stars.',
    inStock: true
  },
  {
    title: "Okay To Make Mistakes",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/ok-to-mistake.jpg',
    description: 'Soft pink school eraser illustration with encouraging text.',
    inStock: true
  },
  {
    title: "Positive Vibes Only",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 49,
    imageUrl: '/stickers/positive-vibe-only.jpg',
    description: 'Horizontal cursive script with pastel daisy flower center.',
    inStock: true
  },
  {
    title: "Life Doesn't Get Easier",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 59,
    imageUrl: '/stickers/skeleton-stronger.jpg',
    description: 'Flexing crowned skeleton with green flame aura. You just get stronger.',
    inStock: true
  },
  {
    title: "Stay Positive (Battery)",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/stay-positive.jpg',
    description: 'Yellow battery cell graphic with positive charge symbol.',
    inStock: true
  },
  {
    title: "Stronger Than You Think",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/stronger-than-you-think.jpg',
    description: 'Pink pastel pinned memo note with subtle heart illustrations.',
    inStock: true
  },
  {
    title: "Trust The Process!",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 49,
    imageUrl: '/stickers/trust-the-process.jpg',
    description: 'Sage green earthy crest with two-leaf sprout illustration.',
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas...');

    await Product.deleteMany();
    await Product.insertMany(realStickers);

    console.log('🎉 All 20 Real PEELRO Stickers saved to MongoDB Atlas successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();