<template>
  <section>
    <component :is="appointmentList" />
  </section>
</template>

<script>
export default {
  name: 'MedicalAppointmentList',
  components: {
    DoctorList: () => import('./components/DoctorAppointmentList'),
    AdminList: () => import('./components/AdminAppointmentList'),
    PersonalList: () => import('./components/PersonalAppointmentList'),
  },
  data() {
    return {
      doctorRoles: ['medico', 'enfermera'],
      adminRoles: ['superadmin', 'administrador', 'estadistico','trabajo-social','soporte-informatico'],
      personalRoles: ['policia']
    }
  },
  computed: {
    appointmentList() {
      const activeRole = this.$store.state.user.activeRole.role
      return this.resolveComponent(activeRole)
    }
  },
  methods: {
    resolveComponent(role) {
      if (this.doctorRoles.includes(role)) return 'DoctorList'
      if (this.adminRoles.includes(role)) return 'AdminList'
      if (this.personalRoles.includes(role)) return 'PersonalList'
    }
  }
}
</script>

<style scoped></style>
