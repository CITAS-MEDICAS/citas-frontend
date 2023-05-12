import {computed, onMounted, ref} from '@vue/composition-api'
import store from '@/store'

import {MedicalCenterResource} from '@/network/lib/medicalCenter'
import {MedicalUnitResource} from '@/network/lib/medicalUnit'
import {CalendarResource} from '@/network/lib/calendar'
import {AppointmentResource} from '@/network/lib/appointment'
import {useRouter} from '@core/utils/utils'



export const useEditAppointmentForm = emit => {
  const { route, router } = useRouter()
  const appointmentId = route.value.params.appointmentId

  const patientName = ref(null)
  const attentionId = ref(null)

  const formData = ref({
    attention: null,
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
    const data = store.state.types.treatmentTypes
    formData.value.treatment_type_id = data.length ? data[0].id : null
    return data
  })

  const specialties = computed(() => {
    return store.state.types.specialties
  })

  const calendarTypes = computed(() => {
    console.log("calendarTypes")
    const userRole = JSON.parse(localStorage.getItem('userRole'))
    if (userRole.role === "estadistico") {
      return store.state.types.attentionTypes.filter(attentionType => attentionType.name === 'NUEVO' || attentionType.name === 'OTRO')
    } else {
      return store.state.types.attentionTypes.filter(attentionType => attentionType.name === 'NUEVO' || attentionType.name === 'OTRO' || attentionType.name === 'RECONSULTA')
    }
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
      sortByAsc: 'name',
      getAll: '1'
    })

    if (data.total_data) {
      // formData.value.medical_center_id = data.rows[0].id
      await handleMedicalUnit()
    }
    return data.rows
  }

  const fetchMedicalUnit = async unitId => {
    formData.value.medical_unit_id = null
    if (formData.value.medical_center_id && formData.value.specialty){
      const { data } = await MedicalUnitResource.getAll({
        getAll: '1',
        scope: [
          // daba error al hasCenter.
          `hasCenter:${formData.value.medical_center_id}`,
          `hasSpecialty:${formData.value.specialty.id}`,
          'isEnabled'
        ].join(',')
      })
      return data.rows
    }
  }

  // eslint-disable-next-line camelcase
  const handleAttention = async attention_id => {
    // formData.value.medical_center_id = null
    // formData.value.medical_unit_id = null
    formData.value.calendar = null
    formData.value.time = null
    await handleAvailability()

  }

  const handleMedicalCenter = async () => {
    formData.value.attention_id = null
    formData.value.medical_center_id = null
    formData.value.medical_unit_id = null
    formData.value.calendar = null
    formData.value.time = null
    medicalCenters.value = await fetchMedicalCenter()
  }

  const handleMedicalUnit = async unitId => {
    formData.value.calendar = null
    formData.value.time = null
    medicalUnits.value = await fetchMedicalUnit(unitId)
  }

  const handleAvailability = async () => {
    formData.value.calendar = null
    formData.value.time = null
    if (!formData.value.medical_unit_id && !formData.value.attention_id.id
    && !formData.value.medical_center_id && !formData.value.medical_unit_id) {
      alert("Nota: Debe llenar todos los campos para que el calendario se actualize")
      return
    }

    const medicalUnitId = formData.value.medical_unit_id


    if (medicalUnitId && formData.value.attention) {
      const attentionTypeId = formData.value.attention.id
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
    if (data.appointment) {
      router.push({ name: 'insured-treatment-history', params: { treatmentId: data.appointment.treatment_id } })
    }
  }

  const goToDate = () => {
    if (formData.value.attention && formData.value.specialty &&
      formData.value.medical_center_id && formData.value.medical_unit_id){
      emit('go-to-date', formData.value.calendar.date)
    }

  }

  //PRINCIPAL QUE ES LLAMADO AL MONTAR
  const fetchAppointment = async () => {
    const { data: { appointment } } = await AppointmentResource.getById(appointmentId, {
      include: 'treatment.patient;calendar'
    },)
    patientName.value = appointment.treatment.patient.fullname
    attentionId.value = appointment?.calendar?.attention_type_id || appointment.attention_type_id
    formData.value.specialty = specialties.value.find(item => item.id === appointment.specialty_id)
    await handleMedicalCenter()

    formData.value.medical_center_id = appointment.medical_center_id
    if (appointment.calendar){
      formData.value.attention = store.state.types.attentionTypes.find(attentionType => attentionType.id === appointment.calendar.attention_type_id)
    } else {
      formData.value.attention = store.state.types.attentionTypes.find(attentionType => attentionType.id === 51)
    }
    formData.value.reason = appointment.reason
    if (appointment.medical_center_id){
      formData.value.medical_center_id = appointment.medical_center_id
      await handleMedicalUnit(appointment.medical_unit_id)
    }
    // formData.value.medical_center_id = null


    if(!appointment.medical_unit_id) return
    // await handleMedicalUnit(appointment.medical_unit_id)
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
