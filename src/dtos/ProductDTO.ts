import { z } from 'zod';

import { Size } from '../entities/interfaces/product';

const SizeSchema = z.enum([Size.L, Size.M, Size.S, Size.XL, Size.XXL]);

export const createProductSchema = {
  name: z.string({ required_error: 'Nome é obrigatório' }),
  price: z.number({ required_error: 'Preço é obrigatório' }),
  category: z.string({ required_error: 'Categoria é obrigatória' }).length(24),
  stock: z.array(
    z.object({
      name: z.string({ required_error: 'Nome é obrigatório' }),
      quantity: z
        .number({ required_error: 'Quantidade é obrigatório' })
        .int()
        .positive({
          message: 'Quantidade deve ser um número inteiro positivo',
        }),
      description: z.string().optional(),
      size: z
        .array(SizeSchema)
        .min(1, 'Deve haver pelo menos um tamanho selecionado'),
      color: z.array(z.string().regex(/^#[A-Fa-f0-9]{6}$/), {
        message: 'Cor inválida. Deve ser um código hexadecimal de 6 caracteres',
      }),
      discount: z
        .number()
        .positive({
          message: 'Desconto deve ser um número positivo',
        })
        .nullable(),
      path: z.array(z.string()).optional(),
    }),
  ),
};

export const updateProductSchema = {
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  stock: z
    .array(
      z.object({
        _id: z.number().optional(),
        name: z.string().optional(),
        quantity: z
          .number()
          .int()
          .positive({
            message: 'Quantidade deve ser um número inteiro positivo',
          })
          .optional(),
        size: z
          .array(SizeSchema)
          .min(1, 'Deve haver pelo menos um tamanho selecionado')
          .optional(),
        path: z.array(z.string()).optional(),
        color: z.array(z.string().regex(/^#[A-Fa-f0-9]{6}$/)).optional(),
        discount: z
          .number()
          .positive({
            message: 'Desconto deve ser um número positivo',
          })
          .nullable(),
        description: z.string().optional(),
      }),
    )
    .optional(),
};

const createProductObject = z.object(createProductSchema);
export type CreateProductDTO = z.infer<typeof createProductObject>;

const updateProductObject = z.object(updateProductSchema);
export type UpdateProductDTO = z.infer<typeof updateProductObject>;
