'use client'

import { useState, ViewTransition } from 'react'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'

interface CommentItemProps {
  comment: {
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
  currentUserId?: string
  updateAction: (commentId: string, content: string) => Promise<void>
  deleteAction: (commentId: string) => Promise<void>
}

export function CommentItem({
  comment,
  currentUserId,
  updateAction,
  deleteAction
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const isOwner = currentUserId === comment.author.id
  const authorName = comment.author.name || 'Anónimo'

  async function handleUpdate() {
    if (editContent.trim() === comment.content) {
      setIsEditing(false)
      return
    }

    await updateAction(comment.id, editContent.trim())
    setIsEditing(false)
  }

  async function handleDelete() {
    setShowDeleteDialog(false)
    setIsDeleting(true)
    await deleteAction(comment.id)
  }

  if (isDeleting) {
    return (
      <ViewTransition exit='slide-left'>
        <div className='flex gap-4 opacity-50'>
          <Avatar className='border-border h-10 w-10 border-2'>
            <AvatarFallback className='text-xs'>...</AvatarFallback>
          </Avatar>
          <div className='bg-muted/50 flex-1 rounded-2xl p-4'>
            <p className='text-muted-foreground text-sm'>Eliminando...</p>
          </div>
        </div>
      </ViewTransition>
    )
  }

  return (
    <ViewTransition enter='slide-up' update='fade'>
      <div className='group/comment flex gap-3 py-4'>
        <Avatar className='ring-border/50 group-hover/comment:ring-primary/20 size-8 shrink-0 ring-2 transition-all'>
          {comment.author.image ? (
            <AvatarImage src={comment.author.image} alt={authorName} />
          ) : null}
          <AvatarFallback className='text-xs font-medium'>
            {comment.authorInitials}
          </AvatarFallback>
        </Avatar>

        <div className='min-w-0 flex-1 space-y-1'>
          {isEditing ? (
            <div className='border-border space-y-3 rounded-lg border p-4'>
              <Textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className='focus-visible:ring-primary resize-none'
                rows={3}
                maxLength={500}
                autoFocus
              />
              <div className='flex items-center justify-between'>
                <p className='text-muted-foreground text-xs'>
                  {editContent.length}/500 caracteres
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setEditContent(comment.content)
                      setIsEditing(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button size='sm' onClick={handleUpdate}>
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>{authorName}</span>
                <span className='text-muted-foreground text-xs'>•</span>
                <span className='text-muted-foreground text-xs'>
                  {comment.formattedDate}
                </span>
                {isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='hover:bg-muted ml-auto h-7 w-7 shrink-0 p-0 opacity-0 transition-opacity group-hover/comment:opacity-100'
                      >
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-40'>
                      <DropdownMenuItem
                        onClick={() => setIsEditing(true)}
                        className='cursor-pointer'
                      >
                        <Pencil className='mr-2 h-4 w-4' />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className='text-destructive focus:text-destructive cursor-pointer'
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <p className='text-foreground/90 text-[15px] leading-relaxed whitespace-pre-wrap'>
                {comment.content}
              </p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar comentario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El comentario será eliminado
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ViewTransition>
  )
}
