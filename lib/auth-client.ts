import {
  adminClient,
  inferAdditionalFields,
  usernameClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import type { auth } from './auth'
import { ac, admin, user } from './permissions'

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      roles: {
        admin,
        user
      }
    })
  ]
})
