import { getPublishedPosts } from '@/modules/posts/server/queries'
import { PostList } from '@/modules/posts/ui/components'

export default async function PostsPage() {
  const posts = await getPublishedPosts()

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Header */}
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Blog Playa de Salaverry
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
          Descubre el estado actual de nuestra playa, consejos de conservación y
          noticias sobre el cuidado del medio ambiente marino
        </p>
      </div>

      {/* Posts Grid */}
      <PostList posts={posts} />
    </div>
  )
}
