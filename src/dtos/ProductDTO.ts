import { z } from 'zod';

import { Size } from '../entities/interfaces/product';

const SizeSchema = z.enum([Size.L, Size.M, Size.S, Size.XL, Size.XXL]);

export const createProductSchema = {
  name: z.string({ required_error: 'Nome é obrigatório' }),
  price: z.number({ required_error: 'Preço é obrigatório' }),
  quantity: z.number({ required_error: 'Quantidade é obrigatório' }).int(),
  category: z.string({ required_error: 'Categoria é obrigatória' }).length(24),
  description: z.string().optional(),
  size: z
    .array(SizeSchema)
    .min(1, 'Deve haver pelo menos um tamanho selecionado'),
  color: z.array(z.string().regex(/^#[A-Fa-f0-9]{6}$/), {
    message: 'Cor inválida. Deve ser um código hexadecimal de 6 caracteres',
  }),
  discount: z.number().optional(),
  path: z.array(z.string()).optional(),
};

export const updateProductSchema = {
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  size: z
    .array(SizeSchema)
    .min(1, 'Deve haver pelo menos um tamanho selecionado'),
  path: z.array(z.string()).optional(),
  color: z.array(z.string().regex(/^#[A-Fa-f0-9]{6}$/)).optional(),
  quantity: z.number().optional(),
  discount: z.number().optional(),
};

const createProductObject = z.object(createProductSchema);
export type CreateProductDTO = z.infer<typeof createProductObject>;

const updateProductObject = z.object(updateProductSchema);
export type UpdateProductDTO = z.infer<typeof updateProductObject>;
