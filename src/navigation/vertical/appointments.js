import { PERMISSION_MEDICAL_APPOINTMENTS } from '@/permissions'

export default [
  {
    header: 'RESERVACIONES',
    action: 'read',
    resource: [PERMISSION_MEDICAL_APPOINTMENTS]
  },
  {
    title: 'Citas Médicas',
    route: 'medical-appointments-list',
    icon: 'ClipboardIcon',
    action: 'read',
    resource: PERMISSION_MEDICAL_APPOINTMENTS
  }
]