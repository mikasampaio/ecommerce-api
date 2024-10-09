import { z } from 'zod';

import { UserType } from '../entities/interfaces/common';

export const createUserSchema = {
  firstName: z.string({ required_error: 'Nome é obrigatório' }).min(1),
  lastName: z.string({ required_error: 'Sobrenome é obrigatório' }).min(1),
  email: z.string().email({ message: 'E-mail é obrigatório' }).min(1),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres',
    }),
  type: z.nativeEnum(UserType).default(UserType.USER),
};

export const updateUserSchema = {
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string().min(8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  }),
  type: z.nativeEnum(UserType),
};

const createUserObject = z.object(createUserSchema);
export type CreateUserDTO = z.infer<typeof createUserObject>;

const updateUserObject = z.object(updateUserSchema);
export type UpdateUserDTO = z.infer<typeof updateUserObject>;
