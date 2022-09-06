<template>
  <b-modal
    id="transfer-appointment-form"
    no-close-on-backdrop
    hide-header-close
    no-close-on-esc
    size="lg"
    title="Transferir Citas"
  >
    <validation-observer ref="refFormObserver">
      <b-row>
        <b-col sm="6">
          <h4>Origen</h4>
          <b-form-group label="Centro Origen">
            <validation-provider v-slot="{ errors }" name="Centro Origen" rules="required">
              <v-select
                v-model="formData.origin_center_id"
                :options="centers"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
                @input="changeCenter"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Consultorio Origen">
            <validation-provider v-slot="{ errors }" name="Consultorio Origen" rules="required">
              <v-select
                v-model="formData.origin_unit_id"
                :options="originUnits"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
                @input="changeUnit"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <h4>Destino</h4>
          <b-form-group label="Centro Destino">
            <validation-provider v-slot="{ errors }" name="Centro Destino" rules="required">
              <v-select
                v-model="formData.destination_center_id"
                :options="centers"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
                :disabled="true"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Consultorio Destino">
            <validation-provider v-slot="{ errors }" name="Consultorio Destino" rules="required">
              <v-select
                v-model="formData.destination_unit_id"
                :options="destinationUnits"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import { required } from '@validations'
import { useTransferAppointmentForm } from './useTransferAppointmentForm'

export default {
  name: 'TransferAppointmentForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  setup() {
    const {
      formData,
      selectedAppointments,
      centers,
      originUnits,
      destinationUnits,
      changeCenter,
      changeUnit
    } = useTransferAppointmentForm()

    return {
      formData,
      selectedAppointments,
      centers,
      originUnits,
      destinationUnits,
      required,
      changeCenter,
      changeUnit
    }
  }

}
</script>