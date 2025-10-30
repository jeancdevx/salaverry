import Link from 'next/link'

import { CommentForm } from './comment-form'
import { CommentItem } from './comment-item'

interface Comment {
  id: string
  content: string
  formattedDate: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
  authorInitials: string
}

interface CommentsListProps {
  comments: Comment[]
  postId: string
  postSlug: string
  currentUserId?: string
  createAction: (formData: FormData) => Promise<{ success: boolean }>
  updateAction: (commentId: string, content: string) => Promise<void>
  deleteAction: (commentId: string) => Promise<void>
}

export function CommentsList({
  comments,
  postId,
  postSlug,
  currentUserId,
  createAction,
  updateAction,
  deleteAction
}: CommentsListProps) {
  return (
    <section className='mt-12'>
      <h2 className='mb-8 text-2xl font-bold'>
        Comentarios ({comments.length})
      </h2>

      {/* Formulario de nuevo comentario */}
      {currentUserId ? (
        <div className='border-border bg-card mb-10 rounded-lg border p-5 shadow-sm'>
          <CommentForm
            postId={postId}
            postSlug={postSlug}
            createAction={createAction}
          />
        </div>
      ) : (
        <div className='border-border bg-muted/30 mb-10 rounded-lg border border-dashed p-8 text-center'>
          <p className='text-muted-foreground mb-4 text-sm'>
            Inicia sesión para unirte a la conversación
          </p>
          <Link
            href='/sign-in'
            className='text-primary inline-flex items-center font-medium transition-colors hover:underline'
          >
            Iniciar Sesión
          </Link>
        </div>
      )}

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <div className='border-muted bg-muted/20 flex flex-col items-center justify-center rounded-lg border border-dashed py-16'>
          <p className='text-muted-foreground text-sm'>
            Aún no hay comentarios
          </p>
          <p className='text-muted-foreground mt-1 text-xs'>
            ¡Sé el primero en compartir tu opinión!
          </p>
        </div>
      ) : (
        <div className='divide-border divide-y'>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              updateAction={updateAction}
              deleteAction={deleteAction}
            />
          ))}
        </div>
      )}
    </section>
  )
}
