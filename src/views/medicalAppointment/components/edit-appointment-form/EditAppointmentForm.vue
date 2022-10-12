<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-0">
    <div class="p-2">
      <div>
        <h5 class="app-label section-label mb-1">
          EDITAR CITA MÉDICA
        </h5>

        <validation-observer ref="refFormObserver">
          <fieldset class="form-group">
            <legend class="col-form-label">Asegurado</legend>
            <input class="form-control" :value="patientName" readonly />
          </fieldset>
<!--          <pre>{{formData}}</pre>-->
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

<!--          <b-form-group v-if="$can('delete', PERMISSION_MEDICAL_UNIT_CALENDAR)"         label="Calendario Tipo *">-->
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

          <b-form-group label="Consultorio *">
            <validation-provider v-slot="{ errors }" name="Consultorio"  rules="required">
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

          <b-form-group label="Calendario Tipo *">
            <validation-provider v-slot="{ errors }" name="Especialidad" rules="required">
              <v-select
                v-model="formData.attention"
                :options="calendarTypes"
                label="name"
                :clearable="false"
                placeholder="Selecciona..."
                @input="handleAttention"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group label="Fecha *">
                <validation-provider v-slot="{ errors }" name="Fecha" rules="required">
                  <v-select
                    v-model="formData.calendar"
                    :options="availableDatesMap"
                    label="date"
                    placeholder="Selecciona..."
                    :clearable="true"
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

          <b-button variant="primary" block class="mt-2" @click="handleSubmit">Guardar</b-button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { useEditAppointmentForm } from './useEditAppointmentForm'
import { required } from '@validations'
import { getDate } from '@/custom/filters'
import { PERMISSION_MEDICAL_UNIT_CALENDAR } from '@/permissions'
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
      patientName,
      formData,
      refFormObserver,
      specialties,
      calendarTypes,
      handleAttention,
      medicalCenters,
      medicalUnits,
      availableDates,
      availableDatesMap,
      availableTimes,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleSubmit,
      goToDate
    } = useEditAppointmentForm(emit)

    return {
      patientName,
      formData,
      refFormObserver,
      required,
      specialties,
      calendarTypes,
      handleAttention,
      medicalCenters,
      medicalUnits,
      availableDates,
      availableDatesMap,
      availableTimes,
      handleMedicalCenter,
      handleMedicalUnit,
      handleAvailability,
      handleSubmit,
      goToDate,
      PERMISSION_MEDICAL_UNIT_CALENDAR
    }
  }
}
</script>

<style lang="scss"></style>
