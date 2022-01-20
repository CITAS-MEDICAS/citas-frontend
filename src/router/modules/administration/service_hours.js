export default [
  {
    path: '/horarios',
    name: 'service-hour-list',
    component: () => import('@/views/serviceHours/ServiceHourList.vue'),
    meta: {
      pageTitle: 'Horarios',
      breadcrumb: [
        {
          text: 'Horarios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/horarios/crear',
    name: 'service-hour-create',
    component: () => import('@/views/serviceHours/ServiceHourCreate.vue'),
    meta: {
      pageTitle: 'Crear Horarios',
      breadcrumb: [
        {
          text: 'Horarios',
          to: { name: 'service-hour-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
    },
  },
  {
    path: '/horarios/editar/:id',
    name: 'service-hour-edit',
    component: () => import('@/views/serviceHours/ServiceHourEdit.vue'),
    meta: {
      pageTitle: 'Editar Horario',
      breadcrumb: [
        {
          text: 'Horarios',
          to: { name: 'medical-center-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
    },
  },
]
