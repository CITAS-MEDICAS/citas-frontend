export default [
  {
    path: '/especialidades',
    name: 'specialties-list',
    component: () => import('@/views/specialties/SpecialtiesList'),
    meta: {
      pageTitle: 'Especialidades',
      breadcrumb: [
        {
          text: 'Especialidades',
        },
        {
          text: 'Listado',
          active: true,
        },
      ],
    },
  },
  {
    path: '/especialidades/crear',
    name: 'specialties-create',
    component: () => import('@/views/specialties/SpecialtiesCreate'),
    meta: {
      pageTitle: 'Crear Especialidad',
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
    path: '/especialidades/editar/:id',
    name: 'specialties-edit',
    component: () => import('@/views/specialties/SpecialtiesEdit'),
    meta: {
      pageTitle: 'Editar Especialidad',
      breadcrumb: [
        {
          text: 'Especialidades',
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
