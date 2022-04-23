import {
  PERMISSION_MEDICAL_CENTER,
  PERMISSION_MEDICAL_UNIT, PERMISSION_RELATIONSHIPS,
  PERMISSION_SERVICE_HOURS,
  PERMISSION_SPECIALTIES, PERMISSION_UNIT_TYPES
} from '@/permissions'

export default [
  {
    header: 'Administración',
    action: 'read',
    resource: [
      PERMISSION_MEDICAL_CENTER,
      PERMISSION_MEDICAL_UNIT,
      PERMISSION_SPECIALTIES,
      PERMISSION_SERVICE_HOURS,
      PERMISSION_RELATIONSHIPS,
      PERMISSION_UNIT_TYPES
    ],
  },
  {
    title: 'Centros',
    route: 'medical-center-list',
    icon: 'GridIcon',
    action: 'read',
    resource: PERMISSION_MEDICAL_CENTER,
  },
  {
    title: 'Consultorios',
    route: 'medical-unit-list',
    icon: 'PlusSquareIcon',
    action: 'read',
    resource: PERMISSION_MEDICAL_UNIT,
  },
  {
    title: 'Especialidades',
    route: 'specialties-list',
    icon: 'CodepenIcon',
    action: 'read',
    resource: PERMISSION_SPECIALTIES,
  },
  {
    title: 'Horarios',
    route: 'service-hour-list',
    icon: 'ClockIcon',
    action: 'read',
    resource: PERMISSION_SERVICE_HOURS,
  },
  {
    title: 'Parentescos',
    route: 'relationship-list',
    icon: 'UsersIcon',
    action: 'read',
    resource: PERMISSION_RELATIONSHIPS,
  },
  {
    title: 'Tipos de Consultorio',
    route: 'medical-unit-type-list',
    icon: 'GitBranchIcon',
    action: 'read',
    resource: PERMISSION_UNIT_TYPES,
  },
]
