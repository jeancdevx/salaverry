'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { LogOut, Settings, User } from 'lucide-react'

import { authClient } from '@/lib/auth-client'

import { GeneratedAvatar } from './generated-avatar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export const UserButtonSkeleton = () => {
  return (
    <div className='flex w-[107px] items-end justify-end'>
      <Skeleton className='h-10 w-10 rounded-full' />
    </div>
  )
}

export const UserButton = () => {
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        }
      }
    })
  }

  if (isPending) return <UserButtonSkeleton />

  if (!session) {
    return (
      <Link href='/sign-in'>
        <Button variant='ghost'>Iniciar Sesión</Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex w-[107px] items-end justify-end'>
          <Button
            variant='ghost'
            size='icon-lg'
            className='relative h-10 w-10 rounded-full'
          >
            <Avatar>
              {session.user.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name} />
              ) : (
                <GeneratedAvatar
                  seed={session.user.name}
                  variant='botttsNeutral'
                  className='size-10'
                />
              )}
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium capitalize'>
              {session.user.name}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/profile' className='cursor-pointer'>
            <User className='mr-2 h-4 w-4' />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/settings' className='cursor-pointer'>
            <Settings className='mr-2 h-4 w-4' />
            Configuración
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
