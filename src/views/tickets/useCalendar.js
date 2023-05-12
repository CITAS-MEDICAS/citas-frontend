import { onMounted, ref } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'

export const useCalendar = () => {
  const refCalendar = ref(null)
  let calendarApi = null

  onMounted(() => {
    calendarApi = refCalendar.value.getApi()
  })

  const selectedEvent = ref({})
  const clearSelectedEvent = () => {
    selectedEvent.value = {}
  }

  const calendarEvents = ref([])

  const eventColor = {
    available: 'success',
    reserved: 'warning',
  }

  const grabEventDataFromEventApi = eventApi => {
    const {
      id,
      title,
      start,
      end,
      extendedProps: { calendarDate, calendarId, status },
      allDay,
    } = eventApi

    return {
      id,
      title,
      start,
      end,
      extendedProps: { calendarDate, calendarId, status },
      allDay,
    }
  }

  const calendarOptions = ref({
    // timeZone: 'America/La_Paz',
    expandRows: true,
    plugins: [listPlugin],
    initialView: 'listMonth',
    headerToolbar: {
      start: 'prev,next,title',
      end: 'listMonth',
    },
    locale: esLocale,
    editable: false,
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
      meridiem: 'short',
    },
  })

  const mapEvents = (items, calendar) => {
    return items.map(item => {
      console.log("mapEvents")
      const { time, startTime, endTime, status } = item
      return {
        title: status === 'available' ? 'Disponible' : 'Reservado',
        start: new Date(startTime),
        end: new Date(endTime),
        status: status,
        calendarId: calendar.calendar_id,
        calendarDate: calendar.date,
      }
    })
  }

  const updateCalendar = data => {
    console.log("updateCalendar")
    const result = data.map(item => {
      const { available, reserved } = item
      const availableDates = mapEvents(available, item)
      const reservedDates = mapEvents(reserved, item)
      return [availableDates, reservedDates].flat()
    })

    calendarEvents.value = result.flat()
  }

  const clearEvents = () => {
    console.log("clearEvents")
    calendarEvents.value = []
  }

  const goToDate = dateStr => {
    console.log("goToDate")
    calendarApi.gotoDate(new Date(dateStr))
  }

  return {
    refCalendar,
    calendarOptions,
    selectedEvent,
    clearEvents,
    clearSelectedEvent,
    updateCalendar,
    goToDate,
    grabEventDataFromEventApi,
  }
}
