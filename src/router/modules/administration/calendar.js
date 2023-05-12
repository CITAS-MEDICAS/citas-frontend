import { PERMISSION_MEDICAL_UNIT_CALENDAR } from '@/permissions'

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
      resource: PERMISSION_MEDICAL_UNIT_CALENDAR,
      action: 'read',
    },
  },
]
