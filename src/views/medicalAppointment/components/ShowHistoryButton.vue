<template>
  <router-link :to="{
            name: 'insured-treatment-history',
            params: { treatmentId: item.treatment.id, },
            query: { activo: item.id }
          }">
    <b-button
      v-b-tooltip.hover.top="'Mostrar Historial de Citas Médicas'"
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
      required: true,
    }
  }
}
</script>