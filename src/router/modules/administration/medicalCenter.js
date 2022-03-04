import { PERMISSION_MEDICAL_CENTER } from '@/permissions'

export default [
  {
    path: '/centros-de-salud',
    name: 'medical-center-list',
    component: () => import('@/views/medicalCenter/MedicalCenterList.vue'),
    meta: {
      pageTitle: 'Centros',
      breadcrumb: [
        {
          text: 'Centros de Salud',
          active: true,
        },
      ],
      resource: PERMISSION_MEDICAL_CENTER,
      action: 'read',
    },
  },
  {
    path: '/centros-de-salud/crear',
    name: 'medical-center-create',
    component: () => import('@/views/medicalCenter/MedicalCenterCreate.vue'),
    meta: {
      pageTitle: 'Crear Centro',
      breadcrumb: [
        {
          text: 'Centros de Salud',
          to: { name: 'medical-center-list' },
        },
        {
          text: 'Crear',
          active: true,
        },
      ],
      resource: PERMISSION_MEDICAL_CENTER,
      action: 'create',
    },
  },
  {
    path: '/centros-de-salud/editar/:id',
    name: 'medical-center-edit',
    component: () => import('@/views/medicalCenter/MedicalCenterEdit.vue'),
    meta: {
      pageTitle: 'Editar Centro',
      breadcrumb: [
        {
          text: 'Centros de Salud',
          to: { name: 'medical-center-list' },
        },
        {
          text: 'Editar',
          active: true,
        },
      ],
      resource: PERMISSION_MEDICAL_CENTER,
      action: 'update',
    },
  },
]
