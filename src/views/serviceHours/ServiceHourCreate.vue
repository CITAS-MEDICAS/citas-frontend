<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <ServiceHourForm ref="refForm" />
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

import ServiceHourForm from './components/ServiceHourForm'
import { ServiceHourResource } from '@/network/lib/serviceHours'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'ServiceHourCreate',
  components: {
    ServiceHourForm,
  },
  setup() {
    const formData = ref({
      name: '',
      duration: 15,
      startTime: '00:00:00',
      endTime: '00:00:00',
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
      
      const { data } = await ServiceHourResource.store(this.formData)
      
      if (data) {
        this.$router.push({ name: 'service-hour-list' }).then(() => {
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
      this.$router.push({ name: 'service-hour-list' })
    },
  },
}
</script>

<style scoped></style>
