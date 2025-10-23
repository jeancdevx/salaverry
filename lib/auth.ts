import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'

import { db } from '@/db'
import * as schema from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      last_name: {
        type: 'string',
        required: true,
        input: true
      }
    }
  },
  plugins: [username()]
})
