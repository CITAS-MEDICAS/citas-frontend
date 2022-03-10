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
    title: 'Turnos',
    route: 'service-hour-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Horarios',
  },
  {
    title: 'Especialidades',
    route: 'specialties-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Especialidades',
  },
  {
    title: 'Parentescos',
    route: 'relationship-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Home',
  },  
  {
    title: 'Tipos de Consultorio',
    route: 'medical-unit-type-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'Horarios',
  },
  {
    title: 'Registro',
    route: 'registration-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'registration',
  },
]
