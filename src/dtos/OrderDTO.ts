import { z } from 'zod';

import { Size } from '../entities/interfaces/product';

export const orderSchema = {
  products: z.array(
    z.object({
      product: z
        .string({
          required_error: 'Produto é obrigatório',
        })
        .length(24),
      quantity: z.number().int().positive(),
      size: z.nativeEnum(Size).default(Size.M),
      color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
    }),
  ),
};

export const updateOrderSchema = {
  products: z.array(
    z.object({
      product: z
        .string({
          required_error: 'Produto é obrigatório',
        })
        .length(24)
        .optional(),
      quantity: z.number().int().positive().optional(),
      size: z.nativeEnum(Size).default(Size.M).optional(),
      color: z
        .string()
        .regex(/^#[A-Fa-f0-9]{6}$/)
        .optional(),
    }),
  ),
};

const createOrderObject = z.object(orderSchema);
export type CreateOrderDTO = z.infer<typeof createOrderObject>;

const updateOrderObject = z.object(updateOrderSchema);
export type UpdateOrderDTO = z.infer<typeof updateOrderObject>;
