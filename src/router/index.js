import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from './modules/pages/dashboard'
import pages from './modules/pages/pages'

import medicalCenter from './modules/administration/medicalCenter'
import medicalUnit from './modules/administration/medicalUnit'
import specialities from '@/router/modules/administration/specialities'
import serviceHours from './modules/administration/service_hours'
import relationship from './modules/administration/relationship'
import medicalUnitType from './modules/administration/medicalUnitType'
import calendar from './modules/administration/calendar'

import medicalAppointment from './modules/appointments/medicalAppointments'

import user from './modules/users/user'
import role from './modules/users/role'
import insured from './modules/users/insured'

import dependent from './modules/insured/dependent'
import appointment from './modules/insured/appointment'

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
    ...calendar,
    // Reservations
    ...medicalAppointment,
    // Users
    ...user,
    ...role,
    ...insured,
    // Insured
    ...dependent,
    ...appointment,
  ],
})

export default router
