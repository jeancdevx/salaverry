import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

interface PostsLayoutProps {
  children: React.ReactNode
}

export default function PostsLayout({ children }: PostsLayoutProps) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>

      <main className='mx-auto -mt-12 min-h-svh max-w-6xl px-4 py-6 pt-16 md:px-6'>
        {children}
      </main>
    </>
  )
}
