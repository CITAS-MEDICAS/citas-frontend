import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from './modules/pages/dashboard'
import pages from './modules/pages/pages'
import medicalCenter from './modules/administration/medicalCenter'
import specialities from '@/router/modules/administration/specialities'
import medicalUnit from './modules/administration/medicalUnit'
import medicalUnitType from './modules/administration/medicalUnitType'
import user from './modules/users/user'
import role from './modules/users/role'
import insured from './modules/users/insured'
import serviceHours from './modules/administration/service_hours'
import relationship from './modules/administration/relationship'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...pages,
    ...dashboard,
    // Administration
    ...medicalCenter,
    ...medicalUnit,
    ...specialities,
    ...serviceHours,
    ...relationship,
    ...medicalUnitType,
    // Users
    ...user,
    ...role,
    ...insured,
  ],
})

export default router
