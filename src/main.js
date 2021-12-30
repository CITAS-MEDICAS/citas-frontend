import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'

import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import './router/security'

import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/acl'
import '@/libs/vue-select'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

// import 3rd party styles
require('@core/scss/vue/libs/vue-sweetalert.scss')

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
