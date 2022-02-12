import { ref, onMounted, computed, watch } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { useRouter } from '@core/utils/utils'

import store from '@/store'

export const useCalendar = () => {
  const { route } = useRouter()
  const medicalUnitId = route.value.params.id

  const refCalendar = ref(null)

  let calendarApi = null

  onMounted(() => {
    calendarApi = refCalendar.value.getApi()
    store.dispatch('calendar/ATTENTION_TYPES')
  })

  const refetchEvents = () => {
    calendarApi.refetchEvents()
  }

  const attentionTypeColor = computed(() => store.state.calendar.attentionTypeColor)

  const attentionSelected = computed(() => store.state.calendar.attentionSelected)
  watch(attentionSelected, () => {
    refetchEvents()
  })

  const fetchEvents = (info, successCallback) => {
    if (!info) return

    const { startStr, endStr } = info

    const query = {
      startDate: startStr.split('T')[0],
      endDate: endStr.split('T')[0],
      attentionSelected: attentionSelected.value,
    }

    store.dispatch('calendar/CALENDAR_EVENTS', { medicalUnitId, query }).then(({ data }) => {
      const events = data.calendar.rows.map(item => {
        return {
          title: item.attention_type.name,
          date: item.date,
          type: item.attention_type.name,
          start: new Date(`${item.date} ${item.start_time}`),
          end: new Date(`${item.date} ${item.end_time}`),
        }
      })
      successCallback(events)
    })
  }

  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    locale: esLocale,
    editable: false,
    customButtons: {
      sidebarToggle: {
        click() {
          isCalendarSidebarActive.value = !isCalendarSidebarActive.value
        },
      },
    },
    events: fetchEvents,
    dayMaxEvents: 3,
    eventClassNames({ event: calendarEvent }) {
      const variant = attentionTypeColor.value[calendarEvent._def.extendedProps.type]
      return [`bg-light-${variant}`]
    },
  })

  const isCalendarSidebarActive = ref(false)
  const isCalendarFormActive = ref(false)

  return {
    refCalendar,
    calendarOptions,
    isCalendarSidebarActive,
    isCalendarFormActive,
    calendarsColor: attentionTypeColor,
    refetchEvents,
  }
}
