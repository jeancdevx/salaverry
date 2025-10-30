import { MessageCircle } from 'lucide-react'

import { hasUserReactedToPost } from '@/modules/posts/server/queries'

import { LikeButton } from './like-button'

interface PostInteractionsProps {
  postId: string
  postSlug: string
  userId: string | undefined
  initialReactionsCount: number
  commentsCount: number
  toggleAction: (formData: FormData) => Promise<void>
}

export async function PostInteractions({
  postId,
  postSlug,
  userId,
  initialReactionsCount,
  commentsCount,
  toggleAction
}: PostInteractionsProps) {
  const hasReacted = userId ? await hasUserReactedToPost(postId, userId) : false
  const isAuthenticated = !!userId

  return (
    <div className='text-muted-foreground mt-6 flex items-center gap-6 text-sm'>
      <LikeButton
        postId={postId}
        postSlug={postSlug}
        initialLiked={hasReacted}
        initialCount={initialReactionsCount}
        toggleAction={toggleAction}
        isAuthenticated={isAuthenticated}
      />
      <div className='flex items-center gap-2'>
        <MessageCircle className='h-5 w-5' />
        <span>{commentsCount} comentarios</span>
      </div>
    </div>
  )
}
