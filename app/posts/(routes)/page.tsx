import { getCurrentUser } from '@/lib/dal'

import { UserButton } from '@/components/user-button'

export default async function Page() {
  const user = await getCurrentUser()

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <h1>Hello {user.username}</h1>

      <UserButton />
    </div>
  )
}
