<template>
  <div class="app-calendar overflow-hidden border">
    <div class="row no-gutters">
      <!--      Sidebar-->

      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{ show: isCalendarSidebarActive }"
      >
        <edit-appointment-form
          @update-calendar="updateCalendar"
          @go-to-date="goToDate"
        />
      </div>

      <!-- Calendar-->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" />
          </div>
        </div>
      </div>

      <div
        class="body-content-overlay"
        :class="{ show: isCalendarSidebarActive }"
        @click="isCalendarSidebarActive = false"
      />

    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'

import { useAppointmentCalendar } from './components/appointment-calendar/useAppointmentCalendar'
import EditAppointmentForm from './components/edit-appointment-form/EditAppointmentForm'

export default {
  name: 'MedicalAppointmentEdit',
  components: {
    FullCalendar,
    EditAppointmentForm
  },

  setup() {
    const {
      refCalendar,
      calendarOptions,
      isCalendarSidebarActive,
      refetchEvents,
      goToDate,
      updateCalendar,
    } = useAppointmentCalendar()

    return {
      refCalendar,
      calendarOptions,
      isCalendarSidebarActive,
      refetchEvents,
      goToDate,
      updateCalendar
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
</style>
