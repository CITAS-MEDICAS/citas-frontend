import {
  PERMISSION_MEDICAL_APPOINTMENTS,
  PERMISSION_RECONSULT_APPOINTMENTS,
  PERMISSION_TRANSFER_APPOINTMENTS
} from '@/permissions'

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
      resource: PERMISSION_MEDICAL_APPOINTMENTS,
      action: 'read'
    }
  },
  {
    path: '/citas-medicas/:appointmentId/editar',
    name: 'medical-appointments-edit',
    component: () => import('@/views/medicalAppointment/MedicalAppointmentEdit'),
    meta: {
      pageTitle: 'Citas Medicas',
      breadcrumb: [
        {
          text: 'Citas Médicas',
          to: {
            name: 'medical-appointments-list'
          }
        },
        {
          text: 'Editar',
          active: true
        }
      ],
      resource: PERMISSION_MEDICAL_APPOINTMENTS,
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
      resource: PERMISSION_MEDICAL_APPOINTMENTS,
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
          text: 'Historial',
          resolve: function() {
            return {
              name: 'insured-treatment-history',
              params: ['treatmentId']
            }
          }
        },
        {
          text: 'Reconsulta',
          active: true
        }
      ],
      resource: PERMISSION_RECONSULT_APPOINTMENTS,
      action: 'create',
      attentionType: 'RECONSULTA'
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
          text: 'Historial',
          resolve: function() {
            return {
              name: 'insured-treatment-history',
              params: ['treatmentId']
            }
          }
        },
        {
          text: 'Transferencia',
          active: true
        }
      ],
      resource: PERMISSION_TRANSFER_APPOINTMENTS,
      action: 'create',
      attentionType: 'NUEVO'
    }
  }
]