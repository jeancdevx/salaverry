import 'server-only'

import { count, desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { post, postAuthor, user } from '@/db/schema'
import { requireAdmin } from '@/lib/auth-helpers'

import { POST_STATUS } from '@/modules/posts/constants'

import { PostWithAuthor } from './types'

/**
 * Get co-authors for a post
 */
async function getPostCoAuthors(postId: string): Promise<string[]> {
  const coAuthors = await db
    .select({ userId: postAuthor.userId })
    .from(postAuthor)
    .where(eq(postAuthor.postId, postId))

  return coAuthors.map(ca => ca.userId)
}

/**
 * Get all posts (including drafts) for admin
 */
export async function getAllPostsAdmin(): Promise<PostWithAuthor[]> {
  await requireAdmin()

  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      authorId: post.authorId,
      isAnonymous: post.isAnonymous,
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
      }
    })
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id))
    .orderBy(desc(post.createdAt))

  return posts.map(p => ({
    ...p,
    status: p.status as 'draft' | 'published'
  }))
}

/**
 * Get post by ID for admin (including drafts)
 */
export async function getPostByIdAdmin(
  postId: string
): Promise<PostWithAuthor | null> {
  await requireAdmin()

  const result = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      authorId: post.authorId,
      isAnonymous: post.isAnonymous,
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
      }
    })
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id))
    .where(eq(post.id, postId))
    .limit(1)

  if (result.length === 0) return null

  const p = result[0]
  const coAuthors = await getPostCoAuthors(postId)

  return {
    ...p,
    status: p.status as 'draft' | 'published',
    coAuthors
  }
}

/**
 * Get posts count by status
 */
export async function getPostsCountByStatus(): Promise<{
  draft: number
  published: number
  total: number
}> {
  await requireAdmin()

  const [draftCount, publishedCount, totalCount] = await Promise.all([
    db
      .select({ count: count() })
      .from(post)
      .where(eq(post.status, POST_STATUS.DRAFT)),
    db
      .select({ count: count() })
      .from(post)
      .where(eq(post.status, POST_STATUS.PUBLISHED)),
    db.select({ count: count() }).from(post)
  ])

  return {
    draft: draftCount[0]?.count ?? 0,
    published: publishedCount[0]?.count ?? 0,
    total: totalCount[0]?.count ?? 0
  }
}
