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
    route: null,
    icon: 'UserIcon',
    action: 'read',
    resource: 'turnos',
  },
  {
    title: 'Horarios',
    route: null,
    icon: 'UserIcon',
    action: 'read',
    resource: 'calendario',
  },
]
