import type { comment, post, reaction, user } from '@/db/schema'

export type Post = typeof post.$inferSelect
export type InsertPost = typeof post.$inferInsert

export type Reaction = typeof reaction.$inferSelect
export type InsertReaction = typeof reaction.$inferInsert

export type Comment = typeof comment.$inferSelect
export type InsertComment = typeof comment.$inferInsert

export type PostWithAuthor = Post & {
  author: Pick<
    typeof user.$inferSelect,
    'id' | 'name' | 'email' | 'image' | 'username'
  >
  _count?: {
    reactions: number
    comments: number
  }
}

export type CommentWithAuthor = Comment & {
  author: Pick<
    typeof user.$inferSelect,
    'id' | 'name' | 'email' | 'image' | 'username'
  >
}
