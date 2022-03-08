<template>
  <div class="app-calendar overflow-hidden border">
    <div class="row no-gutters">
      <!--      Sidebar-->

      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{ show: isCalendarSidebarActive }"
      >
        <calendar-sidebar />
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

      <!-- Form-->
      <CalendarForm @submited="refetchEvents" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'

import { useCalendar } from './useCalendar'
import CalendarSidebar from './calendar-sidebar/CalendarSidebar'
import CalendarForm from './calendar-form/CalendarForm'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    CalendarSidebar,
    CalendarForm
  },

  setup() {
    const { refCalendar, calendarOptions, isCalendarSidebarActive, refetchEvents } = useCalendar()

    return {
      refCalendar,
      calendarOptions,
      isCalendarSidebarActive,
      refetchEvents
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/apps/calendar.scss';
</style>
