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
          active: true,
        },
      ],
    },
  },
]
