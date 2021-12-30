import { useJwt } from '@/auth/jwt/useJwt'

export const USER_ROLES = 'USER_ROLES'
export const USER_DATA = 'USER_DATA'
export const USER_LOGOUT = 'USER_LOGOUT'

const state = {
  userData: useJwt.getUserData(),
  roles: [],
}

const getters = {
  getUser: state => state.userData,
}

const mutations = {
  [USER_DATA]: (state, userData) => (state.userData = userData),
  [USER_LOGOUT]: state => {
    state.userData = {}
    state.roles = null
  },
}

const actions = {
  [USER_ROLES]: ({ dispatch, commit, state }, userId) => {
    console.log('userId => ', userId)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
