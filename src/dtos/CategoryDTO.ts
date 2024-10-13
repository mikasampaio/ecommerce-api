import { z } from 'zod';

export const categorySchema = {
  name: z.string({ required_error: 'Nome é obrigatório' }),
};

export const updateCategorySchema = {
  name: z.string().optional(),
};

const createCategoryObject = z.object(categorySchema);
export type CreateCategoryDTO = z.infer<typeof createCategoryObject>;

const updateCategoryObject = z.object(updateCategorySchema);
export type UpdateCategoryDTO = z.infer<typeof updateCategoryObject>;
