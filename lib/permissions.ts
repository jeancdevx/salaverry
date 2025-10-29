import { createAccessControl } from 'better-auth/plugins/access'
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  post: ['create', 'read', 'update', 'delete'],
  comment: ['create', 'read', 'update', 'delete'],
  reaction: ['create', 'delete']
} as const

export const ac = createAccessControl(statement)

export const user = ac.newRole({
  post: ['read'],
  comment: ['create', 'read', 'update', 'delete'],
  reaction: ['create', 'delete']
})

export const admin = ac.newRole({
  post: ['create', 'read', 'update', 'delete'],
  comment: ['create', 'read', 'update', 'delete'],
  reaction: ['create', 'delete'],
  ...adminAc.statements
})
