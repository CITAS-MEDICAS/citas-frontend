import { PERMISSION_DASHBOARD } from '@/permissions'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      pageTitle: 'Home',
      breadcrumb: [
        {
          text: 'Home',
          active: true
        }
      ],
      resource: PERMISSION_DASHBOARD,
      action: 'read'
    }
  }
]
