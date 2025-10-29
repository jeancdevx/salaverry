import type { PostWithAuthor } from '@/modules/posts/types'

import { PostCard } from './post-card'

interface PostListProps {
  posts: PostWithAuthor[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <h3 className='text-muted-foreground mb-2 text-2xl font-semibold'>
            No hay posts disponibles
          </h3>
          <p className='text-muted-foreground text-sm'>
            Vuelve pronto para ver nuevo contenido
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
