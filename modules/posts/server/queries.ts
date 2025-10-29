import 'server-only'

import { cache } from 'react'

import { and, count, desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { comment, post, reaction, user } from '@/db/schema'

import { POST_STATUS, POSTS_PER_PAGE } from '../constants'
import type { PostWithAuthor } from '../types'
import { formatPostDate, getInitials } from './utils'

/**
 * Obtiene todos los posts publicados con información del autor
 */
export const getPublishedPosts = cache(
  async (page = 1): Promise<PostWithAuthor[]> => {
    const offset = (page - 1) * POSTS_PER_PAGE

    const posts = await db
      .select({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        authorId: post.authorId,
        status: post.status,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username
        },
        reactionsCount: count(reaction.id),
        commentsCount: count(comment.id)
      })
      .from(post)
      .innerJoin(user, eq(post.authorId, user.id))
      .leftJoin(reaction, eq(post.id, reaction.postId))
      .leftJoin(comment, eq(post.id, comment.postId))
      .where(eq(post.status, POST_STATUS.PUBLISHED))
      .groupBy(
        post.id,
        user.id,
        user.name,
        user.email,
        user.image,
        user.username
      )
      .orderBy(desc(post.publishedAt))
      .limit(POSTS_PER_PAGE)
      .offset(offset)

    return posts.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      authorId: p.authorId,
      status: p.status as 'draft' | 'published',
      publishedAt: p.publishedAt,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      author: p.author,
      _count: {
        reactions: p.reactionsCount,
        comments: p.commentsCount
      },
      // Datos formateados en el servidor
      formattedDate: formatPostDate(p.publishedAt),
      authorInitials: getInitials(p.author.name || 'Anónimo')
    }))
  }
)

/**
 * Obtiene un post por su slug con información del autor
 */
export const getPostBySlug = cache(
  async (slug: string): Promise<PostWithAuthor | null> => {
    const result = await db
      .select({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        authorId: post.authorId,
        status: post.status,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username
        },
        reactionsCount: count(reaction.id),
        commentsCount: count(comment.id)
      })
      .from(post)
      .innerJoin(user, eq(post.authorId, user.id))
      .leftJoin(reaction, eq(post.id, reaction.postId))
      .leftJoin(comment, eq(post.id, comment.postId))
      .where(and(eq(post.slug, slug), eq(post.status, POST_STATUS.PUBLISHED)))
      .groupBy(
        post.id,
        user.id,
        user.name,
        user.email,
        user.image,
        user.username
      )
      .limit(1)

    if (result.length === 0) return null

    const p = result[0]

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      authorId: p.authorId,
      status: p.status as 'draft' | 'published',
      publishedAt: p.publishedAt,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      author: p.author,
      _count: {
        reactions: p.reactionsCount,
        comments: p.commentsCount
      },
      // Datos formateados en el servidor
      formattedDate: formatPostDate(p.publishedAt),
      authorInitials: getInitials(p.author.name || 'Anónimo')
    }
  }
)

/**
 * Obtiene el total de posts publicados
 */
export const getPublishedPostsCount = cache(async (): Promise<number> => {
  const result = await db
    .select({ count: count() })
    .from(post)
    .where(eq(post.status, POST_STATUS.PUBLISHED))

  return result[0]?.count ?? 0
})

/**
 * Verifica si el usuario actual ha reaccionado a un post
 */
export const hasUserReactedToPost = cache(
  async (postId: string, userId: string): Promise<boolean> => {
    const result = await db
      .select({ id: reaction.id })
      .from(reaction)
      .where(and(eq(reaction.postId, postId), eq(reaction.userId, userId)))
      .limit(1)

    return result.length > 0
  }
)

/**
 * Obtiene los comentarios de un post con información del autor
 */
export const getPostComments = cache(async (postId: string) => {
  const comments = await db
    .select({
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      author: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        username: user.username
      }
    })
    .from(comment)
    .innerJoin(user, eq(comment.userId, user.id))
    .where(eq(comment.postId, postId))
    .orderBy(desc(comment.createdAt))

  return comments.map(c => ({
    ...c,
    formattedDate: formatPostDate(c.createdAt),
    authorInitials: getInitials(c.author.name || 'Anónimo')
  }))
})
