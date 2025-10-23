import { GalleryVerticalEnd } from 'lucide-react'

import { CarouselForm } from '@/modules/auth/ui/components/carousel-form'
import { SignUpForm } from '@/modules/auth/ui/components/sign-up-form'

import { Card, CardContent } from '@/components/ui/card'

const SignUpView = () => {
  return (
    <>
      <Card className='bg-card/30 relative z-10 mx-auto max-w-5xl backdrop-blur-3xl'>
        <CardContent className='grid grid-cols-1 items-center gap-4 px-6 md:grid-cols-2 md:gap-8'>
          <div className='relative flex w-full flex-col items-start gap-y-6'>
            <div className='flex w-full flex-col items-center gap-y-3'>
              <GalleryVerticalEnd className='size-8' />
              <h1 className='text-center text-3xl font-bold md:text-4xl'>
                Bienvenido de nuevo!
              </h1>
              <p className='text-muted-foreground/70 text-center text-xs'>
                Ingresa tus credenciales para ingresar a tu cuenta
              </p>
            </div>

            <SignUpForm />
          </div>

          <CarouselForm className='h-[685px]' />
        </CardContent>
      </Card>

      <div className='text-muted-foreground [&_a]:hover:text-primary text-center text-xs font-medium text-balance'>
        <p>Al hacer clic en &quot;Iniciar sesión&quot;, aceptas nuestros</p>
        <p>
          <a href='/terms' target='_blank' rel='noreferrer'>
            Términos de servicio
          </a>{' '}
          y{' '}
          <a href='/privacy' target='_blank' rel='noreferrer'>
            Política de privacidad
          </a>
          .
        </p>
      </div>
    </>
  )
}

export { SignUpView }
