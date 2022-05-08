import { computed, inject, toRefs } from '@vue/composition-api'
import { TicketResource } from '@/network/lib/ticket'

export const useTicketHandler = (props, emit) => {
  const formData = inject('formData')

  const { units } = toRefs(props)

  const closeForm = () => {
    props.clearSelectedEvent()
    emit('set-visible', false)
    emit('clear-events', true)

    formData.value = {
      treatment_type_id: formData.value.treatment_type_id,
      attention_type_id: formData.value.attention_type_id,
      user_patient_id: null,
      reason: '',
      calendar: null,
      medical_center_id: null,
      medical_unit_id: null,
      time: {
        startTime: null,
        endTime: null,
      },
    }
  }

  const medicalUnit = computed(() => {
    if (formData.value.medical_unit_id) {
      return units.value.find(item => item.id === formData.value.medical_unit_id)?.name
    }
    return ''
  })

  const handleSubmit = async () => {
    const { data } = await TicketResource.store(formData.value)
    closeForm()
    printTicket(data.ticket.id)
  }

  const printTicket = ticketId => {
    TicketResource.printTicket(ticketId).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ticket.pdf') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  }

  return {
    formData,
    medicalUnit,
    handleSubmit,
    closeForm,
    printTicket,
  }
}
