import { PERMISSION_DEPENDENT_USERS } from '@/permissions'

export default [
  {
    header: 'Beneficiarios'
  },
  {
    title: 'Asegurado',
    route: 'dependent-list',
    icon: 'UserIcon',
    action: 'read',
    resource: PERMISSION_DEPENDENT_USERS
  }
]
