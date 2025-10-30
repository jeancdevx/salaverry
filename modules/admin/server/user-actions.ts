'use server'

import { getAllUsers as getAllUsersQuery } from './user-queries'

/**
 * Get all users - Server Action wrapper
 */
export async function getAllUsersAction() {
  return await getAllUsersQuery()
}
