// validators/userValidation.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').toLowerCase(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Formato de e-mail inválido').optional(),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .optional(),
});
