import { model, Schema, Types } from 'mongoose';

import { IProduct, Size } from '../../entities/interfaces/product';
import { CategorySchema } from './category';

export const ProductSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    name: String,
    price: Number,
    quantity: String,
    category: CategorySchema,
    description: String,
    discount: Number,
    color: Array,
    path: Array,
    size: {
      type: [String],
      enum: Size,
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

export const ProductModel = model<IProduct>('Product', ProductSchema);
