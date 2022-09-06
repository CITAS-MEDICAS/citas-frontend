<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
<!--              <b-form-group label="Carnet del Asegurado">-->
<!--                <validation-provider v-slot="{ errors }" name="Nombre del Establecimiento">-->
<!--                  <b-form-input v-model="formData.ci" :state="errors.length ? false : null" size="lg" />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->
            <b-form-group label="Carnet">
              <validation-provider #default="{ errors }" rules="minmax:5,12|required|regex:^([0-9a-zA-Z-]+)$" name="Carnet">
                <b-form-input
                  v-model="formData.ci"
                  :state="errors.length > 0 ? false:null"
                  placeholder="00000000-xx"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Motivo">
              <validation-provider #default="{ errors }" rules="minmax:5,100|required|regex:^([0-9a-zA-Z-. ]+)$" name="Motivo">
                <b-form-input
                  v-model="formData.obs"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Justificacion o Motivo por el Alta"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" md="4">
        <b-card>
          <b-button v-if="$can('create', PERMISSION_MEDICAL_CENTER)" variant="primary" block @click="handleSubmit()">Dar de Alta</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'
import { extend ,ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { PERMISSION_MEDICAL_CENTER } from '@/permissions'
import {InsuredResource} from "@/network/lib/insured"
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: 'El {_field_} es de {min} a {max} caracteres válidos.'
})

export default {
  name: 'InsuredEnabled',
  components: {
    ValidationProvider,
  },
  setup() {
    const formData = ref({
      ci: '',
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_MEDICAL_CENTER
    }
  },
  methods: {
    async handleSubmit() {
      // const isValid = this.$refs.refForm.validate()
      // if (!isValid) return
      const { data } = await InsuredResource.undelete(this.formData.ci, this.formData.obs)
        this.$router.push({ name: 'insured-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Alta Exitosa!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })

    },
    handleCancel() {
      this.$router.push({ name: 'insured-list' })
    },
  },
}
</script>

<style scoped></style>
