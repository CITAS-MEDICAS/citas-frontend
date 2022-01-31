<template>
  <b-badge v-if="role" :key="role.id" :variant="roleVariant[role.name]" class="mr-1">
    {{ role.display_name }}
  </b-badge>
</template>

<script>
export default {
  name: 'RoleVariant',
  props: {
    role: {
      type: string,
      required: true,
    },
  },
  data() {
    return {
      roleVariant: {
        superadmin: 'dark',
        administrador: 'danger',
        medico: 'info',
        asegurado: 'warning',
      },
    }
  },
}
</script>
