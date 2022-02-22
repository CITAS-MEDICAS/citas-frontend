export default [
  {
    path: '/asegurado',
    name: 'dependent-list',
    component: () => import('@/views/dependents/DependentList'),
    meta: {
      pageTitle: 'Asegurado',
      breadcrumb: [
        {
          text: 'Asegurado',
          active: true,
        },
      ],
      resource: 'dependientes',
      action: 'read',
    },
  },
  {
    path: '/asegurado/crear-dependiente',
    name: 'dependent-create',
    component: () => import('@/views/dependents/DependentCreate'),
    meta: {
      pageTitle: 'Crear Dependiente',
      breadcrumb: [
        {
          text: 'Asegurado',
          to: { name: 'dependent-list' },
        },
        {
          text: 'Crear Dependiente',
          active: true,
        },
      ],
    },
    resource: 'dependientes',
    action: 'create',
  },
]