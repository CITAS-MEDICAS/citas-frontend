<template>
  <router-link :to="{
            name: 'insured-treatment-history',
            params: { treatmentId: item.treatment.id, },
            query: { cita: item.id }
          }">
    <b-button
      variant="flat-success"
      class="btn-icon "
    >
      <feather-icon icon="EyeIcon" />
      <small> Mostrar</small>
    </b-button>
  </router-link>
</template>

<script>
export default {
  name: 'ShowHistoryButton',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>