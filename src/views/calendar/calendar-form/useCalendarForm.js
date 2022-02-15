import { computed, ref } from '@vue/composition-api'
import store from '@/store'

export const useCalendarForm = () => {
  const weekDays = [
    { name: 'Lunes', dayNumber: 1 },
    { name: 'Martes', dayNumber: 2 },
    { name: 'Miercoles', dayNumber: 3 },
    { name: 'Jueves', dayNumber: 4 },
    { name: 'Viernes', dayNumber: 5 },
    { name: 'Sabado', dayNumber: 6 },
    { name: 'Domingo', dayNumber: 0 },
    { name: 'Festivos', dayNumber: 7 },
  ]

  const calendarDays = weekDays.map((day, idx) => {
    return {
      ...day,
      checked: idx < 5,
      startTime: null,
      endTime: null,
    }
  })

  const attentionTypes = computed(() => store.state.calendar.attentionTypes)

  return {
    calendarDays: ref(calendarDays),
    attentionTypes,
  }
}
