export default [
  {
    header: 'Administración',
    action: 'read',
    resource: ['centro', 'consultorio', 'especialidad', 'turnos'],
  },
  {
    title: 'Centros',
    route: 'medical-center-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'centro',
  },
  {
    title: 'Consultorios',
    route: 'medical-unit-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'consultorio',
  },
  {
    title: 'Especialidades',
    route: 'specialties-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'especialidad',
  },
  {
    title: 'Turnos',
    route: 'service-hour-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'turnos',
  },
  {
    title: 'Parentescos',
    route: 'relationship-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'parantescos',
  },
  {
    title: 'Tipos de Consultorio',
    route: 'medical-unit-type-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'tipos-consultorio',
  },
  {
    title: 'Horarios',
    route: null,
    icon: 'UserIcon',
    action: 'read',
    resource: 'calendario',
  },
]
