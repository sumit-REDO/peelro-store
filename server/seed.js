import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    title: 'Bhaar-er-Cha Lofi Cat',
    category: 'anime',
    size: '3-inch',
    finish: 'matte',
    price: 59,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500',
    description: 'Original artwork: Cozy ginger cat curled around a traditional Kolkata clay tea cup.',
    inStock: true
  },
  {
    title: 'Error 404: Sleep Not Found',
    category: 'tech',
    size: '3-inch',
    finish: 'gloss',
    price: 49,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
    description: 'Matte waterproof vinyl badge for developers and late-night coders.',
    inStock: true
  },
  {
    title: 'Sealdah Local: Window Seat Warrior',
    category: 'college',
    size: '3-inch',
    finish: 'matte',
    price: 59,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500',
    description: 'Badge of honour for daily local train commuters across North 24 Parganas.',
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear old sample data (if any) and insert fresh products
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);

    console.log('🎉 3 PEELRO Stickers added to your real MongoDB database!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();