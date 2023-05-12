<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <MedicalCenterForm ref="refForm" />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" md="4">
        <b-card>
          <b-button v-if="$can('update', PERMISSION_MEDICAL_CENTER)" variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import MedicalCenterForm from './components/MedicalCenterForm'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { PERMISSION_MEDICAL_CENTER } from '@/permissions'

export default {
  name: 'MedicalCenterEdit',
  components: {
    MedicalCenterForm,
  },
  setup() {
    const formData = ref({
      name: '',
      address: '',
      institution_code: '',
      institution_network: '',
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_MEDICAL_CENTER,
    }
  },
  created() {
    this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return
      const { data } = await MedicalCenterResource.update(this.$route.params.id, this.formData)

      if (data.medicalCenter) {
        this.$router.push({ name: 'medical-center-list' }).then(() => {
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
      this.$router.push({ name: 'medical-center-list' })
    },
    async getResourceData() {
      const { data } = await MedicalCenterResource.getById(this.$route.params.id)
      this.formData = data.medicalCenter
    },
  },
}
</script>

<style scoped></style>
