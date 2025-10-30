'use client'

import { useCallback, useState } from 'react'

import Image from 'next/image'

import { ImagePlus, Loader2, X } from 'lucide-react'

import { useDropzone } from 'react-dropzone'

import { uploadImage } from '@/lib/supabase'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setIsUploading(true)
      setError(null)

      const file = acceptedFiles[0]

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no puede superar los 5MB')
        setIsUploading(false)
        return
      }

      const result = await uploadImage(file)

      if (result.error) {
        setError(result.error)
      } else {
        onChange(result.url)
      }

      setIsUploading(false)
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  if (value) {
    return (
      <div className='group relative aspect-video w-full overflow-hidden rounded-2xl border-2 shadow-lg transition-all hover:shadow-2xl'>
        <Image
          src={value}
          alt='Cover image'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/50' />
        <Button
          type='button'
          variant='destructive'
          size='icon'
          className='absolute top-4 right-4 opacity-0 shadow-xl transition-opacity group-hover:opacity-100'
          onClick={onRemove}
        >
          <X className='h-4 w-4' />
        </Button>
        <div className='absolute bottom-4 left-4 opacity-0 transition-opacity group-hover:opacity-100'>
          <Badge variant='secondary' className='shadow-lg'>
            Haz clic en ✕ para cambiar la imagen
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
          isDragActive
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-muted-foreground/25 bg-muted/10 hover:border-primary/50 hover:bg-muted/20'
        } ${isUploading ? 'cursor-not-allowed opacity-60' : ''} `}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <Loader2 className='text-primary h-16 w-16 animate-spin' />
              <div className='bg-primary/10 absolute inset-0 -z-10 animate-ping rounded-full' />
            </div>
            <div className='text-center'>
              <p className='text-foreground text-base font-semibold'>
                Subiendo imagen...
              </p>
              <p className='text-muted-foreground text-sm'>
                Esto puede tomar unos segundos
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 px-6 text-center'>
            <div className='bg-primary/10 group-hover:bg-primary/20 rounded-full p-6 transition-colors'>
              <ImagePlus className='text-primary h-12 w-12' />
            </div>
            <div className='space-y-2'>
              <p className='text-foreground text-lg font-semibold'>
                {isDragActive
                  ? '¡Suelta la imagen aquí!'
                  : 'Arrastra una imagen o haz clic'}
              </p>
              <p className='text-muted-foreground text-sm'>
                PNG, JPG, WEBP o GIF • Máximo 5MB
              </p>
            </div>
            <Badge variant='outline' className='text-xs'>
              Recomendado: 1200×630px para mejor visualización
            </Badge>
          </div>
        )}
      </div>

      {error && (
        <div className='bg-destructive/10 border-destructive/20 mt-3 rounded-lg border p-3'>
          <p className='text-destructive text-sm font-medium'>⚠️ {error}</p>
        </div>
      )}
    </div>
  )
}
