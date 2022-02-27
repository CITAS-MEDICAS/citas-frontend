export default [
  {
    path: '/citas-medicas',
    name: 'medical-appointments-list',
    component: () => import('@/views/medicalAppointment/MedicalAppointmentList'),
    meta: {
      pageTitle: 'Citas Medicas',
      breadcrumb: [
        {
          text: 'Citas Médicas',
          active: true
        }
      ],
      resource: 'citas-personal',
      action: 'read'
    }
  },
  {
    path: '/citas-medicas/:treatmentId/historial',
    name: 'insured-treatment-history',
    component: () => import('@/views/medicalAppointment/TreatmentHistory'),
    meta: {
      pageTitle: 'Historial',
      breadcrumb: [
        {
          text: 'Citas Médicas',
          to: {
            name: 'medical-appointments-list'
          }
        },
        {
          text: 'Historial',
          active: true
        }
      ],
      resource: 'citas-personal',
      action: 'read'
    }
  },
  {
    path: '/citas-medicas/:treatmentId/reconsulta',
    name: 'appointment-reconsult-form',
    component: () => import('@/views/medicalAppointment/components/appointment-calendar/AppointmentCalendar'),
    meta: {
      pageTitle: 'Reconsulta',
      breadcrumb: [
        {
          text: 'Citas Médicas',
          to: {
            name: 'medical-appointments-list'
          }
        },
        {
          text: 'Reconsulta',
          active: true
        }
      ],
      resource: 'citas-personal',
      action: 'read'
    }
  },
  {
    path: '/citas-medicas/:treatmentId/transferencia',
    name: 'appointment-transfer-form',
    component: () => import('@/views/medicalAppointment/components/appointment-calendar/AppointmentCalendar'),
    meta: {
      pageTitle: 'Transferencia',
      breadcrumb: [
        {
          text: 'Citas Médicas',
          to: {
            name: 'medical-appointments-list'
          }
        },
        {
          text: 'Reconsulta',
          active: true
        }
      ],
      resource: 'citas-personal',
      action: 'read'
    }
  }
]