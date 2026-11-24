import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 50
    },
    size: {
      type: String,
      default: '3-inch',
      trim: true,
      maxlength: 30
    },
    finish: {
      type: String,
      enum: ['matte', 'gloss'],
      default: 'matte'
    },
    price: {
      type: Number,
      required: true,
      min: 0.01
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    strict: true
  }
);

export default mongoose.model('Product', ProductSchema);