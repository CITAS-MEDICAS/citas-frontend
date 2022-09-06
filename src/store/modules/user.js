import { useJwt } from '@/auth/jwt/useJwt'
import { ProfileResource } from '@/network/lib/profile'
import ability from '@/libs/acl/ability'
import { initialAbility } from '@/libs/acl/config'

export const USER_ROLES = 'USER_ROLES'
export const USER_PERMISSIONS = 'USER_PERMISSIONS'
export const USER_DATA = 'USER_DATA'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_ACTIVE_ROLE = 'USER_ACTIVE_ROLE'

const state = {
  userData: useJwt.getUserData(),
  roles: useJwt.getUserRoles(),
  activeRole: useJwt.getActiveRole(),
}

const getters = {
  getUser: state => state.userData,
  getRoles: state => state.roles,
  getActiveRole: state => state.activeRole,
}

const mutations = {
  [USER_DATA]: (state, userData) => (state.userData = userData),
  [USER_LOGOUT]: state => {
    state.userData = {}
    state.roles = []
    state.activeRole = null
  },
  [USER_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [USER_ACTIVE_ROLE]: (state, activeRole) => {
    state.activeRole = activeRole
  },
}

const actions = {
  [USER_ROLES]: async ({ commit, dispatch }) => {
    const { data } = await ProfileResource.permissions()
    useJwt.setUserRoles(data)
    commit(USER_ROLES, data)

    const roleName = useJwt.getActiveRole()?.role || data[0].role
    dispatch(USER_PERMISSIONS, roleName)
  },
  [USER_PERMISSIONS]: async ({ commit, state }, roleName) => {
    const activeRole = state.roles.find(item => item.role === roleName)
    if (!activeRole) return

    commit(USER_ACTIVE_ROLE, activeRole)
    useJwt.setActiveRole(activeRole)
    ability.update([...initialAbility, ...activeRole.permissions])
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
