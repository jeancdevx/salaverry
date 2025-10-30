import 'server-only'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { user } from '@/db/schema'

/**
 * Get all admin users for author selection
 */
export async function getAllUsers() {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      username: user.username
    })
    .from(user)
    .where(eq(user.role, 'admin'))

  return users
}
