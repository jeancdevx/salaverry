import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(1, 'El contenido es requerido'),
  coverImage: z.string().url('URL de imagen inválida'),
  status: z.enum(['draft', 'published']).default('draft')
})

export const updatePostSchema = createPostSchema.partial()

export const createCommentSchema = z.object({
  content: z.string().min(1, 'El comentario no puede estar vacío').max(1000),
  postId: z.string().uuid(),
  parentId: z.string().uuid().optional()
})

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'El comentario no puede estar vacío').max(1000)
})
