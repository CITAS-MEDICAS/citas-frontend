export default [
  {
    path: '/consultorios',
    name: 'medical-unit-list',
    component: () => import('@/views/medicalUnit/MedicalUnitList.vue'),
    meta: {
      pageTitle: 'Consultorios',
      breadcrumb: [
        {
          text: 'Consultorios',
          active: true,
        },
      ],
    },
  },
  {
    path: '/consultorios/crear',
    name: 'medical-unit-create',
    component: () => import('@/views/medicalUnit/MedicalUnitCreate.vue'),
    meta: {
      pageTitle: 'Crear Consultorio',
      breadcrumb: [
        {
          text: 'Consultorios',
          to: { name: 'medical-unit-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
    },
  },
  {
    path: '/consultorios/editar/:id',
    name: 'medical-unit-edit',
    component: () => import('@/views/medicalUnit/MedicalUnitEdit.vue'),
    meta: {
      pageTitle: 'Editar Consultorio',
      breadcrumb: [
        {
          text: 'Consultorios',
          to: { name: 'medical-unit-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
    },
  },
]
