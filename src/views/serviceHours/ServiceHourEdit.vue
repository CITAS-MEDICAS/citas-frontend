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
          <b-button v-if="$can('update', PERMISSION_SERVICE_HOURS)" variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import ServiceHourForm from './components/ServiceHourForm.vue'
import { ServiceHoursResource } from '@/network/lib/serviceHours'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { PERMISSION_SERVICE_HOURS } from '@/permissions'

export default {
  name: 'ServiceHoursEdit',
  components: {
    ServiceHourForm,
  },
  setup() {
    const formData = ref({
      name: '',
      duration: 0,
      startTime: '',
      endTime: '',
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_SERVICE_HOURS
    }
  },
  created() {
    this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return

      const { data } = await ServiceHoursResource.update(this.$route.params.id, this.formData)

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
    async getResourceData() {
      const { data } = await ServiceHoursResource.getById(this.$route.params.id)
      this.formData = data.servicehour
    },
  },
}
</script>

<style scoped></style>
