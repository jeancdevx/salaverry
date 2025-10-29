import 'server-only'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatea una fecha para mostrar en el blog
 */
export function formatPostDate(date: Date | null | undefined): string {
  if (!date) return ''

  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
}

/**
 * Formatea una fecha de forma relativa (hace X tiempo)
 */
export function formatRelativeDate(date: Date | null | undefined): string {
  if (!date) return ''

  return format(date, 'PPP', { locale: es })
}

/**
 * Obtiene las iniciales de un nombre
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
