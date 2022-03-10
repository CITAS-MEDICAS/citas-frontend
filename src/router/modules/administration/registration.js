export default [
  {
    path: '/registro',
    name: 'registration-list',
    component: () => import('@/views/registration/RegistrationList.vue'),
    meta: {
      pageTitle: 'Registro',
      breadcrumb: [
        {
          text: 'Registro Primera Vez',
          active: true,
        },
      ],
    },
  },  
  {
    path: '/registro/crear',
    name: 'registration-create',
    component: () => import('@/views/registration/RegistrationCreate.vue'),
    meta: {
      pageTitle: 'Crear Registro',
      breadcrumb: [
        {
          text: 'Registro',
          to: { name: 'registration-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
    },
  },
]
