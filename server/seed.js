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
    price: 18,
    imageUrl: '/stickers/breaking-news.png',
    description: 'Live broadcast news graphic. Sarcastic waterproof vinyl badge.',
    inStock: true
  },
  {
    title: "Hello, I'm A Bad Idea",
    category: "meme",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/bad-idea.png',
    description: 'Classic red name-tag badge. High-tack weatherproof vinyl.',
    inStock: true
  },
  {
    title: "Calendar Says WTF",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/calendar-wtf.png',
    description: 'After Monday and Tuesday, even the calendar says WTF.',
    inStock: true
  },
  {
    title: "Note to Self: Do Not Quit",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/do-not-quit.png',
    description: 'Yellow lined sticky note reminder with tape graphic accent.',
    inStock: true
  },
  {
    title: "Enjoy The Little Things",
    category: "aesthetic",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/enjoy-the-little-things.png',
    description: 'Minimalist butterfly linework and cursive script decal.',
    inStock: true
  },
  {
    title: "Every Day Routine",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/every-day.png',
    description: 'Yellow industrial icon sequence badge for desks and gear.',
    inStock: true
  },
  {
    title: "From Another Point Of View",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/from-another-point-of-view.png',
    description: 'Inverted monospaced typography framed border decal.',
    inStock: true
  },
  {
    title: "Allergic To People",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/hello-i-am-allergic-to-people.png',
    description: 'Pastel purple introvert name-tag badge with flower accent.',
    inStock: true
  },
  {
    title: "Kindly Fuck Off",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/kindly-fuck-off.png',
    description: 'Pink paper airplane with teal dashed flight trail.',
    inStock: true
  },
  {
    title: "Evil Eye Protection Badge",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/evil-eye.png',
    description: 'May every evil eye in your life go blind. Deep cobalt circular vinyl.',
    inStock: true
  },
  {
    title: "May The Books Be With You",
    category: "college",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/books-with-you.png',
    description: 'Sci-fi inspired yellow typography for readers and Kindle covers.',
    inStock: true
  },
  {
    title: "I'm A Multi-Tasker",
    category: "college",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/multitasker.png',
    description: 'I can listen, ignore, and forget all at the same time.',
    inStock: true
  },
  {
    title: "National Sarcasm Society",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/national-sarcasm-society.png',
    description: 'Like we need your support. Yellow frame parody badge.',
    inStock: true
  },
  {
    title: "Okay? Okay. (TFIOS)",
    category: "quote",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/okay-okay.png',
    description: 'Detailed typographic collage inspired by The Fault In Our Stars.',
    inStock: true
  },
  {
    title: "Okay To Make Mistakes",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/ok-to-mistake.png',
    description: 'Soft pink school eraser illustration with encouraging text.',
    inStock: true
  },
  {
    title: "Positive Vibes Only",
    category: "aesthetic",
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/positive-vibe-only.png',
    description: 'Horizontal cursive script with pastel daisy flower center.',
    inStock: true
  },
  {
    title: "Life Doesn't Get Easier",
    category: "meme",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/skeleton-stronger.png',
    description: 'Flexing crowned skeleton with green flame aura. You just get stronger.',
    inStock: true
  },
  {
    title: "Stay Positive (Battery)",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/stay-positive.png',
    description: 'Yellow battery cell graphic with positive charge symbol.',
    inStock: true
  },
  {
    title: "Stronger Than You Think",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/stronger-than-you-think.png',
    description: 'Pink pastel pinned memo note with subtle heart illustrations.',
    inStock: true
  },
  {
    title: "Trust The Process!",
    category: "quote",
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/trust-the-process.png',
    description: 'Sage green earthy crest with two-leaf sprout illustration.',
    inStock: true
  },
  {
    title: 'Bubble Cat (Black)',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/bubble-cat-black.png',
    description: 'A tiny black cat tucked inside a bubble.',
    inStock: true
  },
  {
    title: 'Bubble Cat (Orange)',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/bubble-cat-orange.png',
    description: 'A curious orange cat in a little bubble.',
    inStock: true
  },
  {
    title: 'Caffeine IV Drip',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/caffeine-iv-drip.png',
    description: 'For the days when coffee feels like essential equipment.',
    inStock: true
  },
  {
    title: 'Cat Reading the Newspaper',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/cat-reading-newspaper.png',
    description: 'A quiet little cat catching up on the news.',
    inStock: true
  },
  {
    title: 'Chaos Kitty',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/chaos-kitty.png',
    description: 'A playful cat for your more chaotic days.',
    inStock: true
  },
  {
    title: 'Coffee Saline',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/coffee-saline.png',
    description: 'A little medical-grade coffee humor for long days.',
    inStock: true
  },
  {
    title: 'Cool Kitty',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/cool-kitty.png',
    description: 'A laid-back cat with effortless cool.',
    inStock: true
  },
  {
    title: 'Cute Angry Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/cute-angry-cat.png',
    description: 'Small cat, very strong opinions.',
    inStock: true
  },
  {
    title: 'Doctor Cat',
    category: 'aesthetic',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/doctor-cat.png',
    description: 'A tiny doctor cat ready for your laptop or bottle.',
    inStock: true
  },
  {
    title: 'Only Element: Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/only-element-coffee.png',
    description: 'A periodic-table-style tribute to coffee.',
    inStock: true
  },
  {
    title: 'Periodic Table of Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/periodic-table-coffee.png',
    description: 'Chemistry class, with a much-needed coffee break.',
    inStock: true
  },
  {
    title: 'Recharging with Coffee',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/recharging-with-coffee.png',
    description: 'Running low? This sticker understands.',
    inStock: true
  },
  {
    title: 'Shhh, Coffee First',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/shhh-coffee-first.png',
    description: 'A gentle reminder to let the coffee happen first.',
    inStock: true
  },
  {
    title: 'Shocked Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/shocked-cat.png',
    description: 'A very relatable cat having a very relatable reaction.',
    inStock: true
  },
  {
    title: 'Stoned Cat Vibes',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/stoned-cat-vibes.png',
    description: 'A mellow cat for your laid-back gear.',
    inStock: true
  },
  {
    title: 'Surprised Cat',
    category: 'meme',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/surprised-cat-meme.png',
    description: 'A wide-eyed cat for unexpected plot twists.',
    inStock: true
  },
  {
    title: 'Breaking Code',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/breaking-code.png',
    description: 'A programming twist on a breaking-news classic.',
    inStock: true
  },
  {
    title: 'Username: Admin / Password: 123456',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/admin-password-123456.png',
    description: 'A familiar security warning for your laptop or notebook.',
    inStock: true
  },
  {
    title: 'Pisa: font-style: italic;',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/font-style-italic.png',
    description: 'A little CSS wordplay for type and code lovers.',
    inStock: true
  },
  {
    title: 'The Codefather',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/the-codefather.png',
    description: 'A classic movie-inspired badge for programmers.',
    inStock: true
  },
  {
    title: 'GitHub Parody Badge',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/github-hub.png',
    description: 'A playful GitHub-inspired badge for your gear.',
    inStock: true
  },
  {
    title: 'I Know H.T.M.L.',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/i-know-html.png',
    description: 'For anyone whose first language is markup.',
    inStock: true
  },
  {
    title: 'In Case of Fire: git push',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/in-case-of-fire-git.png',
    description: 'A developer emergency plan, ready to stick.',
    inStock: true
  },
  {
    title: 'Keep Calm and React',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/keep-calm-react.png',
    description: 'A calm reminder for your next React project.',
    inStock: true
  },
  {
    title: "Let's Escape Together (Esc Key)",
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/lets-escape-together.png',
    description: 'A keyboard-themed sticker for the escape artists.',
    inStock: true
  },
  {
    title: 'SQL Injection Syringe',
    category: 'college',
    size: '3-inch',
    finish: 'gloss',
    price: 18,
    imageUrl: '/stickers/sql-injection.png',
    description: 'A cheeky database-themed sticker for developers.',
    inStock: true
  },
  {
    title: 'Warning: Armed With Linux Skills',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 18,
    imageUrl: '/stickers/linux-skills-warning.png',
    description: 'A warning label for your terminal-powered setup.',
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas...');

    await Product.deleteMany();
    await Product.insertMany(realStickers);

    console.log(`🎉 All ${realStickers.length} PEELRO stickers saved to MongoDB Atlas successfully!`);
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();