import { PERMISSION_TICKETS } from '@/permissions'

export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Guest',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Guest',
    },
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('@/views/tickets/Tickets.vue'),
    meta: {
      layout: 'full',
      resource: PERMISSION_TICKETS,
      action: 'read'
    }
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]
