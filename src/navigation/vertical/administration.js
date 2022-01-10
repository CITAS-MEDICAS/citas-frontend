export default [
  {
    header: 'Administración',
  },
  {
    title: 'Centros',
    route: 'medical-center-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Centros',
  },
  {
    title: 'Consultorios',
    route: 'medical-unit-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Centros',
  },

  {
    title: 'Especialidades',
    route: 'specialties-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Especialidades',
  },

  {
    title: 'Turnos',
    route: null,
    icon: 'UserIcon',
    action: 'read',
    resource: 'Home',
  },
  {
    title: 'Horarios',
    route: null,
    icon: 'UserIcon',
    action: 'read',
    resource: 'Home',
  },
]
