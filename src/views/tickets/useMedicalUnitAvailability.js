import { CalendarResource } from '@/network/lib/calendar'
import { ref } from '@vue/composition-api'

export const useMedicalUnitAvailability = emit => {
  const unitAvailability = ref([])
  const availableDates = ref([])

  const fetchUnitAvailability = async (medicalUnitId, attentionTypeId) => {
    console.log("fetchUnitAvailability")
    const { data } = await CalendarResource.availability(medicalUnitId, { attentionTypeId })
    // let data3 = data2.filter(stu => stu.date = '2023-08-30')
    // console.log(data2)
    unitAvailability.value = data

    mapAvailableDates(data)
  }

  const filterUnitAvailabilityByDate = date => {
    return unitAvailability.value.filter(item => item.date === date && item.status === 'open')
    console.log("filterUnitAvailabilityByDate")
  }

  const mapAvailableDates = data => {
    console.log(data)
    availableDates.value = data.map(({ calendar_id, date, duration, status }) => {
      return {
        calendar_id,
        date,
        duration,
        status,
      }
    })
    console.log(availableDates.value)
  }

  return {
    availableDates,
    fetchUnitAvailability,
    filterUnitAvailabilityByDate,
    mapAvailableDates,
  }
}
