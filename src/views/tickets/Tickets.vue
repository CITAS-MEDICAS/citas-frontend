<template>
  <section class="app-calendar overflow-hidden border">
    <b-row>
      <b-col md="4" class="py-4 px-3">
        <h1>Disponibilidad</h1>
        <b-form-group label="Código Patronal / Cédula de Identidad" class="mt-3">
          <v-select
            v-model="formData.user_patient_id"
            :filterable="false"
            label="id"
            :options="users"
            :reduce="item => item.user_id"
            placeholder="11-222-1234567 / 6002003-A"
            @search="onSearchInsured"
            @input="handleSelect"
          >
            <template #search="{ attributes, events }">
              <input
                maxlength="20"
                class="vs__search"
                v-bind="attributes"
                v-on="events"
              />
            </template>
            <template #no-options><h4>No se encontraron resultados...</h4></template>
            <template slot="option" slot-scope="option">
              <h2>
                <code>CI: {{ option.user.ci }} <br></code>
                <code>Código: {{ option.employer_code }} <br></code>
                {{ option.user.fullname }}
              </h2>
            </template>
            <template slot="selected-option" slot-scope="option">
              <h2>
                <code>CI: {{ option.user.ci }} <br></code>
                <code>Código: {{ option.employer_code }} <br></code>
                {{ option.user.fullname }}
              </h2>
            </template>
          </v-select>
        </b-form-group>
        <b-form-group label="Consultorio" class="mt-3">
          <v-select
            v-model="formData.medical_unit_id"
            :options="units"
            :reduce="item => item.id"
            :clearable="false"
            label="name"
            placeholder="Consultorio-1"
            @input="handleAvailability"
          >
            <template #search="{ attributes, events }">
              <input
                maxlength="20"
                class="vs__search"
                v-bind="attributes"
                v-on="events"
              />
            </template>
            <template #no-options><h4>No se encontraron resultados...</h4></template>
            <template slot="option" slot-scope="option">
              <h2>{{ option.name }}</h2>
            </template>
            <template slot="selected-option" slot-scope="option">
              <h2>{{ option.name }}</h2>
            </template>
          </v-select>
        </b-form-group>
        <b-form-group label="Fecha" class="mt-3">
          <v-select
            v-model="formData.calendar"
            :options="availableDates"
            label="date"
            placeholder="Selecciona..."
            :clearable="false"
            @input="handleDateAvailability(formData.calendar.date)"
          >
            <template #option="option">
              {{ option.date | getDate }}
            </template>
            <template #selected-option="option">
              {{ option.date | getDate }}
            </template>
          </v-select>
        </b-form-group>
      </b-col>
      <b-col md="8">
        <div class="py-2 pr-3">
          <full-calendar
            ref="refCalendar"
            :options="calendarOptions"
            class="full-calendar"
            @update-calendar="updateCalendar"
          />
        </div>
      </b-col>
    </b-row>
    <ticket-handler
      :is-ticket-handler-active="isTicketHandlerActive"
      :selected-event="selectedEvent"
      :clear-selected-event="clearSelectedEvent"
      @set-visible="setVisible"
    />
  </section>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import { useCalendar } from './useCalendar'
import { useMedicalUnitAvailability } from './useMedicalUnitAvailability'
import { useTickets } from './useTickets'
import { dateISO, debounce } from '@/libs/utils'
import { InsuredResource } from '@/network/lib/insured'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import TicketHandler from '@/views/tickets/ticket-handler/TicketHandler'
import { provide, ref } from '@vue/composition-api'
import { getDate } from '@/custom/filters'

export default {
  name: 'Tickets',
  components: {
    FullCalendar,
    TicketHandler
  },
  filters: {
    getDate
  },
  setup(props, { emit }) {
    const {
      isTicketHandlerActive,
      emptyFormData,
      formData,
      users,
      units,
      today,
      setVisible
    } = useTickets()

    const {
      refCalendar,
      calendarOptions,
      selectedEvent,
      clearSelectedEvent,
      updateCalendar,
      grabEventDataFromEventApi,
      goToDate
    } = useCalendar()

    const {
      unitAvailability,
      availableDates,
      fetchUnitAvailability,
      filterUnitAvailabilityByDate
    } = useMedicalUnitAvailability(emit)

    calendarOptions.value.editable = true
    calendarOptions.value.eventClick = ({ event: clickedEvent }) => {
      selectedEvent.value = grabEventDataFromEventApi(clickedEvent)
      if (selectedEvent.value.extendedProps.status === 'available') {
        const { start, end } = selectedEvent.value
        formData.value.time = {
          startTime: start,
          endTime: end
        }
        isTicketHandlerActive.value = true
      }
    }

    return {
      isTicketHandlerActive,
      emptyFormData,
      formData,
      users,
      units,
      today,
      setVisible,

      refCalendar,
      calendarOptions,
      selectedEvent,
      clearSelectedEvent,
      updateCalendar,
      goToDate,

      unitAvailability,
      availableDates,
      fetchUnitAvailability,
      filterUnitAvailabilityByDate
    }
  },
  mounted() {
    this.fetchMedicalUnit()
  },
  methods: {
    onSearchInsured(term, loading) {
      if (term.length > 5) {
        loading(true)
        this.searchInsured(loading, term, this)
      }
    },
    searchInsured: debounce(async (loading, term, vm) => {
      const { data } = await InsuredResource.getAll({
        scope: `searchCodeCI:${term}`,
        include: 'user'
      })
      loading(false)
      vm.users = data.rows
    }, 500),
    handleSelect() {

    },
    async fetchMedicalUnit() {
      const { data } = await MedicalUnitResource.getAll({
        scope: 'authCenter'
      })
      this.units = data.rows
    },
    async handleAvailability() {
      if (!this.formData.medical_unit_id) {
        return this.updateCalendar([])
      }
      this.formData.medical_center_id = this.units.find(item => item.id === this.formData.medical_unit_id).medical_center_id
      // TODO: get from api ATTENTION_TYPE_ID
      const ATTENTION_TYPE_ID = 51
      await this.fetchUnitAvailability(this.formData.medical_unit_id, ATTENTION_TYPE_ID)
    },
    handleDateAvailability(strDate) {
      const data = this.filterUnitAvailabilityByDate(strDate)
      this.updateCalendar(data)
      this.goToDate(strDate)
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
</style>

<style scoped>
.form-group::v-deep .col-form-label {
  font-size: 1.4rem;
  font-weight: 500;
}

.vs__search {
  font-size: 1.714rem;
}

.form-input {
  font-size: 1.714rem;
  padding: 2rem;
}

.app-calendar {
  font-size: 2rem;
}
</style>
