import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from './modules/dashboard/dashboard'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...dashboard,
    // {
    //   path: '/second-page',
    //   name: 'second-page',
    //   component: () => import('@/views/SecondPage.vue'),
    //   meta: {
    //     pageTitle: 'Second Page',
    //     breadcrumb: [
    //       {
    //         text: 'Second Page',
    //         active: true,
    //       },
    //     ],
    //     resource: 'Home',
    //     action: 'read',
    //   },
    // },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Guest',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Guest',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

export default router
