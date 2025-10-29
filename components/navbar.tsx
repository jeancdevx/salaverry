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
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'Sobre Nosotros' }
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='hidden flex-1 items-center justify-center gap-x-6 text-sm md:flex'>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-muted-foreground hover:text-foreground font-medium transition-colors',
            pathname === link.href && 'text-teal-600 dark:text-teal-400'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export { Navbar }
