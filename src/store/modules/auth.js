import { useJwt } from '@/auth/jwt/useJwt'
import { USER_DATA, USER_LOGOUT, USER_ROLES } from '@/store/modules/user'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const state = {
  token: useJwt.getToken(),
  refreshToken: useJwt.getRefreshToken(),
  status: null,
}

const getters = {}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, response) => {
    state.status = 'success'
    state.token = response.access_token
    state.refreshToken = response.refresh_token
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: state => {
    state.token = null
    state.refreshToken = null
  },
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, credentials) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      useJwt
        .login(credentials)
        .then(({ data }) => {
          useJwt.setToken(data.access_token)
          useJwt.setRefreshToken(data.refresh_token)
          useJwt.setUserData(data.user_data)

          commit(AUTH_SUCCESS, data)
          commit(USER_DATA, data.user_data)
          dispatch(USER_ROLES, data.user_data.id)

          resolve(data.user_data)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      useJwt.logout().then(() => {
        useJwt.clearStorage()
        commit(AUTH_LOGOUT)
        commit(USER_LOGOUT)
        resolve()
      })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
