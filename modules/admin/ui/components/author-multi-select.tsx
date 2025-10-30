'use client'

import { useEffect, useState } from 'react'

import { Check, ChevronsUpDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { getAllUsersAction } from '../../server/user-actions'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  username: string | null
}

interface AuthorMultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  currentUserId?: string
}

export function AuthorMultiSelect({
  value,
  onChange,
  currentUserId
}: AuthorMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const allUsers = await getAllUsersAction()
        // Filter out current user since they're the primary author
        const filtered = currentUserId
          ? allUsers.filter(u => u.id !== currentUserId)
          : allUsers
        setUsers(filtered)
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [currentUserId])

  const selectedUsers = users.filter(user => value.includes(user.id))

  const handleSelect = (userId: string) => {
    if (value.includes(userId)) {
      onChange(value.filter(id => id !== userId))
    } else {
      onChange([...value, userId])
    }
  }

  const handleRemove = (userId: string) => {
    onChange(value.filter(id => id !== userId))
  }

  return (
    <div className='space-y-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
          >
            {value.length > 0
              ? `${value.length} co-autor${value.length > 1 ? 'es' : ''} seleccionado${value.length > 1 ? 's' : ''}`
              : 'Seleccionar co-autores...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0' align='start'>
          <Command>
            <CommandInput placeholder='Buscar usuarios...' />
            <CommandList>
              <CommandEmpty>
                {loading ? 'Cargando...' : 'No se encontraron usuarios.'}
              </CommandEmpty>
              <CommandGroup>
                {users.map(user => (
                  <CommandItem
                    key={user.id}
                    value={`${user.name} ${user.email} ${user.username || ''}`}
                    onSelect={() => handleSelect(user.id)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.includes(user.id) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {user.name || user.username || 'Sin nombre'}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {user.email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected co-authors badges */}
      {selectedUsers.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectedUsers.map(user => (
            <Badge key={user.id} variant='secondary' className='gap-1 pr-1'>
              {user.name || user.username || user.email}
              <button
                type='button'
                onClick={() => handleRemove(user.id)}
                className='hover:bg-muted ml-1 rounded-sm p-0.5'
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
