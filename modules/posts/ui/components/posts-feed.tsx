import { getPublishedPosts } from '@/modules/posts/server/queries'

import { PostList } from './post-list'

export async function PostsFeed() {
  const posts = await getPublishedPosts()

  return <PostList posts={posts} />
}
