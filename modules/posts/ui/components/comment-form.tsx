'use client'

import { useOptimistic, useRef } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface CommentFormProps {
  postId: string
  postSlug: string
  createAction: (formData: FormData) => Promise<{ success: boolean }>
  placeholder?: string
}

export function CommentForm({
  postId,
  postSlug,
  createAction,
  placeholder = 'Escribe tu comentario...'
}: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [optimisticSubmitting, setOptimisticSubmitting] = useOptimistic(false)

  async function handleSubmit(formData: FormData) {
    setOptimisticSubmitting(true)
    await createAction(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={handleSubmit} className='space-y-4'>
      <input type='hidden' name='postId' value={postId} />
      <input type='hidden' name='postSlug' value={postSlug} />
      <Textarea
        name='content'
        placeholder={placeholder}
        required
        minLength={1}
        maxLength={500}
        rows={3}
        disabled={optimisticSubmitting}
        className='resize-none'
      />
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground text-xs'>Máximo 500 caracteres</p>
        <Button type='submit' disabled={optimisticSubmitting}>
          {optimisticSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Enviando...
            </>
          ) : (
            'Comentar'
          )}
        </Button>
      </div>
    </form>
  )
}
