import {PERMISSION_DEPENDENT_USERS, PERMISSION_INSURED_USERS} from '@/permissions'

export default [
  {
    header: 'Beneficiarios',
    action: 'read',
    resource: [PERMISSION_DEPENDENT_USERS]
  },
  {
    title: 'Asegurado',
    route: 'dependent-list',
    icon: 'UserIcon',
    action: 'read',
    resource: PERMISSION_INSURED_USERS
  }
]
