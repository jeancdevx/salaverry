import { redirect } from 'next/navigation'

import { isAdmin } from '@/lib/auth-helpers'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userIsAdmin = await isAdmin()

  if (!userIsAdmin) {
    redirect('/')
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Panel de Administración</h1>
        <p className='text-muted-foreground'>Gestiona los posts del blog</p>
      </div>
      {children}
    </div>
  )
}
