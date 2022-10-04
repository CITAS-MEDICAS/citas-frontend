import {computed, onMounted, ref} from '@vue/composition-api'
import store from '@/store'

import {MedicalCenterResource} from '@/network/lib/medicalCenter'
import {MedicalUnitResource} from '@/network/lib/medicalUnit'
import {CalendarResource} from '@/network/lib/calendar'
import {AppointmentResource} from '@/network/lib/appointment'
import {useRouter} from '@core/utils/utils'



export const useEditAppointmentForm = emit => {
  console.log("useEditAppointmentForm")
  const { route, router } = useRouter()
  const appointmentId = route.value.params.appointmentId

  const patientName = ref(null)
  const attentionId = ref(null)

  const formData = ref({
    attention_id: null,
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

  onMounted(async () => {
    await store.dispatch('types/TREATMENT_TYPE')
    await store.dispatch('types/ATTENTION_TYPE')
    await store.dispatch('types/SPECIALTIES', {
      scope: 'hasUnit'
    })

    await fetchAppointment()
  })

  const treatmentTypes = computed(() => {
    console.log("treatmentTypes")
    const data = store.state.types.treatmentTypes
    formData.value.treatment_type_id = data.length ? data[0].id : null
    return data
  })

  const specialties = computed(() => {
    return store.state.types.specialties
  })

  const calendarTypes = computed(() => {
    console.log("calendarTypes")
    console.log(store.state.types.attentionTypes)
    return store.state.types.attentionTypes.filter(attentionType => attentionType.name === 'NUEVO' || attentionType.name === 'OTRO')
  })

  const availableTimes = computed(() => {
    console.log("availableTimes...")
    if (availableDates.value.length && formData.value.calendar) {
      return availableDates.value.find(item => item.calendar_id === formData.value.calendar.calendar_id).available
    }
    return []
  })

  const fetchMedicalCenter = async () => {
    console.log("fetchMedicalCenter")
    formData.value.medical_center_id = null
    formData.value.medical_unit_id = null

    const { data } = await MedicalCenterResource.getAll({
      scope: `hasSpecialty:${formData.value.specialty.id}`,
      sortByAsc: 'name',
      getAll: '1'
    })

    if (data.total_data) {
      console.log(data)
      console.log(data.rows[0].id)
      formData.value.medical_center_id = data.rows[0].id
      await handleMedicalUnit()
    }
    return data.rows
  }

  const fetchMedicalUnit = async unitId => {
    console.log("fetchMedicalUnit")
    console.log(formData.value.medical_unit_id)
    formData.value.medical_unit_id = null
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

  // eslint-disable-next-line camelcase
  const handleAttention = async attention_id => {
    console.log("handleAttention_id")
    console.log(attention_id)
    formData.value.medical_unit_id = null
    formData.value.medical_center_id = null
    formData.value.calendar = null
    formData.value.time = null

  }

  const handleMedicalCenter = async () => {
    console.log("handleMedicalCenter")
    medicalCenters.value = await fetchMedicalCenter()
  }

  const handleMedicalUnit = async unitId => {
    console.log("handleMedicalUnit")
    console.log(unitId)
    medicalUnits.value = await fetchMedicalUnit(unitId)
  }

  const handleAvailability = async () => {
    console.log("handleAvailability")
    if (!formData.value.medical_unit_id && !formData.value.attention_id.id
    && !formData.value.medical_center_id && !formData.value.medical_unit_id) {
      alert("Nota: Debe llenar todos los campos para que el calendario se actualize")
      return
    }

    const medicalUnitId = formData.value.medical_unit_id
    const attentionTypeId = formData.value.attention_id.id
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
    console.log("useEditAppointmentForm .. handleSubmit")

    const isValid = await refFormObserver.value.validate()
    if (!isValid) {
      return false
    }

    const { data } = await AppointmentResource.update(appointmentId, formData.value)
    console.log(appointmentId)
    console.log(formData.value)
    if (data.appointment) {
      router.push({ name: 'insured-treatment-history', params: { treatmentId: data.appointment.treatment_id } })
    }
  }

  const goToDate = () => {
    emit('go-to-date', formData.value.calendar.date)
  }

  // CONSOLA porque no envia.
  const fetchAppointment = async () => {
    const { data: { appointment } } = await AppointmentResource.getById(appointmentId, {
      include: 'treatment.patient;calendar'
    })
    console.log("fetchAppointment")
    console.log(appointment.medical_center_id)
    patientName.value = appointment.treatment.patient.fullname
    attentionId.value = appointment?.calendar?.attention_type_id || appointment.attention_type_id
    formData.value.specialty = specialties.value.find(item => item.id === appointment.specialty_id)
    await handleMedicalCenter()
    // formData.value.medical_center_id = appointment.medical_center_id
    formData.value.medical_center_id = null
    formData.value.reason = appointment.reason

    if(!appointment.medical_unit_id) return
    console.log("if-handleMedicalUnit")
    console.log(appointment.medical_unit_id)
    await handleMedicalUnit(appointment.medical_unit_id)

    formData.value.medical_unit_id = appointment.medical_unit_id
    await handleAvailability()
    formData.value.calendar = availableDatesMap.value.find(item => item.calendar_id === appointment.calendar_id)
    goToDate()
  }

  return {
    patientName,
    treatmentTypes,
    formData,
    refFormObserver,
    specialties,
    handleAttention,
    medicalCenters,
    medicalUnits,
    availableDates,
    calendarTypes,
    availableDatesMap,
    availableTimes,
    handleMedicalCenter,
    handleMedicalUnit,
    handleAvailability,
    handleSubmit,
    goToDate
  }
}
