'use client'

import { useOptimistic } from 'react'

import Link from 'next/link'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface LikeButtonProps {
  postId: string
  postSlug: string
  initialLiked: boolean
  initialCount: number
  toggleAction: (formData: FormData) => Promise<void>
  isAuthenticated: boolean
}

export function LikeButton({
  postId,
  postSlug,
  initialLiked,
  initialCount,
  toggleAction,
  isAuthenticated
}: LikeButtonProps) {
  const [optimisticState, addOptimistic] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    state => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1
    })
  )

  // Si no está autenticado, mostrar botón que lleva a login
  if (!isAuthenticated) {
    return (
      <Link href='/sign-in'>
        <Button variant='ghost' size='sm' className='gap-2'>
          <Heart className='text-muted-foreground size-5' />
          <span className='text-muted-foreground'>{initialCount}</span>
        </Button>
      </Link>
    )
  }

  return (
    <form
      action={async formData => {
        addOptimistic(null)
        await toggleAction(formData)
      }}
    >
      <input type='hidden' name='postId' value={postId} />
      <input type='hidden' name='postSlug' value={postSlug} />
      <Button type='submit' variant='ghost' size='sm' className='gap-2'>
        <Heart
          className={`size-5 transition-colors ${
            optimisticState.liked
              ? 'fill-red-500 text-red-500'
              : 'text-muted-foreground'
          }`}
        />
        <span
          className={
            optimisticState.liked ? 'text-foreground' : 'text-muted-foreground'
          }
        >
          {optimisticState.count}
        </span>
      </Button>
    </form>
  )
}
