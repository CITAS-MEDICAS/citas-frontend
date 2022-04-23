import { inject, ref, computed } from '@vue/composition-api'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'

export const useTransferAppointmentForm = () => {
  const formData = ref({
    origin_center_id: null,
    origin_unit_id: null,
    destination_center_id: null,
    destination_unit_id: null,
    appointmentIds: []
  })


  const selectedAppointments = inject('selectedAppointments')

  const centerIds = new Set()
  const unitIds = new Set()

  const appointments = computed(() => {
    return selectedAppointments.value
      .filter(item => item.unit?.id === formData.value.origin_unit_id)
      .map(item => item.id)
  })

  const centers = computed(() => {
    const items = []
    centerIds.clear()
    selectedAppointments.value.forEach(item => {
      if (!centerIds.has(item.center.id) && item.unit) {
        centerIds.add(item.center.id)
        items.push(item.center)
      }
    })
    return items
  })

  const originUnits = computed(() => {
    const items = []
    unitIds.clear()
    selectedAppointments.value.forEach(item => {
      if (!unitIds.has(item.unit?.id) && item.unit?.medical_center_id === formData.value.origin_center_id) {
        unitIds.add(item.unit.id)
        items.push(item.unit)
      }
    })
    return items
  })

  const destinationUnits = ref([])

  const fetchMedicalUnit = async (medicalCenterId) => {
    const { data } = await MedicalUnitResource.getAll({
      getAll: '1',
      scope: [
        `hasCenter:${medicalCenterId}`,
        'isEnabled'
      ].join(',')
    })

    return data.rows
  }

  const changeCenter = async () => {
    formData.value.origin_unit_id = null
    formData.value.destination_unit_id = null
    formData.value.appointmentIds = []
    formData.value.destination_center_id = formData.value.origin_center_id
    destinationUnits.value = await fetchMedicalUnit(formData.value.destination_center_id)
  }

  const resetForm = () => {
    formData.value = {
      origin_center_id: null,
      origin_unit_id: null,
      destination_center_id: null,
      destination_unit_id: null,
      appointmentIds: []
    }
  }

  const changeUnit = () => {
    formData.value.appointmentIds = appointments.value
  }

  return {
    formData,
    selectedAppointments,
    centers,
    originUnits,
    destinationUnits,
    changeCenter,
    changeUnit,
    resetForm
  }
}