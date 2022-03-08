<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-0">
    <div class="p-2">
      <div>
        <h5 class="app-label section-label mb-1">
          CREAR CITA MÉDICA
        </h5>

        <validation-observer ref="refFormObserver">
          <fieldset class="form-group">
            <legend class="col-form-label">Asegurado</legend>
            <input class="form-control" readonly />
          </fieldset>

          <b-form-group v-show="false" label="Atención">
            <validation-provider v-slot="{ errors }" name="Atención">
              <v-select
                v-model="formData.attention_type_id"
                :options="attentionTypes"
                label="name"
                :reduce="item => item.id"
                placeholder="Selecciona..."
                :clearable="false"
                :disabled="true"
                @input="handleAvailability"
              />
            </validation-provider>
          </b-form-group>

          <b-form-group label="Tipo de Consulta">
            <validation-provider v-slot="{ errors }" name="Tipo de Consulta">
              <v-select
                v-model="formData.treatment_type_id"
                :options="treatmentTypes"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
              />
            </validation-provider>
          </b-form-group>

          <b-form-group label="Especialidad">
            <validation-provider v-slot="{ errors }" name="Especialidad" rules="required">
              <v-select
                v-model="formData.specialty"
                :options="specialties"
                label="name"
                :clearable="false"
                @input="handleMedicalCenter"
                placeholder="Selecciona..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Centro de Salud">
            <validation-provider v-slot="{ errors }" name="Centro de Salud" rules="required">
              <v-select
                v-model="formData.medical_center_id"
                :options="medicalCenters"
                label="name"
                :reduce="item => item.id"
                @input="handleMedicalUnit"
                placeholder="Selecciona..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Consultorio">
            <validation-provider v-slot="{ errors }" name="Consultorio">
              <v-select
                v-model="formData.medical_unit_id"
                :options="medicalUnits"
                label="name"
                :reduce="item => item.id"
                placeholder="Selecciona..."
                @input="handleAvailability"
              />
            </validation-provider>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group label="Fecha">
                <validation-provider v-slot="{ errors }" name="Fecha">
                  <v-select
                    v-model="formData.calendar"
                    :options="availableDatesMap"
                    label="date"
                    placeholder="Selecciona..."
                    :clearable="true"
                    @input="handleTimes"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Hora">
                <validation-provider v-slot="{ errors }" name="Hora">
                  <v-select
                    v-model="formData.time"
                    :options="availableTimes"
                    label="time"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Motivo de la Consulta">
            <validation-provider v-slot="{ errors }" name="Motivo de la Consulta" rules="required">
              <b-form-textarea v-model="formData.comment" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-button variant="primary" block class="mt-2" @click="handleSubmit">Guardar</b-button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { useMedicalAppointmentForm } from './useMedicalAppointmentForm'
import { required } from '@validations'

export default {
  name: 'CalendarSidebar',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  setup(props, { emit }) {
    const {
      treatmentTypes,
      formData,
      refFormObserver,
      specialties,
      medicalCenters,
      medicalUnits,
      attentionTypes,
      availableDates,
      availableDatesMap,
      availableTimes,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleTimes,
      handleSubmit
    } = useMedicalAppointmentForm(emit)

    return {
      formData,
      refFormObserver,
      required,
      treatmentTypes,
      specialties,
      medicalCenters,
      medicalUnits,
      attentionTypes,
      availableDates,
      availableDatesMap,
      availableTimes,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleTimes,
      handleSubmit
    }
  }
}
</script>

<style lang="scss"></style>
