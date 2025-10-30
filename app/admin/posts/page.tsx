import Image from 'next/image'
import Link from 'next/link'

import { Calendar, Edit, Eye, Plus } from 'lucide-react'

import {
  getAllPostsAdmin,
  getPostsCountByStatus
} from '@/modules/admin/server/queries'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default async function AdminPostsPage() {
  const [posts, stats] = await Promise.all([
    getAllPostsAdmin(),
    getPostsCountByStatus()
  ])

  return (
    <div className='mx-auto max-w-7xl space-y-8 p-8'>
      {/* Header limpio */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Posts</h1>
          <p className='text-muted-foreground mt-1'>
            {stats.total} {stats.total === 1 ? 'post' : 'posts'} en total
          </p>
        </div>
        <Button asChild size='lg'>
          <Link href='/admin/posts/new'>
            <Plus className='mr-2 h-5 w-5' />
            Crear Post
          </Link>
        </Button>
      </div>

      {/* Stats compactos */}
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card>
          <CardHeader className='pb-3'>
            <CardDescription>Total</CardDescription>
            <CardTitle className='text-3xl'>{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardDescription>Publicados</CardDescription>
            <CardTitle className='text-3xl text-green-600 dark:text-green-400'>
              {stats.published}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className='pb-3'>
            <CardDescription>Borradores</CardDescription>
            <CardTitle className='text-3xl text-amber-600 dark:text-amber-400'>
              {stats.draft}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Lista de posts */}
      {posts.length === 0 ? (
        <Card className='border-dashed'>
          <CardHeader className='py-16 text-center'>
            <div className='bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
              <Plus className='text-muted-foreground h-8 w-8' />
            </div>
            <CardTitle>No hay posts todavía</CardTitle>
            <CardDescription className='mt-2'>
              Comienza creando tu primer post
            </CardDescription>
            <div className='mt-6'>
              <Button asChild>
                <Link href='/admin/posts/new'>Crear primer post</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map(post => (
            <Card
              key={post.id}
              className='group overflow-hidden transition-all hover:shadow-xl'
            >
              {/* Cover Image */}
              <div className='bg-muted relative aspect-video w-full overflow-hidden'>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                ) : (
                  <div className='flex h-full items-center justify-center'>
                    <span className='text-muted-foreground text-sm'>
                      Sin imagen
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className='absolute top-3 right-3'>
                  <Badge
                    variant={
                      post.status === 'published' ? 'default' : 'secondary'
                    }
                    className='shadow-lg'
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardHeader className='space-y-3'>
                <div className='space-y-2'>
                  <CardTitle className='line-clamp-2 text-xl leading-tight'>
                    {post.title}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className='line-clamp-2 text-sm'>
                      {post.excerpt}
                    </CardDescription>
                  )}
                </div>

                {/* Meta */}
                <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                  <Calendar className='h-3.5 w-3.5' />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* Actions */}
                <div className='flex gap-2 pt-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1'
                    asChild
                  >
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Edit className='mr-2 h-4 w-4' />
                      Editar
                    </Link>
                  </Button>
                  {post.status === 'published' && (
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/posts/${post.slug}`} target='_blank'>
                        <Eye className='h-4 w-4' />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
