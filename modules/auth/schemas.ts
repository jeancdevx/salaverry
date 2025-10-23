import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('Ingrese un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña debe tener al menos 1 carácter')
})

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1, 'El nombre debe tener al menos 1 carácter'),
  last_name: z.string().min(1, 'El apellido debe tener al menos 1 carácter'),
  username: z
    .string()
    .min(1, 'El nombre de usuario debe tener al menos 1 carácter')
})

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
