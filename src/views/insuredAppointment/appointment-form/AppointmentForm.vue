<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-0">
    <div class="p-2">
      <div>
        <h5 class="app-label section-label mb-1">
          CREAR CITA MÉDICA
        </h5>

        <validation-observer ref="refFormObserver">
          <b-form-group label="Asegurado">
            <input type="text" class="form-control" :value="insuredUser ? insuredUser.fullname : ''" readonly>
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

          <b-form-group label="Especialidad *">
            <validation-provider v-slot="{ errors }" name="Especialidad" rules="required">
              <v-select
                v-model="formData.specialty"
                :options="specialties"
                label="name"
                :clearable="false"
                placeholder="Selecciona..."
                @input="handleMedicalCenter"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Centro de Salud *">
            <validation-provider v-slot="{ errors }" name="Centro de Salud" rules="required">
              <v-select
                v-model="formData.medical_center_id"
                :options="medicalCenters"
                label="name"
                :reduce="item => item.id"
                placeholder="Selecciona..."
                @input="handleMedicalUnit"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group v-if="isFamiliar" label="Consultorio *">
            <validation-provider v-slot="{ errors }" name="Consultorio" rules="required">
              <v-select
                v-model="formData.medical_unit_id"
                :options="medicalUnits"
                label="name"
                :reduce="item => item.id"
                placeholder="Selecciona..."
                @input="handleAvailability"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-row v-if="isFamiliar">
            <b-col>
              <b-form-group label="Fecha *" rules="required">
                <validation-provider v-slot="{ errors }" name="Fecha" rules="required">
                  <v-select
                    v-model="formData.calendar"
                    :options="availableDatesMap"
                    label="date"
                    placeholder="Selecciona..."
                    :clearable="false"
                    @input="goToDate"
                  >
                    <template #option="option">
                      {{ option.date | getDate }}
                    </template>
                    <template #selected-option="option">
                      {{ option.date | getDate }}
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Hora *">
                <validation-provider v-slot="{ errors }" name="Hora" rules="required">
                  <v-select
                    v-model="formData.time"
                    :options="availableTimes"
                    label="time"
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label="Motivo de la Consulta *">
            <validation-provider v-slot="{ errors }" name="Motivo de la Consulta" rules="required">
              <b-form-textarea v-model="formData.reason" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-button v-b-modal.modal-center variant="primary" block class="mt-2">Guardar</b-button>
          <b-modal
            id="modal-center"
            centered
            title="Citas Médicas"
            ok-only
            ok-title="Cancelar"
            ok-variant="secondary"
          >
            <b-card-text>
              Se Creara la cita, recuerde que debe estar 10 minutos antes en la cita medica.
              Solo puede cancelar 24hrs Antes. si no acude a la cita será penalizado.
            </b-card-text>
            <b-button v-b-modal.modal-center variant="success" block class="mt-2" @click="handleSubmit">Aceptar y crear la cita médica</b-button>
          </b-modal>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { useAppointmentForm } from './useAppointmentForm'
import { required } from '@validations'
import { getDate } from '@/custom/filters'

export default {
  name: 'CalendarSidebar',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  filters: {
    getDate
  },
  setup(props, { emit }) {
    const {
      insuredUser,
      treatmentTypes,
      formData,
      refFormObserver,
      specialties,
      medicalCenters,
      medicalUnits,
      availableDates,
      availableDatesMap,
      availableTimes,
      isFamiliar,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleSubmit,
      goToDate
    } = useAppointmentForm(emit)

    return {
      insuredUser,
      formData,
      refFormObserver,
      required,
      treatmentTypes,
      specialties,
      medicalCenters,
      medicalUnits,
      availableDates,
      availableDatesMap,
      availableTimes,
      isFamiliar,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleSubmit,
      goToDate
    }
  }
}
</script>

<style lang="scss"></style>
