import Image from 'next/image'
import Link from 'next/link'

import { Heart, MessageCircle } from 'lucide-react'

import type { PostWithAuthor } from '@/modules/posts/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: PostWithAuthor
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const authorName = post.author.name || 'Anónimo'

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className='group block rounded-md'>
        <Card className='overflow-hidden border-0 bg-transparent shadow-lg backdrop-blur-sm'>
          <div className='relative aspect-21/9 overflow-hidden rounded-md'>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
              sizes='(max-width: 1024px) 100vw, 1200px'
              priority
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent' />

            <CardContent className='absolute right-0 bottom-0 left-0 p-6 md:p-8 lg:p-12'>
              <div className='mb-4 flex items-center gap-3'>
                <Avatar className='h-10 w-10 border-2 border-white/20 md:h-12 md:w-12'>
                  {post.author.image ? (
                    <AvatarImage src={post.author.image} alt={authorName} />
                  ) : null}
                  <AvatarFallback className='text-sm'>
                    {post.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='font-medium text-white'>{authorName}</span>
                  <span className='text-sm text-white/80'>
                    {post.formattedDate}
                  </span>
                </div>
              </div>

              <h2 className='mb-4 line-clamp-2 text-3xl leading-tight font-bold tracking-tight text-white transition-colors group-hover:text-teal-300 md:text-4xl lg:text-5xl'>
                {post.title}
              </h2>

              {post.excerpt && (
                <p className='mb-6 line-clamp-2 text-base leading-relaxed text-white/90 md:text-lg lg:line-clamp-3'>
                  {post.excerpt}
                </p>
              )}

              <div className='flex items-center gap-6 text-white/80'>
                <div className='flex items-center gap-2'>
                  <Heart className='h-5 w-5' />
                  <span className='font-medium'>
                    {post._count?.reactions ?? 0}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <MessageCircle className='h-5 w-5' />
                  <span className='font-medium'>
                    {post._count?.comments ?? 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Card className='group overflow-hidden border-0 bg-transparent shadow-none'>
      <Link href={`/posts/${post.slug}`}>
        <div className='relative aspect-video overflow-hidden rounded-md'>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </Link>

      <CardContent className='p-2'>
        <div className='mb-4 flex items-center gap-3'>
          <Avatar className='border-border size-10 border-2'>
            {post.author.image ? (
              <AvatarImage src={post.author.image} alt={authorName} />
            ) : null}
            <AvatarFallback className='text-xs'>
              {post.authorInitials}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-foreground text-sm font-medium'>
              {authorName}
            </span>
            <span className='text-muted-foreground text-xs'>
              {post.formattedDate}
            </span>
          </div>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <h3 className='hover:text-primary mb-3 line-clamp-2 text-2xl leading-tight font-bold tracking-tight transition-colors'>
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className='text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed'>
            {post.excerpt}
          </p>
        )}

        <div className='text-muted-foreground flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1.5'>
            <Heart className='h-4 w-4' />
            <span>{post._count?.reactions ?? 0}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <MessageCircle className='h-4 w-4' />
            <span>{post._count?.comments ?? 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
