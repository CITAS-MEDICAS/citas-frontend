import {
  PERMISSION_INSURED_USERS,
  PERMISSION_ROLES,
  PERMISSION_STAFF_USERS
} from '@/permissions'

export default [
  {
    header: 'Usuarios',
    action: 'read',
    resource: [PERMISSION_STAFF_USERS, PERMISSION_ROLES, PERMISSION_INSURED_USERS],
  },
  {
    title: 'Personal',
    route: 'user-list',
    icon: 'UserCheckIcon',
    action: 'read',
    resource: PERMISSION_STAFF_USERS,
  },
  {
    title: 'Roles',
    route: 'role-list',
    icon: 'LockIcon',
    action: 'read',
    resource: PERMISSION_ROLES,
  },
  {
    title: 'Asegurados',
    route: 'insured-list',
    icon: 'UsersIcon',
    action: 'read',
    resource: PERMISSION_INSURED_USERS,
  },
]
