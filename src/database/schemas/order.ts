import mongoose, { Schema, Types } from 'mongoose';

import { IOrder } from '../../entities/interfaces/order';

export const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    products: [
      {
        type: {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          quantity: { type: Number },
          size: { type: String },
          color: { type: String },
        },
      },
    ],
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

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
