import { z } from 'zod'

import { POST_STATUS } from '@/modules/posts/constants'

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(200, 'El título no puede exceder 200 caracteres'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(200, 'El slug no puede exceder 200 caracteres')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'El slug solo puede contener letras minúsculas, números y guiones'
    ),
  excerpt: z
    .string()
    .max(500, 'El extracto no puede exceder 500 caracteres')
    .optional(),
  content: z.string().min(1, 'El contenido es requerido'),
  coverImage: z
    .string()
    .min(1, 'La imagen de portada es requerida')
    .url('Debe ser una URL válida'),
  isAnonymous: z.boolean().default(false),
  coAuthors: z.array(z.string()).optional().default([]),
  status: z.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED])
})

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid()
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
