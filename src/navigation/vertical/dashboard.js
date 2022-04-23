import { PERMISSION_DASHBOARD } from '@/permissions'

export default [
  {
    title: 'Inicio',
    route: 'home',
    icon: 'HomeIcon',
    action: 'read',
    resource: PERMISSION_DASHBOARD,
  },
]
