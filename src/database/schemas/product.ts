import { model, Schema, Types } from 'mongoose';

import { IProduct, Size } from '../../entities/interfaces/product';
import { CategorySchema } from './category';

const StockSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: [String],
    enum: Size,
    required: true,
  },
  color: {
    type: [String],
  },
  discount: {
    type: Number,
  },
  path: {
    type: [String],
  },
  description: {
    type: String,
  },
});

export const ProductSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: CategorySchema,
      required: true,
    },
    stock: {
      type: [StockSchema], // Array of stock objects
      required: true,
    },
    status: {
      type: Object,
      default: {
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      required: true,
    },
  },
  { versionKey: false },
);

// Middleware to auto-increment stock IDs
ProductSchema.pre('save', function (next) {
  if (this.stock.length > 0) {
    this.stock.forEach((stock, index) => {
      if (!stock._id) {
        stock._id = index + 1;
      }
    });
  }

  next();
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
