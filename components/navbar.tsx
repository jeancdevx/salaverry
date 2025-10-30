'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type NavLink = {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/posts', label: 'Blog' },
  { href: '/about', label: 'Nosotros' }
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='hidden flex-1 items-center justify-center gap-x-8 text-sm md:flex'>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'relative font-medium transition-colors',
            pathname === link.href
              ? 'text-teal-500'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {link.label}
          {pathname === link.href && (
            <span className='absolute -bottom-[22px] left-0 h-0.5 w-full bg-teal-500' />
          )}
        </Link>
      ))}
    </nav>
  )
}

export { Navbar }
