import 'server-only'

import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { post, postAuthor } from '@/db/schema'
import { requireAdmin } from '@/lib/auth-helpers'

import { POST_STATUS } from '@/modules/posts/constants'

import type { CreatePostInput, UpdatePostInput } from '../schemas'
import { createPostSchema, updatePostSchema } from '../schemas'

export async function createPost(data: CreatePostInput) {
  'use server'

  try {
    const admin = await requireAdmin()

    const validated = createPostSchema.parse(data)
    const { coAuthors, ...postData } = validated

    const newPost = await db
      .insert(post)
      .values({
        ...postData,
        authorId: admin.id,
        publishedAt:
          validated.status === POST_STATUS.PUBLISHED ? new Date() : null
      })
      .returning()

    // Insertar co-autores si existen
    if (coAuthors && coAuthors.length > 0) {
      await db.insert(postAuthor).values(
        coAuthors.map(userId => ({
          postId: newPost[0].id,
          userId,
          role: 'contributor' as const
        }))
      )
    }

    // Revalidar rutas
    revalidatePath('/admin/posts')
    revalidatePath('/posts')

    return { success: true, data: newPost[0] }
  } catch (error) {
    console.error('Error creating post:', error)

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, error: 'No autorizado' }
    }

    return { success: false, error: 'Error al crear el post' }
  }
}

export async function updatePost(data: UpdatePostInput) {
  'use server'

  try {
    await requireAdmin()

    const validated = updatePostSchema.parse(data)
    const { id, coAuthors, ...updateData } = validated

    // Si se cambia a published, establecer publishedAt
    const dataToUpdate: Record<string, unknown> = { ...updateData }
    if (updateData.status === POST_STATUS.PUBLISHED) {
      dataToUpdate.publishedAt = new Date()
    }

    const updatedPost = await db
      .update(post)
      .set(dataToUpdate)
      .where(eq(post.id, id))
      .returning()

    // Actualizar co-autores
    if (coAuthors !== undefined) {
      // Eliminar co-autores existentes
      await db.delete(postAuthor).where(eq(postAuthor.postId, id))

      // Insertar nuevos co-autores
      if (coAuthors.length > 0) {
        await db.insert(postAuthor).values(
          coAuthors.map(userId => ({
            postId: id,
            userId,
            role: 'contributor' as const
          }))
        )
      }
    }

    // Revalidar rutas
    revalidatePath('/admin/posts')
    revalidatePath('/posts')

    if (updatedPost[0]?.slug) {
      revalidatePath(`/posts/${updatedPost[0].slug}`)
    }

    return { success: true, data: updatedPost[0] }
  } catch (error) {
    console.error('Error updating post:', error)

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, error: 'No autorizado' }
    }

    return { success: false, error: 'Error al actualizar el post' }
  }
}

export async function deletePost(postId: string) {
  'use server'

  try {
    await requireAdmin()

    await db.delete(post).where(eq(post.id, postId))

    // Revalidar rutas
    revalidatePath('/admin/posts')
    revalidatePath('/posts')

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, error: 'No autorizado' }
    }

    return { success: false, error: 'Error al eliminar el post' }
  }
}
