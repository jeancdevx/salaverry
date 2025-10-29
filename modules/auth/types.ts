import type { z } from 'zod'

import type { signInSchema, signUpSchema } from './schemas'

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
