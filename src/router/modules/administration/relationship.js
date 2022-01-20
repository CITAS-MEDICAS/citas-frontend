export default [
  {
    path: '/parentescos',
    name: 'relationship-list',
    component: () => import('@/views/relationship/relationshipList'),
    meta: {
      pageTitle: 'Parentescos',
      breadcrumb: [
        {
          text: 'Parentescos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/parentescos/crear',
    name: 'relationship-create',
    component: () => import('@/views/relationship/relationshipCreate'),
    meta: {
      pageTitle: 'Crear Parentesco',
      breadcrumb: [
        {
          text: 'Especialidades',
          to: { name: 'relationship-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
    },
  },

  {
    path: '/parentescos/editar/:id',
    name: 'relationship-edit',
    component: () => import('@/views/relationship/relationshipEdit'),
    meta: {
      pageTitle: 'Editar Parentesco',
      breadcrumb: [
        {
          text: 'Parentescos',
          to: { name: 'relationship-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
    },
  },
]
