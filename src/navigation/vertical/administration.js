export default [
  {
    header: 'Administración',
    action: 'read',
    resource: ['centro', 'consultorio', 'especialidad', 'horarios', 'parantescos'],
  },
  {
    title: 'Centros',
    route: 'medical-center-list',
    icon: 'GridIcon',
    action: 'read',
    resource: 'centro',
  },
  {
    title: 'Consultorios',
    route: 'medical-unit-list',
    icon: 'PlusSquareIcon',
    action: 'read',
    resource: 'consultorio',
  },
  {
    title: 'Especialidades',
    route: 'specialties-list',
    icon: 'CodepenIcon',
    action: 'read',
    resource: 'especialidad',
  },
  {
    title: 'Horarios',
    route: 'service-hour-list',
    icon: 'ClockIcon',
    action: 'read',
    resource: 'horarios',
  },
  {
    title: 'Parentescos',
    route: 'relationship-list',
    icon: 'UsersIcon',
    action: 'read',
    resource: 'parantescos',
  },
  {
    title: 'Tipos de Consultorio',
    route: 'medical-unit-type-list',
    icon: 'GitBranchIcon',
    action: 'read',
    resource: 'tipos-consultorio',
  },
]
