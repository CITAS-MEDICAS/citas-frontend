import { PERMISSION_STAFF_USERS } from '@/permissions'

export default [
  {
    path: '/personal',
    name: 'user-list',
    component: () => import('@/views/user/UserList.vue'),
    meta: {
      pageTitle: 'Personal',
      breadcrumb: [
        {
          text: 'Personal',
          active: true
        }
      ],
      resource: PERMISSION_STAFF_USERS,
      action: 'read'
    }
  },
  {
    path: '/personal/crear',
    name: 'user-create',
    component: () => import('@/views/user/UserCreate.vue'),
    meta: {
      pageTitle: 'Crear Personal',
      breadcrumb: [
        {
          text: 'Personal',
          to: { name: 'user-list' }
        },
        {
          text: 'Crear',
          active: true
        }
      ],
      resource: PERMISSION_STAFF_USERS,
      action: 'create'
    }
  },
  {
    path: '/personal/editar/:id',
    name: 'user-edit',
    component: () => import('@/views/user/UserEdit.vue'),
    meta: {
      pageTitle: 'Editar Personal',
      breadcrumb: [
        {
          text: 'Personal',
          to: { name: 'user-list' }
        },
        {
          text: 'Editar',
          active: true
        }
      ],
      resource: PERMISSION_STAFF_USERS,
      action: 'update'
    }
  },
  {
    path: '/perfil/:id',
    name: 'user-profile',
    component: () => import('@/views/user/UserProfile.vue'),
    meta: {
      pageTitle: 'Perfil de Usuario',
      breadcrumb: [
        {
          text: 'Perfil',
          active: true
        }
      ]
    }
  }

]
