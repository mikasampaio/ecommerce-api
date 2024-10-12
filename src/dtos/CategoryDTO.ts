import { z } from 'zod';

export const createCategorySchema = {
  name: z.string({ required_error: 'Nome é obrigatório' }),
};

export const updateCategorySchema = {
  name: z.string().optional(),
};

const createCategoryObject = z.object(createCategorySchema);
export type CreateCategoryDTO = z.infer<typeof createCategoryObject>;

const updateCategoryObject = z.object(updateCategorySchema);
export type UpdateCategoryDTO = z.infer<typeof updateCategoryObject>;
