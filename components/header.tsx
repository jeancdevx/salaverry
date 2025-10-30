import Link from 'next/link'

import { WavesIcon } from 'lucide-react'

import { UserButton } from './user-button'

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link
          href='/'
          className='flex items-center gap-2 transition-opacity hover:opacity-80'
        >
          <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/30 bg-linear-to-br from-teal-500/20 to-cyan-500/20'>
            <WavesIcon className='h-5 w-5 text-teal-400' />
          </div>
          <span className='text-lg font-semibold'>Salaverry</span>
        </Link>

        {children}

        <UserButton />
      </div>
    </header>
  )
}

export { Header }
