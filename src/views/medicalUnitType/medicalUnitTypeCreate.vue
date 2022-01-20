<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <medicalUnitTypeForm ref="refForm" />
          </b-card-body>
        </b-card>
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

import medicalUnitTypeForm from './components/medicalUnitTypeForm'
import { TypesResource } from '@/network/lib/types'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'relationshipCreate',
  components: {
    medicalUnitTypeForm,
  },
  setup() {
    const formData = ref({
      name: '',
      type: 'medical_unit',
    })

    provide('formData', formData)

    return {
      formData,
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return

      const { data } = await TypesResource.store(this.formData)

      if (data.types) {
        this.$router.push({ name: 'medical-unit-type-list' }).then(() => {
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
      this.$router.push({ name: 'medical-unit-type-list' })
    },
  },
}
</script>

<style scoped></style>
