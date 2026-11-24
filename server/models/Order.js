import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 999,
      validate: Number.isInteger
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0.01
    }
  },
  { _id: false }
);

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    address: { type: String, required: true, trim: true, maxlength: 500 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'COD'],
      required: true
    }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: (items) => items.length > 0
    },
    totalStickers: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    customer: { type: CustomerSchema, required: true },
    status: {
      type: String,
      enum: ['pending_whatsapp'],
      default: 'pending_whatsapp'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
