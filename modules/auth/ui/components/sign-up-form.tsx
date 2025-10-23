'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OctagonAlertIcon } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authClient } from '@/lib/auth-client'

import { SignUpData, signUpSchema } from '@/modules/auth/schemas'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

const SignUpForm = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      last_name: '',
      username: ''
    }
  })

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true)
    setErrorMessage(null)

    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        last_name: data.last_name,
        username: data.username,
        callbackURL: '/posts'
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          router.push('/posts')
        },
        onError: ctx => {
          setIsLoading(false)
          setErrorMessage(ctx.error.message)
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        {errorMessage && (
          <Alert
            variant='destructive'
            className='bg-destructive/10 flex items-center gap-x-4 border-none text-sm'
          >
            <div className='flex'>
              <OctagonAlertIcon className='size-4' />
            </div>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    type='text'
                    placeholder='Nombre'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    type='text'
                    placeholder='Apellido'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type='text'
                  placeholder='Nombre de usuario'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type='email'
                  placeholder='croniq@developer.com'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  type='password'
                  placeholder='Contraseña'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full bg-teal-900 hover:bg-teal-900/80'
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </Button>

        <div className='after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-card text-muted-foreground relative z-10 px-2'>
            O continuar con
          </span>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant='outline'
            type='button'
            disabled={isLoading}
            onClick={() => {}}
          >
            <Image src='/google.svg' alt='Google Logo' width={16} height={16} />
            <span className='font-semibold'>Google</span>
          </Button>
          <Button
            variant='outline'
            type='button'
            disabled={isLoading}
            onClick={() => {}}
          >
            <Image src='/github.svg' alt='GitHub Logo' width={16} height={16} />
            <span className='font-semibold'>GitHub</span>
          </Button>
        </div>

        <div className='text-muted-foreground text-center text-xs'>
          ¿Ya tienes una cuenta?{' '}
          <Link href='/sign-in' className='font-semibold text-teal-600'>
            Iniciar sesión
          </Link>
        </div>
      </form>
    </Form>
  )
}

export { SignUpForm }
