import { PERMISSION_INSURED_USERS } from '@/permissions'

export default [
  {
    path: '/asegurados',
    name: 'insured-list',
    component: () => import('@/views/insuredUsers/InsuredUserList'),
    meta: {
      pageTitle: 'Asegurados',
      breadcrumb: [
        {
          text: 'Asegurados',
          active: true
        }
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'read'
    }
  },
  {
    path: '/asegurados/crear',
    name: 'insured-create',
    component: () => import('@/views/insuredUsers/InsuredUserCreate'),
    meta: {
      pageTitle: 'Crear Asegurado',
      breadcrumb: [
        {
          text: 'Asegurados',
          to: { name: 'insured-list' }
        },
        {
          text: 'Crear',
          active: true
        }
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'create'
    }
  },
  {
    path: '/asegurados/editar/:id',
    name: 'insured-edit',
    component: () => import('@/views/insuredUsers/InsuredUserEdit'),
    meta: {
      pageTitle: 'Editar Asegurado',
      breadcrumb: [
        {
          text: 'Asegurados',
          to: { name: 'insured-list' }
        },
        {
          text: 'Editar',
          active: true
        }
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'update'
    }
  },
  {
    path: '/asegurados/alta',
    name: 'insured-enabled',
    component: () => import('@/views/insuredUsers/InsuredEnabled'),
    meta: {
      pageTitle: 'Alta del Asegurado',
      breadcrumb: [
        {
          text: 'Asegurados',
          to: { name: 'insured-list' }
        },
        {
          text: 'Alta',
          active: true
        }
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'create'
    }
  },
  {
    path: '/asegurados/disabled/:id',
    name: 'insured-disabled',
    component: () => import('@/views/insuredUsers/InsuredDelete'),
    meta: {
      pageTitle: 'Baja Asegurado',
      breadcrumb: [
        {
          text: 'Asegurados',
          to: { name: 'insured-list' }
        },
        {
          text: 'Baja',
          active: true
        }
      ],
      resource: PERMISSION_INSURED_USERS,
      action: 'update'
    }
  },
]
