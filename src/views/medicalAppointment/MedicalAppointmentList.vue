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
    PersonalList: () => import('./components/PersonalAppointmentList'),
  },
  data() {
    return {
      doctorRoles: ['medico', 'enfermera'],
      personalRoles: ['superadmin', 'administrador', 'estadistico','trabajo-social']
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
      if (this.personalRoles.includes(role)) return 'PersonalList'
    }
  }
}
</script>

<style scoped></style>
