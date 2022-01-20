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
          active: true,
        },
      ],
      resource: 'personal',
      action: 'read',
    },
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
          to: { name: 'user-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
      resource: 'personal',
      action: 'create',
    },
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
          to: { name: 'user-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
      resource: 'personal',
      action: 'update',
    },
  },
]
