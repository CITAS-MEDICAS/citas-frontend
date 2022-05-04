import { CalendarResource } from '@/network/lib/calendar'
import { ref } from '@vue/composition-api'

export const useMedicalUnitAvailability = emit => {
  const unitAvailability = ref([])
  const availableDates = ref([])

  const fetchUnitAvailability = async (medicalUnitId, attentionTypeId) => {
    const { data } = await CalendarResource.availability(medicalUnitId, { attentionTypeId })
    // availableDates.value = data
    // availableDatesMap.value = data.map(item => {
    //   const { calendar_id, date, duration, status } = item
    //   return {
    //     calendar_id,
    //     date,
    //     duration,
    //     status,
    //   }
    // })
    unitAvailability.value = data
    mapAvailableDates(data)
  }

  const filterUnitAvailabilityByDate = date => {
    return unitAvailability.value.filter(item => item.date === date && item.status === 'open')
  }

  const mapAvailableDates = data => {
    availableDates.value = data.map(({ calendar_id, date, duration, status }) => {
      return {
        calendar_id,
        date,
        duration,
        status
      }
    })
  }

  return {
    availableDates,
    fetchUnitAvailability,
    filterUnitAvailabilityByDate,
    mapAvailableDates
  }
}
