import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'post-images')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'post-images'
): Promise<{ url: string; error?: string }> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${fileName}`

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)

      // Mensajes de error más amigables
      if (error.message.includes('row-level security')) {
        return {
          url: '',
          error:
            'Error de permisos. Verifica las políticas de Supabase Storage.'
        }
      }

      return { url: '', error: error.message }
    }

    // Get public URL
    const {
      data: { publicUrl }
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return { url: publicUrl }
  } catch (error) {
    console.error('Unexpected upload error:', error)
    return { url: '', error: 'Error al subir la imagen' }
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image
 * @param bucket - The storage bucket name
 */
export async function deleteImage(
  url: string,
  bucket: string = 'post-images'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const urlParts = url.split(`${bucket}/`)
    if (urlParts.length < 2) {
      return { success: false, error: 'URL inválida' }
    }

    const filePath = urlParts[1]

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected delete error:', error)
    return { success: false, error: 'Error al eliminar la imagen' }
  }
}
