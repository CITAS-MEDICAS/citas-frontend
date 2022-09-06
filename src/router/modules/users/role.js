import { PERMISSION_ROLES } from '@/permissions'

export default [
  {
    path: '/roles-de-usuario',
    name: 'role-list',
    component: () => import('@/views/role/RoleList'),
    meta: {
      pageTitle: 'Roles de Usuario',
      breadcrumb: [
        {
          text: 'Roles de Usuario',
          active: true
        }
      ],
      resource: PERMISSION_ROLES,
      action: 'read'
    }
  }
]
