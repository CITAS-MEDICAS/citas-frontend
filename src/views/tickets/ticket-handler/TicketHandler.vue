<template>
  <b-modal
    :visible="isTicketHandlerActive"
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    centered
  >
    <section>
      <b-form-group label="Fecha">
        <b-form-input
          :readonly="true"
          :value="formData.calendar ? formData.calendar.date : null | getDate"
          placeholder="dd/mm/yyy"
          class="form-input"
        />
      </b-form-group>
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
    }
  },
  setup(props, { emit }) {
    const {
      formData,
      closeForm,
      handleSubmit,
    } = useTicketHandler(props, emit)


    return {
      formData,
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
