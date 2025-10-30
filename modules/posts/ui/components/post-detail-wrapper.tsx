'use client'

import { ViewTransition } from 'react'
import type { ReactNode } from 'react'

interface PostDetailWrapperProps {
  children: ReactNode
}

export function PostDetailWrapper({ children }: PostDetailWrapperProps) {
  return (
    <ViewTransition enter='fade' exit='fade'>
      {children}
    </ViewTransition>
  )
}
