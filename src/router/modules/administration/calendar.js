export default [
  {
    path: '/consultorios/:id/calendario',
    name: 'medical-unit-calendar',
    component: () => import('@/views/calendar/Calendar'),
    meta: {
      pageTitle: 'Calendario',
      breadcrumb: [
        {
          text: 'Consultorios',
          to: { name: 'medical-unit-list' },
        },
        {
          text: 'Calendario',
          active: true,
        },
      ],
      resource: 'calendario',
      action: 'read',
    },
  },
]
