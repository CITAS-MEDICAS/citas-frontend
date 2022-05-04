import { computed, onMounted, ref } from '@vue/composition-api'

import store from '@/store'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import { CalendarResource } from '@/network/lib/calendar'
import { AppointmentResource } from '@/network/lib/appointment'
import { UserResource } from '@/network/lib/users'

import { useRouter } from '@core/utils/utils'

export const useAppointmentForm = emit => {
  const { route, router } = useRouter()

  const insuredUser = ref(null)

  const formData = ref({
    user_patient_id: route.value.params.userId,
    attention_type_id: null,
    treatment_type_id: null,
    specialty: null,
    medical_center_id: null,
    medical_unit_id: null,
    calendar: null,
    time: null,
    reason: '',
  })

  const refFormObserver = ref(null)
  const medicalCenters = ref([])
  const medicalUnits = ref([])
  const availableDates = ref([])
  const availableDatesMap = ref([])

  onMounted(async () => {
    await store.dispatch('types/TREATMENT_TYPE')
    await store.dispatch('types/ATTENTION_TYPE')
    await store.dispatch('types/SPECIALTIES', {
      scope: 'hasUnit',
    })
    setAttentionType()
    await fetchInsured()
  })

  const fetchInsured = async () => {
    const {
      data: { user },
    } = await UserResource.getById(route.value.params.userId, {
      include: 'latestInsured.unit',
    })
    insuredUser.value = user
  }

  const treatmentTypes = computed(() => {
    const data = store.state.types.treatmentTypes
    formData.value.treatment_type_id = data.length ? data[0].id : null
    return data
  })

  const isFamiliar = computed(() => {
    const specialty = formData.value.specialty
    if (specialty) {
      return specialty.filter === 'familiar'
    }

    return false
  })

  const setAttentionType = () => {
    const attention = store.state.types.attentionTypes
    formData.value.attention_type_id = attention.find(item => item.name === 'NUEVO').id
  }

  const specialties = computed(() => {
    return store.state.types.specialties
  })

  const availableTimes = computed(() => {
    console.log('prueba')
    console.log(availableDates.value.length)
    console.log(formData.value.calendar)
    if (availableDates.value.length && formData.value.calendar) {
      return availableDates.value.find(
        item => item.calendar_id === formData.value.calendar.calendar_id
      ).available
    }
    return []
  })

  const fetchMedicalCenter = async () => {
    const { data } = await MedicalCenterResource.getAll({
      scope: `hasSpecialty:${formData.value.specialty.id}`,
      sortByAsc: 'name',
    })
    return data.rows
  }

  const fetchMedicalUnit = async () => {
    formData.value.medical_unit_id = null
    if (!formData.value.medical_center_id || !formData.value.specialty.id) {
      return []
    }

    const { data } = await MedicalUnitResource.getAll({
      scope: [
        `hasCenter:${formData.value.medical_center_id}`,
        `hasSpecialty:${formData.value.specialty.id}`,
        'isEnabled',
      ].join(','),
    })
    return data.rows
  }

  const handleMedicalCenter = async () => {
    formData.value.medical_center_id = null
    formData.value.medical_unit_id = null
    formData.value.calendar = null
    formData.value.time = null

    let result = await fetchMedicalCenter()

    if (isFamiliar.value) {
      result = result.filter(
        item => item.id === insuredUser.value.latest_insured.unit.medical_center_id
      )
    }

    if (result.length && isFamiliar.value) {
      formData.value.medical_center_id = result[0].id
      await handleMedicalUnit()
    }

    medicalCenters.value = result
  }

  const handleMedicalUnit = async () => {
    formData.value.calendar = null
    formData.value.time = null

    medicalUnits.value = await fetchMedicalUnit()
  }

  const handleAvailability = async () => {
    formData.value.calendar = null
    formData.value.time = null
    const medicalUnitId = formData.value.medical_unit_id
    const attentionTypeId = formData.value.attention_type_id
    if (medicalUnitId && attentionTypeId) {
      const { data } = await CalendarResource.availability(medicalUnitId, { attentionTypeId })
      availableDates.value = data
      availableDatesMap.value = data.map(item => {
        const { calendar_id, date, duration, status } = item
        return {
          calendar_id,
          date,
          duration,
          status,
        }
      })
      emit('update-calendar', data)
    }
  }

  const handleSubmit = async () => {
    const isValid = await refFormObserver.value.validate()

    if (!isValid) {
      return false
    }

    const { data } = await AppointmentResource.store(formData.value)
    if (data.appointment) {
      router.push({ name: 'insured-appointment-list', params: { id: route.value.params.id } })
    }
  }

  const goToDate = () => {
    emit('go-to-date', formData.value.calendar.date)
  }

  return {
    insuredUser,
    treatmentTypes,
    formData,
    refFormObserver,
    specialties,
    medicalCenters,
    medicalUnits,
    availableDates,
    availableDatesMap,
    availableTimes,
    isFamiliar,
    handleMedicalCenter,
    handleMedicalUnit,
    handleAvailability,
    handleSubmit,
    goToDate,
  }
}
