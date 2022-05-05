<template>
  <b-modal
    :visible="isTicketHandlerActive"
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    centered
    title="Confirme los datos para su Reserva"
  >
    <section>
      <h1>
        Fecha de Atención <br>
        <code>{{ formData.time ? formData.time.startTime : null }}</code>
      </h1>

      <h1 class="mt-2">
        Consultorio <br>
        <code>{{ medicalUnit }}</code>
      </h1>

    </section>
    <template #modal-footer>
      <b-button variant="outline-secondary" size="lg" @click="closeForm">Cancelar</b-button>
      <b-button variant="primary" size="lg" @click="handleSubmit">Imprimir Ticket</b-button>
    </template>
  </b-modal>
</template>

<script>
import { useTicketHandler } from './useTicketHandler'
import { inject } from '@vue/composition-api'
import { getDate } from '@/custom/filters'

export default {
  name: 'TicketHandler',
  filters: {
    getDate
  },
  props: {
    isTicketHandlerActive: {
      type: Boolean,
      required: true
    },
    selectedEvent: {
      type: Object,
      required: true
    },
    clearSelectedEvent: {
      type: Function,
      required: true
    },
    units: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const {
      formData,
      medicalUnit,
      closeForm,
      handleSubmit
    } = useTicketHandler(props, emit)


    return {
      formData,
      medicalUnit,
      closeForm,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.form-group::v-deep .col-form-label {
  font-size: 1.4rem;
  font-weight: 500;
}

.form-input {
  font-size: 1.714rem;
  padding: 2rem;
}
</style>
