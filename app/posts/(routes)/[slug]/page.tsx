import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Heart, MessageCircle } from 'lucide-react'

import { getCurrentUserOptional } from '@/lib/dal'

import { toggleReaction } from '@/modules/posts/server/actions'
import { getPostBySlug, getPostComments } from '@/modules/posts/server/queries'
import { PostInteractions } from '@/modules/posts/ui/components'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

interface PostDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// Configurar para generación estática con revalidación
export const revalidate = 60 // Revalidar cada 60 segundos

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const currentUser = await getCurrentUserOptional()

  async function handleToggleLike(formData: FormData) {
    'use server'

    const postId = formData.get('postId') as string
    const postSlug = formData.get('postSlug') as string
    await toggleReaction(postId, postSlug)
  }

  const comments = await getPostComments(post.id)
  const authorName = post.author.name || 'Anónimo'

  return (
    <article className='mx-auto max-w-4xl px-4 py-12'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/posts'>Blog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

      <header className='mb-8'>
        <h1 className='mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl'>
          {post.title}
        </h1>

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

        <Suspense
          fallback={
            <div className='text-muted-foreground mt-6 flex items-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <Heart className='h-5 w-5' />
                <span>{post._count?.reactions ?? 0}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MessageCircle className='h-5 w-5' />
                <span>{post._count?.comments ?? 0} comentarios</span>
              </div>
            </div>
          }
        >
          <PostInteractions
            postId={post.id}
            postSlug={post.slug}
            userId={currentUser?.id}
            initialReactionsCount={post._count?.reactions ?? 0}
            commentsCount={post._count?.comments ?? 0}
            toggleAction={handleToggleLike}
          />
        </Suspense>
      </header>

      <Separator className='my-8' />

      <div className='prose prose-lg dark:prose-invert mx-auto max-w-none'>
        <div className='text-foreground leading-relaxed whitespace-pre-wrap'>
          {post.content}
        </div>
      </div>

      <Separator className='my-12' />

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
