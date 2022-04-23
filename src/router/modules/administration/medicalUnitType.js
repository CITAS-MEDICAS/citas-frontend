import { PERMISSION_UNIT_TYPES } from '@/permissions'

export default [
  {
    path: '/tipo-de-consultorio',
    name: 'medical-unit-type-list',
    component: () => import('@/views/medicalUnitType/medicalUnitTypeList'),
    meta: {
      pageTitle: 'Tipos de Consultorio',
      breadcrumb: [
        {
          text: 'Tipos de Consultorio',
          active: true,
        },
      ],
      resource: PERMISSION_UNIT_TYPES,
      action: 'read',
    },
  },
  {
    path: '/tipo-de-consultorio/crear',
    name: 'medical-unit-type-create',
    component: () => import('@/views/medicalUnitType/medicalUnitTypeCreate'),
    meta: {
      pageTitle: 'Crear Tipos de Consultorio',
      breadcrumb: [
        {
          text: 'Especialidades',
          to: { name: 'specialties-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
      resource: PERMISSION_UNIT_TYPES,
      action: 'create',
    },
  },
  {
    path: '/tipo-de-consultorio/editar/:id',
    name: 'medical-unit-type-edit',
    component: () => import('@/views/medicalUnitType/medicalUnitTypeEdit'),
    meta: {
      pageTitle: 'Editar Tipos de Consultorio',
      breadcrumb: [
        {
          text: 'Tipos de Consultorio',
          to: { name: 'specialties-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
      resource: PERMISSION_UNIT_TYPES,
      action: 'update',
    },
  },
]
