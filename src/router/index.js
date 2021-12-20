import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from './modules/pages/dashboard'
import pages from './modules/pages/pages'
import medicalCenter from './modules/administration/medicalCenter'
import specialities from '@/router/modules/administration/specialities'
import medicalUnit from './modules/administration/medicalUnit'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [...pages, ...dashboard, ...medicalCenter, ...medicalUnit, ...specialities],
})

export default router
