import { ref, onMounted, computed, watch } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import { useRouter } from '@core/utils/utils'

export const useAppointmentCalendar = () => {
  const { route } = useRouter()

  const refCalendar = ref(null)

  let calendarApi = null

  onMounted(() => {
    calendarApi = refCalendar.value.getApi()
  })

  const calendarEvents = ref([])

  const eventColor = {
    'available': 'success',
    'reserved': 'warning'
  }

  const calendarOptions = ref({
    timeZone: 'America/La_Paz',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'sidebarToggle,prev,next,title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    locale: esLocale,
    editable: false,
    customButtons: {
      sidebarToggle: {
        click() {
          isCalendarSidebarActive.value = !isCalendarSidebarActive.value
        }
      }
    },
    allDaySlot: false,
    events: calendarEvents,
    dayMaxEvents: 3,
    eventClassNames({ event: calendarEvent }) {
      const variant = eventColor[calendarEvent._def.extendedProps.status]
      return [`bg-light-${variant}`]
    },
    displayEventTime: true,
    displayEventEnd: true,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    }
  })

  const isCalendarSidebarActive = ref(false)
  const isCalendarFormActive = ref(false)

  const mapEvents = (items) => {
    return items.map(item => {
      const { time, startTime, endTime, status } = item
      return {
        title: status == 'available' ? 'Disponible' : 'Reservado',
        start: new Date(startTime),
        end: new Date(endTime),
        status: status
      }
    })
  }

  const updateCalendar = (data) => {
    const result = data.map(item => {
      const { available, reserved } = item
      const availableDates = mapEvents(available)
      const reservedDates = mapEvents(reserved)
      return [availableDates, reservedDates].flat()
    })

    calendarEvents.value = result.flat()
  }

  const goToDate = (dateStr) => {
    calendarApi.gotoDate(new Date(dateStr))
  }

  return {
    refCalendar,
    calendarOptions,
    isCalendarSidebarActive,
    isCalendarFormActive,
    // calendarsColor: attentionTypeColor,
    goToDate,
    updateCalendar
  }
}
