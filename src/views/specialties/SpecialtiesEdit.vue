<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <SpecialtiesForm ref="refForm" />
          </b-card-body>
        </b-card>
        <pre>{{ formData }}</pre>
      </b-col>
      <b-col cols="12" xl="3" md="4">
        <b-card>
          <b-button variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import SpecialtiesForm from './components/SpecialtiesForm'
import { TypesResource } from '@/network/lib/types'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'MedicalCenterEdit',
  components: {
    SpecialtiesForm,
  },
  setup() {
    const formData = ref({
      name: '',
    })

    provide('formData', formData)

    return {
      formData,
    }
  },
  created() {
    this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return

      const { data } = await TypesResource.update(this.$route.params.id, this.formData)

      if (data.types) {
        this.$router.push({ name: 'specialties-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Especialidad Registrada Exitosamente!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    handleCancel() {
      this.$router.push({ name: 'specialties-list' })
    },
    async getResourceData() {      
      const { data } = await TypesResource.getById(this.$route.params.id)      
      this.formData = data.types
    },
  },
}
</script>

<style scoped></style>
