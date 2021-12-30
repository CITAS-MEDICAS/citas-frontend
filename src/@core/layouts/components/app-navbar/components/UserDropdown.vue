<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username }}
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon v-if="!userData.fullName" icon="UserIcon" size="22" />
      </b-avatar>
    </template>

    <b-dropdown-item :to="{ name: 'pages-profile' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>Profile</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-email' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MailIcon" class="mr-50" />
      <span>Inbox</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item :to="{ name: 'pages-account-setting' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>Settings</span>
    </b-dropdown-item>

    <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { avatarText } from '@core/utils/filter'
import { initialAbility } from '@/libs/acl/config'
import { AUTH_LOGOUT } from '@/store/modules/auth'

export default {
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: 'auth-login' })
      })
      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
    },
  },
}
</script>
