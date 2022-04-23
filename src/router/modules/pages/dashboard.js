import { PERMISSION_DASHBOARD } from '@/permissions'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      pageTitle: 'Inicio',
      breadcrumb: [
        {
          text: 'Página de Inicio',
          active: true
        }
      ],
      resource: PERMISSION_DASHBOARD,
      action: 'read'
    }
  }
]
