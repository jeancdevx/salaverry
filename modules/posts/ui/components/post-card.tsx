import Image from 'next/image'
import Link from 'next/link'

import { Heart, MessageCircle } from 'lucide-react'

import type { PostWithAuthor } from '@/modules/posts/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: PostWithAuthor
}

export function PostCard({ post }: PostCardProps) {
  const authorName = post.author.name || 'Anónimo'

  return (
    <Card className='group overflow-hidden border-0 bg-transparent shadow-none transition-all hover:scale-[1.02]'>
      <Link href={`/posts/${post.slug}`}>
        <div className='relative aspect-video overflow-hidden rounded-2xl'>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>
      </Link>

      <CardContent className='p-6'>
        {/* Metadata */}
        <div className='mb-4 flex items-center gap-3'>
          <Avatar className='border-border h-8 w-8 border-2'>
            <AvatarImage
              src={post.author.image ?? undefined}
              alt={authorName}
            />
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

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className='hover:text-primary mb-3 line-clamp-2 text-2xl leading-tight font-bold tracking-tight transition-colors'>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className='text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed'>
            {post.excerpt}
          </p>
        )}

        {/* Stats */}
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
