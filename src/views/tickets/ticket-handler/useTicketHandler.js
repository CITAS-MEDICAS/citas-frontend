import { computed, inject, ref, toRefs } from '@vue/composition-api'

export const useTicketHandler = (props, emit) => {

  const formData = inject('formData')

  const closeForm = () => {
    props.clearSelectedEvent()
    emit('set-visible', false)
    formData.value = {
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
    }
  }



  const handleSubmit = () => {
    closeForm()
  }

  return {
    formData,
    handleSubmit,
    closeForm,
  }
}
