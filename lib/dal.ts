import 'server-only'

import { cache } from 'react'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from './auth'

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) redirect('/sign-in')

  return session
})

export const getCurrentUser = cache(async () => {
  const session = await getSession()

  return session.user
})

export const isAdminUser = cache(async () => {
  const session = await getSession()

  return session.user.role === 'admin'
})
