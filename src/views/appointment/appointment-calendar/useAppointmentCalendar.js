import { ref, onMounted, computed, watch } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { useRouter } from '@core/utils/utils'

export const useAppointmentCalendar = () => {
  const { route } = useRouter()

  const refCalendar = ref(null)

  const calendarEvents = ref([])

  const eventColor = {
    'available': 'success',
    'reserved': 'warning'
  }


  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
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
    events: calendarEvents,
    dayMaxEvents: 3,
    eventClassNames({ event: calendarEvent }) {
      const variant = eventColor[calendarEvent._def.extendedProps.status]
      return [`bg-light-${variant}`]
    }
  })

  const isCalendarSidebarActive = ref(false)
  const isCalendarFormActive = ref(false)

  const mapEvents = (items) => {
    return items.map(item => {
      const { time, startTime, endTime, status } = item
      return {
        title: time,
        start: new Date(startTime),
        end: new Date(endTime),
        status: status
      }
    })
  }

  const updateCalendar = (data) => {
    // console.log(data)
    const result = data.map(item => {
      const { available, reserved } = item
      const availableDates = mapEvents(available)
      const reservedDates = mapEvents(reserved)
      return [availableDates, reservedDates].flat()
    })

    calendarEvents.value = result.flat()
  }

  return {
    refCalendar,
    calendarOptions,
    isCalendarSidebarActive,
    isCalendarFormActive,
    // calendarsColor: attentionTypeColor,
    updateCalendar
  }
}
