export default [
  {
    path: '/tipodeconsultorio',
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
    },
  },
  {
    path: '/tipodeconsultorio/crear',
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
    },
  },

  {
    path: '/tipodeconsultorio/editar/:id',
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
    },
  },
]
