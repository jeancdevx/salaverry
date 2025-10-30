import 'server-only'

import { getCurrentUser, getCurrentUserOptional } from './dal'

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUserOptional()
  return user?.role === 'admin'
}

/**
 * Require admin role or throw error
 */
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (user.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }

  return user
}

/**
 * Check if user can edit a post (author or admin)
 */
export async function canEditPost(postAuthorId: string): Promise<boolean> {
  const user = await getCurrentUserOptional()

  if (!user) return false
  if (user.role === 'admin') return true
  if (user.id === postAuthorId) return true

  return false
}
