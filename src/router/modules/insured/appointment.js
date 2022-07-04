import {PERMISSION_DEPENDENT_APPOINTMENTS, PERMISSION_MEDICAL_APPOINTMENTS} from '@/permissions'

export default [
  {
    path: '/asegurado/:userId/citas-medicas',
    name: 'insured-appointment-list',
    component: () => import('@/views/insuredAppointment/AppointmentList'),
    meta: {
      pageTitle: 'Citas Médicas',
      breadcrumb: [
        {
          text: 'Asegurado',
          to: { name: 'dependent-list' }
        },
        {
          text: 'Citas Médicas',
          active: true
        }
      ],
      // resource: PERMISSION_DEPENDENT_APPOINTMENTS,
      resource: [PERMISSION_MEDICAL_APPOINTMENTS,PERMISSION_DEPENDENT_APPOINTMENTS],
      action: 'read'
    }
  },
  {
    path: '/asegurado/:userId/citas-medicas/crear',
    name: 'insured-appointment-create',
    component: () => import('@/views/insuredAppointment/AppointmentCreate'),
    meta: {
      pageTitle: 'Crear Cita Médica',
      breadcrumb: [
        {
          text: 'Asegurado',
          to: { name: 'dependent-list' }
        },
        {
          text: 'Citas Médicas',
          resolve: function () {
            return {
              name: 'insured-appointment-list',
              params: ['userId']
            }
          }
        },
        {
          text: 'Crear',
          active: true
        }
      ],
      resource: PERMISSION_DEPENDENT_APPOINTMENTS,
      action: 'create'
    }
  }
]
