import { model, Schema, Types } from 'mongoose';

import { IProduct, Size } from '../../entities/interfaces/product';
import { CategorySchema } from './category';

const VariationSchema = new Schema(
  {
    name: String,
    size: {
      type: String,
      enum: Size,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String /*  {
      name: String,
      hex: String,
      }, */,
    },
    path: {
      type: [String],
    },
  },
  { _id: false },
);

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
    discount: Number,
    category: {
      type: CategorySchema,
      required: true,
    },
    description: String,
    variants: {
      type: [VariationSchema],
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
// ProductSchema.pre('save', function (next) {
//   if (this.stock.length > 0) {
//     this.stock.forEach((stock, index) => {
//       if (!stock._id) {
//         stock._id = index + 1;
//       }
//     });
//   }

//   next();
// });

export const ProductModel = model<IProduct>('Product', ProductSchema);
