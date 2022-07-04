import {PERMISSION_MEDICAL_APPOINTMENTS, PERMISSION_MEDICAL_CENTER} from '@/permissions'

export default [
  {
    header: 'RESERVACIONES',
    action: 'read',
    resource: [PERMISSION_MEDICAL_APPOINTMENTS]
  },
  {
    title: 'Citas Médicas',
    route: 'medical-appointments-list',
    icon: 'GridIcon',
    action: 'read',
    resource: PERMISSION_MEDICAL_APPOINTMENTS,
  },

]
