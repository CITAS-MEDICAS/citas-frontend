<template>
  <div class="app-calendar overflow-hidden border">
    <div class="row no-gutters">
      <!--      Sidebar-->

      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{ show: isCalendarSidebarActive }"
      >
        <AppointmentForm />
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

import { useAppointmentCalendar } from './useAppointmentCalendar'
import AppointmentForm from './appointment-form/AppointmentForm'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    AppointmentForm
  },

  setup() {
    const { refCalendar, calendarOptions, isCalendarSidebarActive, refetchEvents } = useAppointmentCalendar()

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
@import '~@core/scss/base/bootstrap-extended/include';
// Bootstrap includes
@import '~@core/scss/base/components/include';
// Components includes

@import 'appointment-calendar';

// Color palettes
@import '~@core/scss/base/core/colors/palette-variables.scss';

.fc-sidebarToggle-button {
  // content: '';
  background-image: url(str-replace(str-replace($menu, 'currentColor', $body-color), '#', '%23'));
  width: 25px;
  height: 25px;
  margin-right: 0.7rem !important;
  display: block;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
