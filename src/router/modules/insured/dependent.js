import {PERMISSION_DEPENDENT_USERS, PERMISSION_INSURED_USERS} from '@/permissions'

export default [
  {
    path: '/asegurado',
    name: 'dependent-list',
    component: () => import('@/views/dependents/DependentList'),
    meta: {
      pageTitle: 'Asegurado',
      breadcrumb: [
        {
          text: 'Asegurado',
          active: true,
        },
      ],
      resource: PERMISSION_DEPENDENT_USERS,
      action: 'read',
    },
  },
  {
    path: '/asegurado/crear-dependiente',
    name: 'dependent-create',
    component: () => import('@/views/dependents/DependentCreate'),
    meta: {
      pageTitle: 'Crear Dependiente',
      breadcrumb: [
        {
          text: 'Asegurado',
          to: { name: 'dependent-list' },
        },
        {
          text: 'Crear Dependiente',
          active: true,
        },
      ],
      resource: PERMISSION_DEPENDENT_USERS,
      action: 'create',
    },
  },
  {
    path: '/asegurado/:id/crear-dependiente-admin',
    name: 'dependent-create-admin',
    component: () => import('@/views/dependents/DependentCreate'),
    props : true,
    meta: {
      pageTitle: 'Crear Dependiente por el personal',
      breadcrumb: [
        {
          text: 'Asegurado',
          to: { name: 'dependent-list' },
        },
        {
          text: 'Crear Dependiente por administrador',
          active: true,
        },
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'create',
    },
  },
  // {
  //   path: '/asegurado/:id',
  //   name: 'dependent-show',
  //   component: () => import('@/views/dependents/DependentShow'),
  //   meta: {
  //     pageTitle: 'Asegurado',
  //     breadcrumb: [
  //       {
  //         text: 'Asegurado',
  //         to: { name: 'dependent-list' },
  //       },
  //       {
  //         text: 'Perfil',
  //         active: true,
  //       },
  //     ],
  //   },
  //   resource: PERMISSION_DEPENDENT_USERS,
  //   action: 'create',
  // },
]
