export default [
  {
    path: '/centros',
    name: 'medical-center-list',
    component: () => import('@/views/medicalCenter/MedicalCenterList.vue'),
  },
  {
    path: '/centros/crear',
    name: 'medical-center-create',
    component: () => import('@/views/medicalCenter/MedicalCenterCreate.vue'),
  },
  {
    path: '/centros/editar/:id',
    name: 'medical-center-edit',
    component: () => import('@/views/medicalCenter/MedicalCenterEdit.vue'),
  },
]
