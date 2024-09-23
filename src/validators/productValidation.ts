import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  price: z.number().positive('O preço deve ser positivo'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  image_url: z.string().url('A URL é inválida').optional(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().positive('O preço deve ser positivo').optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  image_url: z.string().url('A URL é inválida').optional(),
});

export const updateCategorySchema = z.object({
  currentCategory: z.string().min(1, 'A categoria atual é obrigatória'),
  newCategory: z.string().min(1, 'A nova categoria é obrigatória'),
});
