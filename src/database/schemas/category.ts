import mongoose, { Schema, Types } from 'mongoose';

import { ICategory } from '../../entities/interfaces/category';

export const CategorySchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    name: String,
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

export const CategoryModel = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
