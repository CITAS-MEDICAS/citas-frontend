import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

import auth from './modules/auth'
import user from './modules/user'
import calendar from './modules/calendar'
import types from './modules/types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    user,
    calendar,
    types,
  },
  strict: process.env.DEV,
})
