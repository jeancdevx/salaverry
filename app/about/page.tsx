import Link from 'next/link'

import { Heart, Shield, Sparkles, Users, Waves } from 'lucide-react'

import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const values = [
    {
      icon: Waves,
      title: 'Conservación',
      description:
        'Proteger y preservar el ecosistema marino y costero de Salaverry para las futuras generaciones.',
      color: 'teal'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description:
        'Fomentar la participación activa de todos los miembros de la comunidad en la toma de decisiones.',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Compromiso',
      description:
        'Dedicación constante al cuidado y mejora del estado de nuestra playa.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Responsabilidad',
      description:
        'Actuar de manera responsable y consciente en todas nuestras acciones relacionadas con el medio ambiente.',
      color: 'green'
    }
  ]

  return (
    <div className='relative min-h-screen'>
      {/* Animated Background */}
      <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
        <div className='absolute -top-1/2 left-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-linear-to-r from-teal-500/10 via-transparent to-blue-500/10 blur-3xl' />
        <div className='absolute right-1/4 -bottom-1/2 h-[800px] w-[800px] animate-pulse rounded-full bg-linear-to-r from-blue-500/10 via-transparent to-purple-500/10 blur-3xl [animation-delay:2s]' />
        <div className='absolute inset-0 bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-20' />
      </div>

      <Header>
        <Navbar />
      </Header>

      <main>
        {/* Hero */}
        <section className='px-4 pt-20 pb-24 sm:pt-32'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm'>
              <Sparkles className='h-4 w-4 text-teal-400' />
              <span className='text-sm font-medium'>Nuestra Historia</span>
            </div>

            <h1 className='mb-8 text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl'>
              Sobre{' '}
              <span className='bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent'>
                Nosotros
              </span>
            </h1>

            <p className='text-muted-foreground mx-auto max-w-3xl text-lg lg:text-xl'>
              Somos una comunidad comprometida con la conservación y protección
              de la Playa de Salaverry, Trujillo, Perú
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className='px-4 py-24'>
          <div className='mx-auto max-w-4xl'>
            <div className='relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl lg:p-16'>
              <div className='absolute -top-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl' />

              <div className='relative z-10'>
                <h2 className='mb-6 text-3xl font-bold lg:text-4xl'>
                  Nuestra Misión
                </h2>
                <div className='text-muted-foreground space-y-6 text-lg'>
                  <p>
                    Este blog nace de la necesidad de crear un espacio donde la
                    comunidad pueda informarse, educarse y participar
                    activamente en la conservación de nuestra playa.
                  </p>
                  <p>
                    A través del intercambio de conocimientos, experiencias y
                    buenas prácticas, buscamos generar conciencia ambiental y
                    fomentar acciones concretas que contribuyan a la
                    preservación de este valioso ecosistema costero.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className='px-4 py-24'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-16 text-center'>
              <h2 className='mb-4 text-4xl font-bold lg:text-5xl'>
                Nuestros{' '}
                <span className='bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent'>
                  Valores
                </span>
              </h2>
              <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
                Los principios que guían nuestro trabajo y compromiso
              </p>
            </div>

            <div className='grid gap-6 sm:grid-cols-2'>
              {values.map(value => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10'
                  >
                    <div
                      className={`bg-${value.color}-500/10 mb-6 inline-block rounded-2xl p-4`}
                    >
                      <Icon className={`h-8 w-8 text-${value.color}-400`} />
                    </div>
                    <h3 className='mb-4 text-2xl font-bold'>{value.title}</h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='px-4 py-24'>
          <div className='mx-auto max-w-4xl'>
            <div className='relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-teal-500/10 via-blue-500/5 to-purple-500/10 p-12 text-center backdrop-blur-xl lg:p-16'>
              <div className='absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl' />
              <div className='absolute -top-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl' />

              <div className='relative z-10'>
                <h2 className='mb-6 text-3xl font-bold lg:text-4xl'>
                  Únete a la comunidad
                </h2>
                <p className='text-muted-foreground mb-8 text-lg lg:text-xl'>
                  Sé parte del cambio y contribuye con tus ideas y acciones
                </p>
                <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                  <Button
                    size='lg'
                    className='h-14 gap-2 rounded-full px-10 text-base font-semibold shadow-lg shadow-teal-500/25'
                    asChild
                  >
                    <Link href='/sign-up'>Crear Cuenta</Link>
                  </Button>
                  <Button
                    size='lg'
                    variant='outline'
                    className='h-14 rounded-full border-white/10 bg-white/5 px-10 text-base font-semibold backdrop-blur-sm hover:bg-white/10'
                    asChild
                  >
                    <Link href='/posts'>Ver Posts</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='border-t border-white/5 px-4 py-12'>
          <div className='mx-auto max-w-7xl text-center'>
            <p className='text-muted-foreground text-sm'>
              © {new Date().getFullYear()} Playa de Salaverry · Hecho con ❤️
              para nuestra comunidad
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
