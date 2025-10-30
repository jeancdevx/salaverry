'use client'

import * as React from 'react'

import Image from 'next/image'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
}

interface AvatarImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'width' | 'height'> {
  src: string
  alt: string
}

function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={96}
      height={96}
      className={cn('aspect-square size-full object-cover', className)}
      unoptimized={false}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
