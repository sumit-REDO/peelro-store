import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true // Keeps all categories neat (e.g. 'anime', 'gaming')
  },
  size: { 
    type: String, 
    default: '3-inch' 
  },
  finish: {
    type: String,
    default: 'matte' // 'matte' or 'gloss'
  },
  price: { 
    type: Number, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);