import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Heart, MessageCircle } from 'lucide-react'

import { getCurrentUser } from '@/lib/dal'

import {
  getPostBySlug,
  getPostComments,
  hasUserReactedToPost
} from '@/modules/posts/server/queries'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface PostDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Obtener usuario actual (si está autenticado)
  let currentUser = null
  let hasReacted = false

  try {
    currentUser = await getCurrentUser()
    if (currentUser) {
      hasReacted = await hasUserReactedToPost(post.id, currentUser.id)
    }
  } catch {
    // Usuario no autenticado
  }

  const comments = await getPostComments(post.id)
  const authorName = post.author.name || 'Anónimo'

  return (
    <article className='mx-auto max-w-4xl px-4 py-12'>
      {/* Cover Image */}
      <div className='relative mb-8 aspect-video overflow-hidden rounded-3xl'>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className='object-cover'
          sizes='(max-width: 1200px) 100vw, 1200px'
        />
      </div>

      {/* Header */}
      <header className='mb-8'>
        <h1 className='mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl'>
          {post.title}
        </h1>

        {/* Author Info */}
        <div className='flex items-center gap-4'>
          <Avatar className='border-border h-12 w-12 border-2'>
            <AvatarImage
              src={post.author.image ?? undefined}
              alt={authorName}
            />
            <AvatarFallback>{post.authorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-foreground font-medium'>{authorName}</p>
            <p className='text-muted-foreground text-sm'>
              {post.formattedDate}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className='text-muted-foreground mt-6 flex items-center gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <Heart
              className={`h-5 w-5 ${hasReacted ? 'fill-red-500 text-red-500' : ''}`}
            />
            <span>{post._count?.reactions ?? 0} reacciones</span>
          </div>
          <div className='flex items-center gap-2'>
            <MessageCircle className='h-5 w-5' />
            <span>{post._count?.comments ?? 0} comentarios</span>
          </div>
        </div>
      </header>

      <Separator className='my-8' />

      {/* Content */}
      <div className='prose prose-lg dark:prose-invert mx-auto max-w-none'>
        <div className='text-foreground leading-relaxed whitespace-pre-wrap'>
          {post.content}
        </div>
      </div>

      <Separator className='my-12' />

      {/* Comments Section */}
      <section className='mt-12'>
        <h2 className='mb-6 text-2xl font-bold'>
          Comentarios ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className='text-muted-foreground py-8 text-center'>
            Aún no hay comentarios. ¡Sé el primero en comentar!
          </p>
        ) : (
          <div className='space-y-6'>
            {comments.map(comment => (
              <div key={comment.id} className='flex gap-4'>
                <Avatar className='border-border h-10 w-10 border-2'>
                  <AvatarImage
                    src={comment.author.image ?? undefined}
                    alt={comment.author.name || 'Anónimo'}
                  />
                  <AvatarFallback className='text-xs'>
                    {comment.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='bg-muted/50 rounded-2xl p-4'>
                    <p className='mb-1 text-sm font-medium'>
                      {comment.author.name || 'Anónimo'}
                    </p>
                    <p className='text-foreground'>{comment.content}</p>
                  </div>
                  <p className='text-muted-foreground mt-2 ml-4 text-xs'>
                    {comment.formattedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  )
}
