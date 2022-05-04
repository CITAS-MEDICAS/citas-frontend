import { computed, onMounted, ref } from '@vue/composition-api'
import store from '@/store'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import { CalendarResource } from '@/network/lib/calendar'
import { useRouter } from '@core/utils/utils'
import { AppointmentResource } from '@/network/lib/appointment'


export const useMedicalAppointmentForm = emit => {
  const { route, router } = useRouter()
  const treatmentId = route.value.params.treatmentId
  const appointmentId = route.value.query.cita
  const appointment = ref(null)

  const insuredName = ref('')
  const attentionTypeName = route.value.meta.attentionType
  const isReconsult = attentionTypeName === 'RECONSULTA'

  const formData = ref({
    treatment_id: treatmentId,
    attention_type_id: null,
    treatment_type_id: null,
    specialty: null,
    medical_center_id: null,
    medical_unit_id: null,
    calendar: null,
    time: null,
    reason: ''
  })

  const refFormObserver = ref(null)
  const medicalCenters = ref([])
  const medicalUnits = ref([])
  const availableDates = ref([])
  const availableDatesMap = ref([])

  async function resolveFormFields() {
    insuredName.value = appointment.value.treatment.patient.fullname
    if (isReconsult) {
      formData.value.specialty = specialties.value.find(
        item => item.id === appointment.value.specialty_id
      )
      await handleMedicalCenter()
      formData.value.medical_center_id = appointment.value.medical_center_id
      await handleMedicalUnit()
      formData.value.medical_unit_id = appointment.value.medical_unit_id
      await handleAvailability()
    }
  }

  onMounted(async () => {
    await store.dispatch('types/TREATMENT_TYPE')
    await store.dispatch('types/ATTENTION_TYPE')
    await store.dispatch('types/SPECIALTIES', {
      scope: 'hasUnit'
    })
    setAttentionType()
    appointment.value = await fetchAppointment(appointmentId)
    await resolveFormFields()
  })

  const treatmentTypes = computed(() => {
    const data = store.state.types.treatmentTypes
    formData.value.treatment_type_id = data.length ? data[0].id : null
    return data
  })

  const setAttentionType = () => {
    const attention = store.state.types.attentionTypes
    formData.value.attention_type_id = attention.find(item => item.name === attentionTypeName).id
  }

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
    const { data } = await MedicalCenterResource.getAll({
      scope: `hasSpecialty:${formData.value.specialty.id}`,
      sortByAsc: 'name',
      getAll: '1'
    })

    return data.rows
  }

  const fetchMedicalUnit = async () => {
    const { data } = await MedicalUnitResource.getAll({
      getAll: '1',
      scope: [
        `hasCenter:${formData.value.medical_center_id}`,
        `hasSpecialty:${formData.value.specialty.id}`,
        'isEnabled'
      ].join(',')
    })

    return data.rows
  }

  const handleMedicalCenter = async () => {
    formData.value.medical_center_id = null
    formData.value.medical_unit_id = null
    formData.value.calendar = null
    formData.value.time = null

    medicalCenters.value = await fetchMedicalCenter()
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
          calendar_id, date, duration, status
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
      router.push({ name: 'insured-treatment-history', params: { id: route.value.params.treatmentId } })
    }
  }

  const goToDate = () => {
    emit('go-to-date', formData.value.calendar.date)
  }

  const fetchAppointment = async appointmentId => {
    const { data: { appointment } } = await AppointmentResource.getById(appointmentId, {
      include: 'treatment.patient'
    })
    return appointment
  }

  return {
    treatmentTypes,
    formData,
    refFormObserver,
    specialties,
    medicalCenters,
    medicalUnits,
    availableDates,
    availableDatesMap,
    availableTimes,
    handleMedicalCenter,
    handleMedicalUnit,
    handleAvailability,
    handleSubmit,
    goToDate,
    isReconsult,
    insuredName
  }
}
