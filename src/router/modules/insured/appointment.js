export default [
  {
    path: '/asegurado/:id/citas-medicas',
    name: 'insured-appointment-list',
    component: () => import('@/views/appointment/AppointmentList'),
    meta: {
      pageTitle: 'Citas Médicas',
      breadcrumb: [
        {
          text: 'Asegurado',
          to : { name: 'dependent-list' }
        },
        {
          text: 'Citas Médicas',
          active: true,
        },
      ],
      resource: 'citas-medicas',
      action: 'read',
    },
  },
  {
    path: '/asegurado/:id/citas-medicas/crear',
    name: 'insured-appointment-create',
    component: () => import('@/views/appointment/AppointmentCreate'),
    meta: {
      pageTitle: 'Crear Cita Médica',
      breadcrumb: [
        {
          text: 'Asegurado',
          to : { name: 'dependent-list' }
        },
        {
          text: 'Citas Médicas',
          to : function() {
            return {
              name: 'insured-appointment-list',
              params: ['id']
            }
          },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
      resource: 'citas-medicas',
      action: 'create',
    },
  },
]