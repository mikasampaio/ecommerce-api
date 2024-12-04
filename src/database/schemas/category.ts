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
    image: String,
    url: String,
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

CategorySchema.pre('save', function (next) {
  if (this.image) {
    this.url = `${process.env.API_URL}/product-file/${this.image}`;
  }

  next();
});

export const CategoryModel = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
