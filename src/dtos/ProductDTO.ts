import { z } from 'zod';

import { Size } from '../entities/interfaces/product';

export const createProductSchema = {
  name: z.string({ required_error: 'Nome é obrigatório' }),
  price: z.number({ required_error: 'Preço é obrigatório' }),
  description: z.string(),
  discount: z
    .number()
    .positive({
      message: 'Desconto deve ser um número positivo',
    })
    .nullable(),
  category: z.string({ required_error: 'Categoria é obrigatória' }).length(24),
  variants: z.array(
    z.object({
      name: z.string().optional(),
      size: z.nativeEnum(Size),
      quantity: z
        .number({ required_error: 'Quantidade é obrigatório' })
        .int()
        .positive({
          message: 'Quantidade deve ser um número inteiro positivo',
        }),
      color: z
        .string({
          message:
            'Cor inválida. Deve ser um código hexadecimal de 6 caracteres',
        })
        .regex(/^#[A-Fa-f0-9]{6}$/),
      path: z.array(z.string()).optional(),
    }),
  ),
};

export const updateProductSchema = {
  name: z.string().optional(),
  price: z.number().optional(),
  discount: z
    .number()
    .positive({
      message: 'Desconto deve ser um número positivo',
    })
    .nullable()
    .optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  variants: z
    .array(
      z.object({
        name: z.string().optional(),
        size: z.nativeEnum(Size),
        quantity: z.number().int().positive({
          message: 'Quantidade deve ser um número inteiro positivo',
        }),
        path: z.array(z.string()).optional(),
        color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
      }),
    )
    .optional(),
};

const createProductObject = z.object(createProductSchema);
export type CreateProductDTO = z.infer<typeof createProductObject>;

const updateProductObject = z.object(updateProductSchema);
export type UpdateProductDTO = z.infer<typeof updateProductObject>;
