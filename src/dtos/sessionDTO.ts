import { z } from 'zod';

export const sessionSchema = {
  email: z.string().email({ message: 'E-mail é obrigatório' }).min(1),
  password: z.string({
    required_error: 'Senha é obrigatória',
  }),
  // .min(8, {
  //   message: 'A senha deve ter no mínimo 8 caracteres',
  // }),
};

export const sessionObject = z.object(sessionSchema);
export type SessionDRO = z.infer<typeof sessionObject>;
