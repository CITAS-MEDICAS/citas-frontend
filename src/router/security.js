import router from './index'

import { canNavigate } from '@/libs/acl/routeProtection'

import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  console.log('router.beforeEach -> isLoggedIn', isLoggedIn)

  if (!canNavigate(to)) {
    console.log('router.beforeEach -> isLoggedIn', isLoggedIn)
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'error-404' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
