import jwtDefaultConfig from './jwtDefaultConfig'

import { app } from '@/main'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()
        const activeRole = this.getActiveRole()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }

        if (activeRole) {
          config.headers['Request-Role'] = activeRole.role
        }


        return config
      },
      error => Promise.reject(error)
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        const { config, response } = error
        const originalRequest = config

        // console.log('-> response', response)

        if (originalRequest.url.includes('api/auth/login')) {
          app.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              text: 'Credenciales invalidos.',
              icon: 'AlertCircleIcon',
              variant: 'danger'
            }
          })
          return Promise.reject(error)
        } else {
          app.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              text: response.data?.message || 'Ocurrio un error, contacte con el Administrador del Sistema!',
              icon: 'AlertCircleIcon',
              variant: 'danger'
            }
          })
        }

        if (response && response.status === 401) {
          this.fetchRefreshToken()

          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              console.log('retryOriginalRequest -> accessToken', accessToken)
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }

        return Promise.reject(error)
      }
    )

  }

  fetchRefreshToken() {
    if (this.isAlreadyFetchingAccessToken) return

    this.isAlreadyFetchingAccessToken = true
    this.refreshToken()
      .then(({ data }) => {
        this.isAlreadyFetchingAccessToken = false

        if (data.access_token && data.refresh_token) {
          this.setToken(data.access_token)
          this.setRefreshToken(data.refresh_token)
        }

        this.onAccessTokenFetched(data.access_token)
      })
      .catch(error => {
        console.log('refreshToken -> error', error.response)
        if (error.response.data.message === 'The refresh token is invalid.') {
          this.clearStorage()
          window.location = '/login'
        }
      })
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  setUserData(userData) {
    localStorage.setItem(this.jwtConfig.storageUserDataKeyName, JSON.stringify(userData))
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(this.jwtConfig.storageUserDataKeyName))
  }

  clearStorage() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
    localStorage.removeItem('userRoles')
    localStorage.removeItem('userRole')
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  logout() {
    return this.axiosIns.post(this.jwtConfig.logoutEndpoint)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refresh_token: this.getRefreshToken()
    })
  }

  setUserRoles(permissions) {
    localStorage.setItem('userRoles', JSON.stringify(permissions))
  }

  getUserRoles() {
    return JSON.parse(localStorage.getItem('userRoles'))
  }

  setActiveRole(role) {
    localStorage.setItem('userRole', JSON.stringify(role))
  }

  getActiveRole() {
    return JSON.parse(localStorage.getItem('userRole'))
  }
}
