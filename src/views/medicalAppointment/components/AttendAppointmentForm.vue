<template>
  <b-modal id="attend-appointment-form"
           centered
           no-close-on-backdrop
           title="Cita Médica"
  >
    <validation-observer ref="refFormObserver">
      <b-form-group label="Estado de la Consulta *">
        <validation-provider v-slot="{ errors }" name="Estado de la Consulta" rules="required">
          <b-form-radio-group
            v-model="form.appointment_status_id"
            :options="appointment_statuses"
            name="accountType"
            class="mt-1"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>

      <b-form-group v-if="form.appointment_status_id==59" label="Diagnostico">
        <b-textarea v-model="form.diagnostic" />
      </b-form-group>

      <b-form-group label="Observaciones">
        <b-textarea v-model="form.comment" />
      </b-form-group>
    </validation-observer>
    <div class="demo-spacing-0">
      <b-alert
        variant="danger"
        show
      >
        <div class="alert-body">
          <span><strong>ATENCIÓN : </strong> Debe estar seguro de registrar la cita, no se pueden revertir los cambios.</span>
        </div>
      </b-alert>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right ml-1" @click="handleSubmit">
          Guardar
        </b-button>
        <b-button variant="outline-secondary" class="float-right" @click="closeForm">
          Cerrar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { ref } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import { required } from '@validations'
import { AppointmentResource } from '@/network/lib/appointment'

export default {
  name: 'AttendAppointmentForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    appointment_statuses() {
      const statuses = this.$store.state.types.appointmentStatuses
      return statuses.filter(item => {
        return ['ATENDIDO', 'NO SE PRESENTO'].includes(item.name)
      }).map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('types/APPOINTMENT_STATUS')
  },
  setup() {
    const refFormObserver = ref(null)
    const appointmentId = ref(null)
    const form = ref({
      appointment_status_id: null,
      diagnostic: null,
      comment: null
    })
    return {
      appointmentId,
      form,
      refFormObserver,
      required
    }
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.refFormObserver.validate()
      if (!valid) return false


      const { data } = await AppointmentResource.updateStatus(this.appointmentId, this.form)
      if (data.appointment) {
        this.$emit('update-list')
        this.closeForm()
      }
    },
    setAppointment(id) {
      this.appointmentId = id
      this.resetForm()
    },
    resetForm() {
      this.form = {
        appointment_status_id: null,
        diagnostic: null,
        comment: null
      }
    },
    closeForm() {
      this.$bvModal.hide('attend-appointment-form')
    }
  }
}
</script>
