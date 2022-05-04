import { ref, provide } from '@vue/composition-api'
import { dateISO } from '@/libs/utils'

export const useTickets = () => {
  const isTicketHandlerActive = ref(false)

  const formData = ref({
    treatment_type_id: null,
    user_patient_id: null,
    reason: '',
    calendar: null,
    attention_type_id: null,
    medical_center_id: null,
    medical_unit_id: null,
    time: {
      startTime: null,
      endTime: null,
    },
  })

  const users = ref([])
  const units = ref([])
  const today = dateISO(new Date())

  const setVisible = value => {
    isTicketHandlerActive.value = value
  }

  provide('formData', formData)

  return {
    isTicketHandlerActive,
    formData,
    users,
    units,
    today,
    setVisible,
  }
}
