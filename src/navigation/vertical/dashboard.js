import {PERMISSION_DASHBOARD, PERMISSION_TICKETS} from '@/permissions'

export default [
  {
    title: 'Inicio',
    route: 'home',
    icon: 'HomeIcon',
    action: 'read',
    resource: PERMISSION_DASHBOARD,
  },
  {
    title: 'Tickets',
    route: 'tickets',
    icon: 'HomeIcon',
    action: 'read',
    resource: PERMISSION_TICKETS,
  },
]
