'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ArrowLeft, Loader2 } from 'lucide-react'

import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import type { CreatePostInput } from '../../schemas'
import { AuthorMultiSelect } from './author-multi-select'
import { ImageUpload } from './image-upload'

interface PostFormProps {
  initialData?: Partial<CreatePostInput>
  postId?: string
  currentUserId?: string
  onSubmit: (
    data: CreatePostInput
  ) => Promise<{ success: boolean; error?: string }>
}

export function PostForm({
  initialData,
  postId,
  currentUserId,
  onSubmit
}: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<CreatePostInput>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    isAnonymous: initialData?.isAnonymous || false,
    coAuthors: initialData?.coAuthors || [],
    status: initialData?.status || 'draft'
  })

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !postId ? generateSlug(title) : prev.slug
    }))
  }

  async function handleSubmit(status: 'draft' | 'published') {
    setIsSubmitting(true)

    try {
      const dataToSubmit = { ...formData, status }
      const result = await onSubmit(dataToSubmit)

      if (result.success) {
        toast.success(
          status === 'published'
            ? 'Post publicado exitosamente'
            : 'Borrador guardado'
        )
        router.push('/admin/posts')
        router.refresh()
      } else {
        toast.error(result.error || 'Error al guardar el post')
      }
    } catch {
      toast.error('Error inesperado al guardar el post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.title.trim() !== '' &&
    formData.content.trim() !== '' &&
    (formData.excerpt?.trim() || '') !== '' &&
    formData.coverImage.trim() !== ''

  return (
    <div className='bg-background min-h-screen'>
      {/* Sticky Header - Minimalista */}
      <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
        <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-6'>
          <div className='flex items-center gap-3'>
            <Link href='/admin/posts'>
              <Button variant='ghost' size='icon' className='h-9 w-9'>
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </Link>
            {formData.status === 'draft' && (
              <Badge variant='outline' className='text-xs'>
                Borrador
              </Badge>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting || !isFormValid}
            >
              Guardar borrador
            </Button>
            <Button
              type='button'
              size='sm'
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              {postId ? 'Actualizar' : 'Publicar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Centrado y limpio */}
      <div className='mx-auto max-w-3xl px-6 pt-16 pb-32'>
        <div className='space-y-16'>
          {/* Título - Grande y sin distracciones */}
          <div className='space-y-2'>
            <textarea
              value={formData.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder='Título del post'
              className='placeholder:text-muted-foreground/30 w-full resize-none border-0 bg-transparent p-0 text-5xl leading-tight font-bold focus:ring-0 focus:outline-none'
              rows={2}
              maxLength={200}
            />
            {formData.title && (
              <p className='text-muted-foreground text-xs'>
                {formData.title.length} / 200
              </p>
            )}
          </div>

          {/* Cover Image - Prominente */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm font-medium'>Imagen de portada</h3>
              {!formData.coverImage && (
                <Badge variant='destructive' className='text-xs'>
                  Requerida
                </Badge>
              )}
            </div>
            <ImageUpload
              value={formData.coverImage}
              onChange={url =>
                setFormData(prev => ({ ...prev, coverImage: url }))
              }
              onRemove={() =>
                setFormData(prev => ({ ...prev, coverImage: '' }))
              }
            />
          </div>

          {/* Slug - Discreto */}
          <div className='space-y-3'>
            <Label htmlFor='slug' className='text-sm font-medium'>
              URL
            </Label>
            <div className='bg-muted/30 flex items-center gap-1 rounded-md border px-3 py-2 text-sm'>
              <span className='text-muted-foreground'>/posts/</span>
              <input
                id='slug'
                type='text'
                value={formData.slug}
                onChange={e =>
                  setFormData(prev => ({ ...prev, slug: e.target.value }))
                }
                placeholder='url-del-post'
                className='flex-1 border-0 bg-transparent p-0 focus:ring-0 focus:outline-none'
                maxLength={200}
              />
            </div>
          </div>

          {/* Publicación Anónima */}
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <Label htmlFor='anonymous' className='text-sm font-medium'>
                Publicar como anónimo
              </Label>
              <p className='text-muted-foreground text-xs'>
                Tu nombre no aparecerá como autor del post
              </p>
            </div>
            <Switch
              id='anonymous'
              checked={formData.isAnonymous}
              onCheckedChange={checked =>
                setFormData(prev => ({ ...prev, isAnonymous: checked }))
              }
            />
          </div>

          {/* Co-autores */}
          <div className='space-y-3 rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <Label className='text-sm font-medium'>Co-autores</Label>
              <p className='text-muted-foreground text-xs'>
                Añade colaboradores que contribuyeron a este post
              </p>
            </div>
            <AuthorMultiSelect
              value={formData.coAuthors || []}
              onChange={coAuthors =>
                setFormData(prev => ({ ...prev, coAuthors }))
              }
              currentUserId={currentUserId}
            />
          </div>

          {/* Excerpt */}
          <div className='space-y-3'>
            <Label htmlFor='excerpt' className='text-sm font-medium'>
              Extracto
            </Label>
            <Textarea
              id='excerpt'
              value={formData.excerpt}
              onChange={e =>
                setFormData(prev => ({ ...prev, excerpt: e.target.value }))
              }
              placeholder='Una descripción breve que aparecerá en las previsualizaciones...'
              className='min-h-[100px] resize-none text-base'
              maxLength={500}
            />
            <p className='text-muted-foreground text-xs'>
              {formData.excerpt?.length || 0} / 500
            </p>
          </div>

          {/* Content - El protagonista */}
          <div className='space-y-3'>
            <Label htmlFor='content' className='text-sm font-medium'>
              Contenido
            </Label>
            <Textarea
              id='content'
              value={formData.content}
              onChange={e =>
                setFormData(prev => ({ ...prev, content: e.target.value }))
              }
              placeholder='Escribe tu historia...

Puedes usar Markdown:
**negrita** *cursiva* 
# Título
## Subtítulo
- Lista
[enlace](url)'
              className='min-h-[500px] resize-y font-serif text-lg leading-relaxed'
            />
            <p className='text-muted-foreground text-xs'>
              Soporta Markdown para formato
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
