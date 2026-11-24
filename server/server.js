import express from 'express';
import { randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const INDIVIDUAL_PRICE = 18;
const PACK_STICKER_COUNT = 12;
const PACK_PRICE = 199;
const FREE_DELIVERY_THRESHOLD = 299;
const DELIVERY_FEE = 40;

app.use(cors());
app.use(express.json({ limit: '20kb' }));

app.get('/', (req, res) => {
  res.send('PEELRO Backend API is running!');
});

function isAdminRequest(req) {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_SECRET_KEY;

  return (
    typeof expectedKey === 'string' &&
    expectedKey.length >= 32 &&
    typeof adminKey === 'string' &&
    adminKey === expectedKey
  );
}

function validateProductInput(body) {
  const {
    title,
    category,
    size,
    finish,
    price,
    imageUrl,
    description,
    inStock
  } = body;

  if (typeof title !== 'string' || !title.trim()) {
    return 'Title is required.';
  }

  if (typeof category !== 'string' || !category.trim()) {
    return 'Category is required.';
  }

  if (
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return 'Price must be a positive number.';
  }

  if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
    return 'Image URL is required.';
  }

  if (size !== undefined && typeof size !== 'string') {
    return 'Size must be a string.';
  }

  if (finish !== undefined && !['matte', 'gloss'].includes(finish)) {
    return 'Finish must be either matte or gloss.';
  }

  if (description !== undefined && typeof description !== 'string') {
    return 'Description must be a string.';
  }

  if (inStock !== undefined && typeof inStock !== 'boolean') {
    return 'inStock must be true or false.';
  }

  return null;
}

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({
      message: 'Failed to fetch products.'
    });
  }
});

app.post('/api/orders', async (req, res) => {
  const { items, customer } = req.body || {};

  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    return res.status(400).json({
      message: 'Add between 1 and 100 sticker designs to your order.'
    });
  }

  if (!customer || typeof customer !== 'object' || Array.isArray(customer)) {
    return res.status(400).json({
      message: 'Delivery details are required.'
    });
  }

  const normalizedCustomer = {
    name: typeof customer.name === 'string' ? customer.name.trim() : '',
    phone: typeof customer.phone === 'string' ? customer.phone.trim() : '',
    address: typeof customer.address === 'string' ? customer.address.trim() : '',
    city: typeof customer.city === 'string' ? customer.city.trim() : '',
    pincode: typeof customer.pincode === 'string' ? customer.pincode.trim() : '',
    paymentMethod: customer.paymentMethod
  };

  if (
    !normalizedCustomer.name ||
    normalizedCustomer.name.length > 120 ||
    !/^\d{10}$/.test(normalizedCustomer.phone) ||
    !normalizedCustomer.address ||
    normalizedCustomer.address.length > 500 ||
    !normalizedCustomer.city ||
    normalizedCustomer.city.length > 120 ||
    !/^\d{6}$/.test(normalizedCustomer.pincode) ||
    !['UPI', 'COD'].includes(normalizedCustomer.paymentMethod)
  ) {
    return res.status(400).json({
      message: 'Check the name, 10-digit phone, address, city, PIN code, and payment preference.'
    });
  }

  const seenProductIds = new Set();
  const normalizedItems = [];

  for (const item of items) {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.productId !== 'string' ||
      !item.productId.trim() ||
      item.productId.trim().length > 120 ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.trim().length > 150 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 999
    ) {
      return res.status(400).json({
        message: 'One or more sticker items have invalid details.'
      });
    }

    const productId = item.productId.trim();
    if (seenProductIds.has(productId)) {
      return res.status(400).json({
        message: 'Each sticker design should appear only once in the order.'
      });
    }

    seenProductIds.add(productId);
    normalizedItems.push({
      productId,
      title: item.title.trim(),
      quantity: item.quantity,
      unitPrice: INDIVIDUAL_PRICE
    });
  }

  const totalStickers = normalizedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const packCount = Math.floor(totalStickers / PACK_STICKER_COUNT);
  const remainingStickers = totalStickers % PACK_STICKER_COUNT;
  const subtotal =
    packCount * PACK_PRICE + remainingStickers * INDIVIDUAL_PRICE;
  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  try {
    await Order.init();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const orderNumber = `PEELRO-${randomBytes(4).toString('hex').toUpperCase()}`;
      try {
        await Order.create({
          orderNumber,
          items: normalizedItems,
          totalStickers,
          subtotal,
          deliveryFee,
          total,
          customer: normalizedCustomer,
          status: 'pending_whatsapp'
        });

        return res.status(201).json({
          orderNumber,
          total,
          deliveryFee,
          subtotal
        });
      } catch (error) {
        if (error?.code !== 11000 || attempt === 4) {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Failed to save order backup:', error.message);
    return res.status(503).json({
      message: 'Order backup is temporarily unavailable.'
    });
  }

  return res.status(503).json({
    message: 'Order backup is temporarily unavailable.'
  });
});

app.post('/api/products', async (req, res) => {
  if (!isAdminRequest(req)) {
    return res.status(401).json({
      message: 'Unauthorized: valid admin key required.'
    });
  }

  const validationError = validateProductInput(req.body);

  if (validationError) {
    return res.status(400).json({
      message: validationError
    });
  }

  try {
    const {
      title,
      category,
      size = '3-inch',
      finish = 'matte',
      price,
      imageUrl,
      description = '',
      inStock = true
    } = req.body;

    const product = await Product.create({
      title: title.trim(),
      category: category.trim().toLowerCase(),
      size: size.trim(),
      finish,
      price,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      inStock
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(400).json({
      message: 'Failed to create product.'
    });
  }
});

const mongoUri = process.env.MONGO_URI;
const adminSecretKey = process.env.ADMIN_SECRET_KEY;

if (!mongoUri) {
  console.error('MONGO_URI is missing. Add it to server/.env');
  process.exit(1);
}

if (!adminSecretKey || adminSecretKey.length < 32) {
  console.warn(
    'ADMIN_SECRET_KEY is missing or shorter than 32 characters. Admin product routes will remain disabled until a valid key is configured.'
  );
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });