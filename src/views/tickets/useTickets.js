import { ref, provide, onMounted } from '@vue/composition-api'
import { dateISO } from '@/libs/utils'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import store from '@/store'

export const useTickets = () => {
  const isTicketHandlerActive = ref(false)

  const users = ref([])
  const units = ref([])
  const today = dateISO(new Date())

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

  onMounted(async () => {
    await store.dispatch('types/TREATMENT_TYPE')
    await store.dispatch('types/ATTENTION_TYPE')
    await fetchMedicalUnit()
    setAttentionType()
    setTreatmentType()
  })

  async function fetchMedicalUnit() {
    console.log("fetchMedicalUnit")
    // const { data } = await MedicalUnitResource.getAll({
    //   scope: 'authCenter',
    // })
    // // console.log(this.formData.user_patient_id)
    //
    // units.value = data.rows
  }

  const setAttentionType = () => {
    const attention = store.state.types.attentionTypes
    formData.value.attention_type_id = attention.find(item => item.name === 'NUEVO').id
  }

  const setTreatmentType = () => {
    const treatments = store.state.types.treatmentTypes
    formData.value.treatment_type_id = treatments.find(item => item.name === 'CONSULTA EXTERNA').id
  }

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
