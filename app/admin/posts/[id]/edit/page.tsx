import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/dal'

import type { CreatePostInput } from '@/modules/admin/schemas'
import { updatePost } from '@/modules/admin/server/actions'
import { getPostByIdAdmin } from '@/modules/admin/server/queries'
import { PostForm } from '@/modules/admin/ui/components'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostByIdAdmin(id)
  const user = await getCurrentUser()

  if (!post) {
    notFound()
  }

  async function handleUpdate(data: CreatePostInput) {
    'use server'
    return await updatePost({ ...data, id })
  }

  return (
    <PostForm
      postId={post.id}
      currentUserId={user.id}
      initialData={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImage: post.coverImage,
        isAnonymous: post.isAnonymous,
        coAuthors: post.coAuthors || [],
        status: post.status
      }}
      onSubmit={handleUpdate}
    />
  )
}
