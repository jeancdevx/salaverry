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

  const [featuredPost, ...remainingPosts] = posts

  return (
    <div className='space-y-8'>
      {featuredPost && (
        <div className='mb-12'>
          <PostCard post={featuredPost} featured />
        </div>
      )}

      {remainingPosts.length > 0 && (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {remainingPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
