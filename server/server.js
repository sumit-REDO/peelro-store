import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (allows reading incoming JSON data and permits browser requests)
app.use(cors());
app.use(express.json());

// 1. Basic Health Check
app.get('/', (req, res) => {
  res.send('PEELRO Backend API is running!');
});

// 2. ROUTE: Get all stickers from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    // Product.find() asks MongoDB for all records, newest first
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. ROUTE: Add a new sticker to MongoDB
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connect to MongoDB Atlas and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Connection error:', error.message);
  });