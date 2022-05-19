import { PERMISSION_MEDICAL_CENTER } from '@/permissions'

export default [
  {
    path: '/registro-crear',
    name: 'registration-form',
    component: () => import('@/views/registration/RegistrationCreate.vue'),
    meta: {
      pageTitle: 'Registro',
      layout: 'full',
      resource: 'Guest'
    }
  },
  {
    path: '/registro',
    name: 'registration-list',
    component: () => import('@/views/registration/RegistrationList.vue'),
    meta: {
      pageTitle: 'Registro',
      breadcrumb: [
        {
          text: 'Registro Primera Vez',
          active: true
        }
      ]
    }
  },
  {
    path: '/registro/crear',
    name: 'registration-create',
    component: () => import('@/views/registration/RegistrationCreate.vue'),
    meta: {
      pageTitle: 'Crear Registro',
      breadcrumb: [
        {
          text: 'Registro',
          to: { name: 'registration-list' }
        },
        {
          text: 'Crear',
          active: true
        }
      ]
    }
  },
  {
    path: '/registro/editar/:id',
    name: 'registro-edit',
    component: () => import('@/views/registration/RegistrationEdit'),
    meta: {
      pageTitle: 'Editar Registro',
      breadcrumb: [
        {
          text: 'Registro',
          to: { name: 'registration-list' }
        },
        {
          text: 'Editar',
          active: true
        }
      ],
      action: 'update'
    }
  }
]
