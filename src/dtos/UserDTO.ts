import { z } from 'zod';

import { UserType } from '../entities/interfaces/common';

export const createUserSchema = {
  firstName: z.string({ required_error: 'Nome é obrigatório' }).min(1),
  lastName: z.string({ required_error: 'Sobrenome é obrigatório' }).min(1),
  email: z.string().email({ message: 'E-mail é obrigatório' }).min(1),
  password: z.string({
    required_error: 'Senha é obrigatória',
  }),
  // .min(8, {
  //   message: 'A senha deve ter no mínimo 8 caracteres',
  // }),
  type: z.nativeEnum(UserType).default(UserType.USER),
  favorites: z.array(z.string()).optional(),
};

export const updateUserSchema = {
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'E-mail inválido' }).optional(),
  password: z
    .string()
    // .min(8, {
    //   message: 'A senha deve ter no mínimo 8 caracteres',
    // })
    .optional(),
  type: z.nativeEnum(UserType).optional(),
  favorites: z.array(z.string()).optional(),
};

const createUserObject = z.object(createUserSchema).transform((data) => {
  return {
    ...data,
    favorites: [],
  };
});

export type CreateUserDTO = z.infer<typeof createUserObject>;

const updateUserObject = z.object(updateUserSchema);
export type UpdateUserDTO = z.infer<typeof updateUserObject>;
