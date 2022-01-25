export default [
  {
    header: 'Usuarios',
    action: 'read',
    resource: ['personal', 'roles', 'asegurados'],
  },
  {
    title: 'Personal',
    route: 'user-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'personal',
  },
  {
    title: 'Roles',
    route: 'role-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'roles',
  },
  // {
  //   title: 'Permisos',
  //   route: null,
  //   icon: 'UserIcon',
  //   action: 'read',
  //   resource: 'Home',
  // },
  {
    title: 'Asegurados',
    route: 'insured-list',
    icon: 'UserIcon',
    action: 'read',
    resource: 'asegurados',
  },
]
