import type { SelectPost, SelectUser } from '@/db/schema'

export interface PostWithAuthor extends SelectPost {
  author: Pick<SelectUser, 'id' | 'name' | 'email' | 'image' | 'username'>
  coAuthors?: string[]
}
