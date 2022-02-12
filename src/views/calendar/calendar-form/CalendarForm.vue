<template>
  <b-modal
    id="calendar-form"
    v-model="showForm"
    centered
    no-close-on-backdrop
    size="lg"
    title="Generar Calendario"
  >
    <validation-observer ref="refFormObserver">
      <b-row>
        <b-col md="6">
          <b-form-group label="Tipo de atención">
            <validation-provider v-slot="{ errors }" name="Tipo de Atención" rules="required">
              <v-select
                v-model="form.attentionType"
                :options="attentionTypes"
                label="name"
                :reduce="item => item.id"
                :clearable="false"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-row>
            <b-col sm="12">
              <div class="col-form-label">Fecha</div>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <validation-provider v-slot="{ errors }" name="Fecha Desde" rules="required">
                  <small>Desde</small>
                  <b-form-input
                    v-model="form.startDate"
                    type="date"
                    :min="today"
                    :max="form.endDate"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <validation-provider v-slot="{ errors }" name="Fecha Hasta" rules="required">
                  <small>Hasta</small>
                  <b-form-input v-model="form.endDate" type="date" :min="form.startDate" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="12">
              <div class="col-form-label">Horario de Atención</div>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <validation-provider v-slot="{ errors }" name="Horario Desde" rules="required">
                  <small>Desde</small>
                  <time-select
                    v-model="form.startTime"
                    :picker-options="pickerOptions"
                    placeholder="hh:mm"
                    @change="handleTimeChange"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <validation-provider v-slot="{ errors }" name="Horario Hasta" rules="required">
                  <small>Hasta</small>
                  <time-select
                    v-model="form.endTime"
                    :picker-options="pickerOptions"
                    placeholder="hh:mm"
                    @change="handleTimeChange"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group>
                <validation-provider v-slot="{ errors }" name="Duración Consulta" rules="required">
                  <label class="col-form-label">Duración Consulta</label>
                  <small class="ml-1 text-muted">(minutos)</small>
                  <b-form-input
                    v-model="form.duration"
                    type="number"
                    min="0"
                    max="60"
                    :state="errors.length ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6">
          <b-row v-for="(day, idx) in calendarDays" :key="idx" class="mb-1">
            <b-col>
              <b-form-checkbox
                v-model="day.checked"
                class="custom-control-primary"
                style="margin-top: 7px"
                @change="handleTimeDayChange(day)"
              >
                <small>{{ day.name }}</small>
              </b-form-checkbox>
            </b-col>
            <b-col>
              <time-select
                v-model="day.startTime"
                :picker-options="pickerOptions"
                placeholder="Desde"
                :disabled="!day.checked"
              />
            </b-col>
            <b-col>
              <time-select
                v-model="day.endTime"
                :picker-options="pickerOptions"
                placeholder="Hasta"
                :disabled="!day.checked"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </validation-observer>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { ref } from '@vue/composition-api'

import { useCalendarForm } from '@/views/calendar/calendar-form/useCalendarForm'
import { dateISO } from '@/libs/utils'
import TimeSelect from '@/custom/components/time-select/TimeSelect'
import { CalendarResource } from '@/network/lib/calendar'

const now = new Date()
const today = dateISO(now)

export default {
  name: 'CalendarForm',
  components: { TimeSelect, ValidationObserver, ValidationProvider },
  data() {
    return {
      medicalUnitId: this.$route.params.id,
      selectedDays: [],
      today: today,
      showForm: false,
      pickerOptions: {
        start: '06:00',
        end: '23:00',
        step: '00:20',
        minTime: '09:00',
      },
    }
  },

  setup() {
    const { calendarDays, attentionTypes } = useCalendarForm()
    const refFormObserver = ref(null)
    const form = ref({
      attentionType: null,
      startDate: today,
      endDate: null,
      startTime: null,
      endTime: null,
      duration: null,
      calendarDays,
    })

    return { refFormObserver, form, calendarDays, required, attentionTypes }
  },
  methods: {
    handleTimeChange(value) {
      this.calendarDays.forEach(item => {
        if (item.checked) {
          item.startTime = this.form.startTime
          item.endTime = this.form.endTime
        }
      })
    },
    handleTimeDayChange(day) {
      day.startTime = null
      day.endTime = null

      if (day.checked) {
        day.startTime = this.form.startTime
        day.endTime = this.form.endTime
      }
    },
    async handleSubmit() {
      const valid = await this.$refs.refFormObserver.validate()
      if (!valid) return false

      const { data } = await CalendarResource.storeCalendar(this.medicalUnitId, this.form)

      if (data.hasOwnProperty('calendar')) {
        this.$emit('submited', true)
        this.closeForm()
      }
    },
    closeForm() {
      this.showForm = false
    },
  },
}
</script>

<style scoped></style>
