<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" lg="8">
        <b-card no-body>
          <b-card-body>
            <MedicalUnitForm ref="refForm" />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" lg="4">
        <b-card>
          <b-button v-if="$can('create', PERMISSION_MEDICAL_UNIT)" variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import MedicalUnitForm from './components/MedicalUnitForm'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { PERMISSION_MEDICAL_UNIT } from '@/permissions'

export default {
  name: 'MedicalUnitCreate',
  components: {
    MedicalUnitForm,
  },
  setup() {
    const formData = ref({
      name: '',
      code: '',
      duration_time: '',
      is_general: false,
      medical_center_id: null,
      service_hour_id: null,
      specialty_type_id: null,
      unit_type_id: null,
      advance_booking_days: null,
      users: [],
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_MEDICAL_UNIT,
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return

      const { data } = await MedicalUnitResource.store(this.formData)

      if (data.medicalUnit) {
        this.$router.push({ name: 'medical-unit-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Creado Exitosamente!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    handleCancel() {
      this.$router.push({ name: 'medical-unit-list' })
    },
  },
}
</script>

<style scoped></style>
