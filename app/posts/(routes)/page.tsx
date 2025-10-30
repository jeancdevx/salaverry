import { Suspense } from 'react'

import Link from 'next/link'

import { PostListSkeleton, PostsFeed } from '@/modules/posts/ui/components'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// Configurar ISR con revalidación
export const revalidate = 60 // Revalidar cada 60 segundos

export default async function PostsPage() {
  return (
    <div className='container mx-auto px-4 py-12'>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Blog Playa de Salaverry
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
          Descubre el estado actual de nuestra playa, consejos de conservación y
          noticias sobre el cuidado del medio ambiente marino
        </p>
      </div>

      <Suspense fallback={<PostListSkeleton />}>
        <PostsFeed />
      </Suspense>
    </div>
  )
}
