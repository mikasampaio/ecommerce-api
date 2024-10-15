import mongoose, { Schema, Types } from 'mongoose';

import { IOrder, OrderStatus } from '../../entities/interfaces/order';

export const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String },
      },
    ],
    orderStatus: {
      type: String,
      enum: OrderStatus,
      required: true,
    },
    total: { type: Number },
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
