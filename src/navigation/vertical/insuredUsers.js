import { PERMISSION_DEPENDENT_APPOINTMENTS, PERMISSION_DEPENDENT_USERS } from '@/permissions'

export default [
  // {
  //   header: 'Asegurados insured',
  //   action: 'read',
  //   resource: [PERMISSION_DEPENDENT_USERS],
  // },
  {
    title: 'Beneficiarios',
    route: 'dependent-list',
    icon: 'UserIcon',
    action: 'read',
    resource: PERMISSION_DEPENDENT_APPOINTMENTS,
  },
]
