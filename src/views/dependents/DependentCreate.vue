<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" lg="8">
        <b-card no-body>
          <b-card-body>
            <DependentForm ref="refForm" />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" lg="4">
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

import ToastificationContent from '@core/components/toastification/ToastificationContent'
import DependentForm from './components/DependentForm'
import { InsuredResource } from '@/network/lib/insured'

export default {
  name: 'DependentCreate',
  components: {
    DependentForm
  },
  setup() {
    const formData = ref({
      insuredIsTitular: false,
      relationship_type_id: '',
      registration_code: '',
      affiliation_date: '',
      medical_center_id: null,
      medical_unit_id: null,
      beneficiary_code: '',
      user_titular_id: null,

      employer_code: '',
      employer_name: '',
      employer_date: '',
      salary: '',

      isNewAccount: true,
      name: '',
      paternal_surname: '',
      maternal_surname: '',
      ci: '',
      ci_exp: '',
      birth_date: '',
      gender: '',
      phone_number: '',

      user_id: null,
      email: null,
      password: '',
      password_confirmation: '',

      region: '',
      address_zone: '',
      address: '',
      reference_phone_number: ''
    })

    provide('formData', formData)

    return {
      formData
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return

      if (!this.formData.email) {
        this.formData.email = Date.now() + '@cnslpz.com'
      }

      const { data } = await InsuredResource.store(this.formData)

      if (data.insured) {
        this.$router.push({ name: 'insured-list' }).then(() => {
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
      this.$router.push({ name: 'insured-list' })
    }
  }
}
</script>

<style scoped></style>
