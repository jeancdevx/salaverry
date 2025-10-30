import { getCurrentUser } from '@/lib/dal'

import { createPost } from '@/modules/admin/server/actions'
import { PostForm } from '@/modules/admin/ui/components'

export default async function NewPostPage() {
  const user = await getCurrentUser()

  return <PostForm currentUserId={user.id} onSubmit={createPost} />
}
