import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function FeaturedPostSkeleton() {
  return (
    <Card className='overflow-hidden border-0 bg-transparent shadow-none'>
      <div className='relative aspect-21/9 overflow-hidden rounded-2xl'>
        <Skeleton className='h-full w-full' />
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent' />
        <div className='absolute right-0 bottom-0 left-0 space-y-3 p-6 lg:p-8'>
          <Skeleton className='h-8 w-3/4 bg-white/20' />
          <Skeleton className='h-4 w-2/3 bg-white/20' />
          <div className='flex items-center gap-3 pt-2'>
            <Skeleton className='h-10 w-10 rounded-full bg-white/20' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24 bg-white/20' />
              <Skeleton className='h-3 w-20 bg-white/20' />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function PostCardSkeleton() {
  return (
    <Card className='overflow-hidden border-0 bg-transparent shadow-none'>
      <div className='relative aspect-video overflow-hidden rounded-2xl'>
        <Skeleton className='h-full w-full' />
      </div>

      <CardContent className='p-6'>
        {/* Metadata Skeleton */}
        <div className='mb-4 flex items-center gap-3'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>

        {/* Title Skeleton */}
        <Skeleton className='mb-3 h-8 w-full' />
        <Skeleton className='mb-3 h-8 w-3/4' />

        {/* Excerpt Skeleton */}
        <Skeleton className='mb-2 h-4 w-full' />
        <Skeleton className='mb-2 h-4 w-full' />
        <Skeleton className='mb-4 h-4 w-2/3' />

        {/* Stats Skeleton */}
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-4 w-12' />
        </div>
      </CardContent>
    </Card>
  )
}

export function PostListSkeleton() {
  return (
    <div className='space-y-6'>
      <FeaturedPostSkeleton />
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
