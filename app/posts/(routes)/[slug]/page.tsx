import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Heart, MessageCircle } from 'lucide-react'

import { getCurrentUserOptional } from '@/lib/dal'

import {
  createComment,
  deleteComment,
  toggleReaction,
  updateComment
} from '@/modules/posts/server/actions'
import { getPostBySlug, getPostComments } from '@/modules/posts/server/queries'
import { CommentsList, PostInteractions } from '@/modules/posts/ui/components'

import { MarkdownContent } from '@/components/markdown-content'
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
  const postSlug = post.slug

  async function handleToggleLike(formData: FormData) {
    'use server'

    const postId = formData.get('postId') as string
    const slug = formData.get('postSlug') as string
    await toggleReaction(postId, slug)
  }

  async function handleCreateComment(formData: FormData) {
    'use server'

    const content = formData.get('content') as string
    const postId = formData.get('postId') as string
    const slug = formData.get('postSlug') as string

    return await createComment({ content, postId, postSlug: slug })
  }

  async function handleUpdateComment(commentId: string, content: string) {
    'use server'

    await updateComment(commentId, content, postSlug)
  }

  async function handleDeleteComment(commentId: string) {
    'use server'

    await deleteComment(commentId, postSlug)
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
          {/* Authors Section */}
          <div className='flex items-center'>
            {post.isAnonymous ? (
              <Avatar className='border-border h-12 w-12 border-2'>
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
            ) : (
              <div className='flex items-center -space-x-3'>
                {/* Primary Author */}
                <Avatar className='border-background ring-background h-12 w-12 border-2 ring-2'>
                  {post.author?.image ? (
                    <>
                      <AvatarImage src={post.author.image} alt={authorName} />
                      <AvatarFallback>{post.authorInitials}</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>{post.authorInitials}</AvatarFallback>
                  )}
                </Avatar>

                {/* Co-Authors */}
                {post.coAuthors &&
                  post.coAuthors.slice(0, 3).map(coAuthor => {
                    const coAuthorName =
                      coAuthor.name || coAuthor.username || 'Anónimo'
                    const coAuthorInitials = coAuthor.name
                      ? coAuthor.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                      : coAuthor.username
                        ? coAuthor.username.slice(0, 2).toUpperCase()
                        : 'CO'

                    return (
                      <Avatar
                        key={coAuthor.id}
                        className='border-background ring-background h-12 w-12 border-2 ring-2'
                      >
                        {coAuthor.image ? (
                          <>
                            <AvatarImage
                              src={coAuthor.image}
                              alt={coAuthorName}
                            />
                            <AvatarFallback>{coAuthorInitials}</AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback>{coAuthorInitials}</AvatarFallback>
                        )}
                      </Avatar>
                    )
                  })}

                {/* Show +N if there are more than 3 co-authors */}
                {post.coAuthors && post.coAuthors.length > 3 && (
                  <Avatar className='border-background ring-background h-12 w-12 border-2 ring-2'>
                    <AvatarFallback className='bg-muted text-muted-foreground text-xs'>
                      +{post.coAuthors.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>

          <div>
            <p className='text-foreground font-medium'>
              {post.isAnonymous ? (
                'Anónimo'
              ) : (
                <>
                  {authorName}
                  {post.coAuthors && post.coAuthors.length > 0 && (
                    <>
                      <span className='text-muted-foreground font-normal'>
                        {' '}
                        y{' '}
                      </span>
                      {post.coAuthors.length === 1 ? (
                        <span>
                          {post.coAuthors[0].name ||
                            post.coAuthors[0].username ||
                            'Anónimo'}
                        </span>
                      ) : (
                        <span className='text-muted-foreground font-normal'>
                          {post.coAuthors.length} colaboradores
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </p>
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
        <MarkdownContent content={post.content} />
      </div>

      <Separator className='my-12' />

      <CommentsList
        comments={comments}
        postId={post.id}
        postSlug={post.slug}
        currentUserId={currentUser?.id}
        createAction={handleCreateComment}
        updateAction={handleUpdateComment}
        deleteAction={handleDeleteComment}
      />
    </article>
  )
}
