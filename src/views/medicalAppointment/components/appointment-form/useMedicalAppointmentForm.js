import { computed, onMounted, ref } from '@vue/composition-api'
import store from '@/store'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import { CalendarResource } from '@/network/lib/calendar'
import { useRouter } from '@core/utils/utils'
import { AppointmentResource } from '@/network/lib/appointment'


export const useMedicalAppointmentForm = (emit) => {
  const { route, router } = useRouter()
  const treatmentId = route.value.params.treatmentId

  const formData = ref({
    treatment_id: treatmentId,
    attention_type_id: null,
    treatment_type_id: null,
    specialty: null,
    medical_center_id: null,
    medical_unit_id: null,
    calendar: null,
    time: null,
    comment: ''
  })

  const refFormObserver = ref(null)
  const medicalCenters = ref([])
  const medicalUnits = ref([])
  const availableDates = ref([])
  const availableDatesMap = ref([])

  onMounted(() => {
    store.dispatch('types/TREATMENT_TYPE')
    store.dispatch('types/ATTENTION_TYPE')
    store.dispatch('types/SPECIALTIES', {
      scope: 'specialties,hasUnit'
    })
  })

  const treatmentTypes = computed(() => {
    const data = store.state.types.treatmentTypes
    formData.value.treatment_type_id = data.length ? data[0].id : null
    return data
  })

  const attentionTypes = computed(() => {
    const attention = store.state.types.attentionTypes
    if (attention.length) {
      // TODO: Changes depending on the role
      formData.value.attention_type_id = attention.find(item => item.name === route.value.meta.attentionType).id
    }
    return attention
  })

  const specialties = computed(() => {
    return store.state.types.specialties
  })

  const availableTimes = computed(() => {
    if (availableDates.value.length && formData.value.calendar) {
      return availableDates.value.find(item => item.calendar_id === formData.value.calendar.calendar_id).available
    }
    return []
  })

  const fetchMedicalCenter = async () => {
    formData.value.medical_center_id = null
    formData.value.medical_unit_id = null

    const { data } = await MedicalCenterResource.getAll({
      scope: `hasSpecialty:${formData.value.specialty.id}`,
      sortByAsc: 'name'
    })

    if (data.total_data) {
      formData.value.medical_center_id = data.rows[0].id
      await handleMedicalUnit()
    }
    return data.rows
  }

  const fetchMedicalUnit = async () => {
    formData.value.medical_unit_id = null
    const { data } = await MedicalUnitResource.getAll({
      scope: [
        `hasCenter:${formData.value.medical_center_id}`,
        `hasSpecialty:${formData.value.specialty.id}`,
        'isEnabled'
      ].join(',')
    })
    return data.rows
  }

  const handleMedicalCenter = async () => {
    medicalCenters.value = await fetchMedicalCenter()
  }

  const handleMedicalUnit = async () => {
    medicalUnits.value = await fetchMedicalUnit()
  }

  const handleAvailability = async () => {
    const medicalUnitId = formData.value.medical_unit_id
    const attentionTypeId = formData.value.attention_type_id
    if (medicalUnitId && attentionTypeId) {
      const { data } = await CalendarResource.availability(medicalUnitId, { attentionTypeId })
      availableDates.value = data
      availableDatesMap.value = data.map(item => {
        const { calendar_id, date, duration, status } = item
        return {
          calendar_id, date, duration, status
        }
      })
      emit('update-calendar', data)
    }
  }

  const handleTimes = () => {
  }

  const handleSubmit = async () => {
    const isValid = await refFormObserver.value.validate()
    if (!isValid) {
      return false
    }

    const { data } = await AppointmentResource.store(formData.value)
    if (data.appointment) {
      router.push({ name: 'insured-treatment-history', params: { id: route.value.params.treatmentId } })
    }
  }

  return {
    treatmentTypes,
    formData,
    refFormObserver,
    specialties,
    medicalCenters,
    medicalUnits,
    attentionTypes,
    availableDates,
    availableDatesMap,
    availableTimes,
    handleMedicalCenter,
    handleMedicalUnit,
    handleAvailability,
    handleTimes,
    handleSubmit
  }
}
