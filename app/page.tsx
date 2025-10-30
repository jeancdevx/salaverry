import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

import { getPublishedPosts } from '@/modules/posts/server/queries'
import type { PostWithAuthor } from '@/modules/posts/types'

import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default async function LandingPage() {
  const recentPosts = await getPublishedPosts(3)

  return (
    <div className='relative min-h-screen'>
      {/* Balanced gradient background */}
      <div className='pointer-events-none fixed inset-0 -z-10'>
        <div className='animate-blob absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-linear-to-br from-teal-500/[0.12] via-cyan-500/[0.08] to-transparent blur-3xl' />
        <div className='animation-delay-2000 animate-blob absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-linear-to-br from-blue-500/[0.10] via-indigo-500/[0.06] to-transparent blur-3xl' />
        <div className='animation-delay-4000 animate-blob absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-linear-to-br from-indigo-500/[0.08] to-transparent blur-3xl' />
        <div className='absolute inset-0 bg-[url(/grid.svg)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-center opacity-[0.03]' />
      </div>

      <Header>
        <Navbar />
      </Header>

      <main>
        {/* Hero Section */}
        <section className='relative px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40'>
          <div className='mx-auto max-w-6xl'>
            <div className='flex flex-col items-center text-center'>
              {/* Badge con más presencia */}
              <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 backdrop-blur-sm'>
                <Sparkles className='h-3.5 w-3.5 text-teal-400' />
                <span className='text-xs font-medium text-teal-300'>
                  Preservando nuestro futuro costero
                </span>
              </div>

              {/* Heading más impactante */}
              <h1 className='mb-6 max-w-4xl'>
                <span className='block text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
                  Playa de
                </span>
                <span className='mt-2 block text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
                  <span className='bg-linear-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent'>
                    Salaverry
                  </span>
                </span>
              </h1>

              {/* Subtitle mejorado */}
              <p className='mb-4 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl'>
                Un espacio digital donde la comunidad comparte{' '}
                <span className='font-semibold text-white'>
                  conocimiento y acciones
                </span>{' '}
                para la conservación de nuestra costa
              </p>

              {/* Stats rápidos */}
              <div className='mb-12 flex flex-wrap items-center justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2 text-white/50'>
                  <Users className='h-4 w-4 text-teal-400' />
                  <span>Comunidad activa</span>
                </div>
                <div className='flex items-center gap-2 text-white/50'>
                  <TrendingUp className='h-4 w-4 text-teal-400' />
                  <span>Contenido actualizado</span>
                </div>
                <div className='flex items-center gap-2 text-white/50'>
                  <Zap className='h-4 w-4 text-teal-400' />
                  <span>Acceso libre</span>
                </div>
              </div>

              {/* CTA Buttons mejorados */}
              <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
                <Button
                  size='lg'
                  className='group h-12 rounded-xl bg-teal-500 px-8 text-base font-semibold shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/40'
                  asChild
                >
                  <Link href='/posts'>
                    Explorar el Blog
                    <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-12 rounded-xl border-white/10 bg-white/5 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:border-teal-500/30 hover:bg-white/10'
                  asChild
                >
                  <Link href='/about'>Sobre el Proyecto</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid con diseño destacado */}
        {recentPosts.length > 0 && (
          <section className='relative px-6 py-20 lg:py-28'>
            <div className='mx-auto max-w-6xl'>
              {/* Header de sección */}
              <div className='mb-14 text-center'>
                <div className='mb-3 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1'>
                  <span className='text-xs font-medium tracking-wider text-teal-300 uppercase'>
                    Últimas Publicaciones
                  </span>
                </div>
                <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                  Historias de{' '}
                  <span className='bg-linear-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent'>
                    nuestra comunidad
                  </span>
                </h2>
                <p className='mx-auto max-w-2xl text-base text-white/60'>
                  Descubre investigaciones y experiencias compartidas por
                  quienes cuidan nuestra costa
                </p>
              </div>

              {/* Grid con featured post */}
              <div className='grid gap-6 md:grid-cols-2 lg:gap-8'>
                {recentPosts.map((post: PostWithAuthor, idx) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className={`group ${idx === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <article className='relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30 hover:bg-white/[0.04]'>
                      {/* Image */}
                      {post.coverImage && (
                        <div
                          className={`relative overflow-hidden ${
                            idx === 0
                              ? 'aspect-[21/9] md:aspect-[21/9]'
                              : 'aspect-[16/10]'
                          }`}
                        >
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className='object-cover transition-transform duration-500 group-hover:scale-105'
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          />
                          {/* Gradient overlay */}
                          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent' />
                        </div>
                      )}

                      {/* Content */}
                      <div
                        className={`${
                          post.coverImage ? 'absolute inset-x-0 bottom-0' : ''
                        } p-6 lg:p-8`}
                      >
                        {/* Meta */}
                        <div className='mb-3 flex items-center gap-3'>
                          <time className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm'>
                            {post.formattedDate}
                          </time>
                        </div>

                        {/* Title */}
                        <h3
                          className={`mb-3 leading-tight font-bold tracking-tight text-white transition-colors group-hover:text-teal-300 ${
                            idx === 0
                              ? 'text-2xl lg:text-3xl'
                              : 'text-xl lg:text-2xl'
                          }`}
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p
                            className={`mb-4 leading-relaxed text-white/60 ${
                              idx === 0
                                ? 'line-clamp-2 text-base'
                                : 'line-clamp-2 text-sm'
                            }`}
                          >
                            {post.excerpt}
                          </p>
                        )}

                        {/* Author */}
                        {!post.isAnonymous && post.author && (
                          <div className='flex items-center gap-3'>
                            <div className='h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-white/10'>
                              {post.author.image ? (
                                <Image
                                  src={post.author.image}
                                  alt={post.author.name || 'Author'}
                                  width={32}
                                  height={32}
                                  className='h-full w-full object-cover'
                                />
                              ) : (
                                <div className='flex h-full w-full items-center justify-center text-xs font-medium text-white/70'>
                                  {post.authorInitials}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className='text-sm font-medium text-white/90'>
                                {post.author.name || 'Anónimo'}
                              </p>
                              {post.coAuthors && post.coAuthors.length > 0 && (
                                <p className='text-xs text-white/50'>
                                  +{post.coAuthors.length} colaborador
                                  {post.coAuthors.length > 1 ? 'es' : ''}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className='mt-12 text-center'>
                <Link
                  href='/posts'
                  className='inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-teal-400'
                >
                  Ver todas las publicaciones
                  <ArrowRight className='h-4 w-4 transition-transform hover:translate-x-0.5' />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section con más diseño */}
        <section className='relative px-6 py-20 lg:py-28'>
          <div className='mx-auto max-w-5xl'>
            <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-12 backdrop-blur-sm lg:p-16'>
              {/* Decorative gradient */}
              <div className='absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl' />
              <div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl' />

              {/* Content */}
              <div className='relative z-10 text-center'>
                <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                  Sé parte del{' '}
                  <span className='bg-linear-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent'>
                    cambio
                  </span>
                </h2>
                <p className='mb-8 text-lg text-white/70'>
                  Únete a nuestra comunidad y contribuye con tus ideas para
                  preservar la playa de Salaverry
                </p>
                <Button
                  size='lg'
                  className='h-12 rounded-xl bg-teal-500 px-10 text-base font-semibold shadow-xl shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-2xl hover:shadow-teal-500/40'
                  asChild
                >
                  <Link href='/sign-up'>
                    Crear Cuenta Gratis
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer mejorado */}
        <footer className='border-t border-white/10 px-6 py-16'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Brand */}
              <div>
                <div className='mb-4 flex items-center gap-2'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/30 bg-linear-to-br from-teal-500/20 to-cyan-500/20'>
                    <svg
                      className='h-5 w-5 text-teal-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                      />
                    </svg>
                  </div>
                  <span className='text-base font-bold'>Salaverry</span>
                </div>
                <p className='text-sm leading-relaxed text-white/50'>
                  Conservando nuestra costa para las futuras generaciones
                </p>
              </div>

              {/* Navigation */}
              <div>
                <p className='mb-4 text-sm font-semibold text-white/80'>
                  Navegación
                </p>
                <ul className='space-y-3 text-sm'>
                  <li>
                    <Link
                      href='/'
                      className='text-white/50 transition-colors hover:text-teal-400'
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/posts'
                      className='text-white/50 transition-colors hover:text-teal-400'
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/about'
                      className='text-white/50 transition-colors hover:text-teal-400'
                    >
                      Nosotros
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <p className='mb-4 text-sm font-semibold text-white/80'>
                  Comunidad
                </p>
                <ul className='space-y-3 text-sm'>
                  <li>
                    <Link
                      href='/sign-up'
                      className='text-white/50 transition-colors hover:text-teal-400'
                    >
                      Crear Cuenta
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sign-in'
                      className='text-white/50 transition-colors hover:text-teal-400'
                    >
                      Iniciar Sesión
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <p className='mb-4 text-sm font-semibold text-white/80'>
                  Legal
                </p>
                <ul className='space-y-3 text-sm text-white/50'>
                  <li>Términos de Uso</li>
                  <li>Política de Privacidad</li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className='border-t border-white/10 pt-8 text-center'>
              <p className='text-sm text-white/50'>
                © {new Date().getFullYear()} Playa de Salaverry · Hecho con ❤️
                para nuestra comunidad
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
