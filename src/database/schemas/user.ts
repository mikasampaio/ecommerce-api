import { model, Model, Schema, Types } from 'mongoose';

import { UserType } from '../../entities/interfaces/common';
import { IUser } from '../../entities/interfaces/user';

export const UserSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      required: true,
    },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    type: {
      type: String,
      enum: UserType,
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

export const UserModel = model<IUser>('User', UserSchema);
