import { WavesIcon } from 'lucide-react'

import { UserButton } from './user-button'

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='sticky top-2 z-50 h-12 bg-transparent'>
      <div className='mx-auto flex h-full max-w-5xl items-center justify-between rounded-full bg-black/20 px-4 backdrop-blur-3xl'>
        <div className='flex items-center gap-2'>
          <WavesIcon className='text-teal-600' />
          <span className='font-semibold'>Salaverry</span>
        </div>

        {children}

        <UserButton />
      </div>
    </header>
  )
}

export { Header }
