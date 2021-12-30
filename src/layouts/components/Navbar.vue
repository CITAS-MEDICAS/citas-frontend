<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">{{ getUser.fullname }}</p>
            <span class="user-status">Admin</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center" @click="handleLogout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logouts</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { AUTH_LOGOUT } from '@/store/modules/auth'
import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    handleLogout() {
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
