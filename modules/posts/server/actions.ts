import 'server-only'

import { revalidatePath } from 'next/cache'

import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { comment, reaction } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'

import { createCommentSchema, updateCommentSchema } from '../schemas'
import type { InsertComment } from '../types'

export async function toggleReaction(postId: string, postSlug: string) {
  try {
    const user = await getCurrentUser()

    const existingReaction = await db
      .select()
      .from(reaction)
      .where(and(eq(reaction.postId, postId), eq(reaction.userId, user.id)))
      .limit(1)

    if (existingReaction.length > 0) {
      await db.delete(reaction).where(eq(reaction.id, existingReaction[0].id))
    } else {
      await db.insert(reaction).values({
        id: crypto.randomUUID(),
        userId: user.id,
        postId,
        createdAt: new Date()
      })
    }

    // Revalidar la página específica del post
    revalidatePath(`/posts/${postSlug}`)
    // También revalidar el listado
    revalidatePath('/posts')

    return { success: true }
  } catch (error) {
    console.error('Error toggling reaction:', error)
    return { success: false, error: 'Error al procesar la reacción' }
  }
}

export async function createComment(data: {
  content: string
  postId: string
  parentId?: string
  postSlug?: string
}) {
  try {
    const user = await getCurrentUser()

    const validatedData = createCommentSchema.parse(data)

    const newComment: InsertComment = {
      content: validatedData.content,
      postId: validatedData.postId,
      userId: user.id,
      parentId: validatedData.parentId ?? null
    }

    await db.insert(comment).values(newComment)

    // Revalidar tanto el listado como la página específica del post
    revalidatePath('/posts')
    if (data.postSlug) {
      revalidatePath(`/posts/${data.postSlug}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, error: 'Error al crear el comentario' }
  }
}

export async function updateComment(
  commentId: string,
  content: string,
  postSlug?: string
) {
  try {
    const user = await getCurrentUser()

    const validatedData = updateCommentSchema.parse({ content })

    const existingComment = await db
      .select()
      .from(comment)
      .where(eq(comment.id, commentId))
      .limit(1)

    if (existingComment.length === 0) {
      return { success: false, error: 'Comentario no encontrado' }
    }

    if (existingComment[0].userId !== user.id) {
      return {
        success: false,
        error: 'No tienes permiso para editar este comentario'
      }
    }

    await db
      .update(comment)
      .set({ content: validatedData.content })
      .where(eq(comment.id, commentId))

    revalidatePath('/posts')
    if (postSlug) {
      revalidatePath(`/posts/${postSlug}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating comment:', error)
    return { success: false, error: 'Error al actualizar el comentario' }
  }
}

export async function deleteComment(commentId: string, postSlug?: string) {
  try {
    const user = await getCurrentUser()

    const existingComment = await db
      .select()
      .from(comment)
      .where(eq(comment.id, commentId))
      .limit(1)

    if (existingComment.length === 0) {
      return { success: false, error: 'Comentario no encontrado' }
    }

    if (existingComment[0].userId !== user.id) {
      return {
        success: false,
        error: 'No tienes permiso para eliminar este comentario'
      }
    }

    await db.delete(comment).where(eq(comment.id, commentId))

    revalidatePath('/posts')
    if (postSlug) {
      revalidatePath(`/posts/${postSlug}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { success: false, error: 'Error al eliminar el comentario' }
  }
}
