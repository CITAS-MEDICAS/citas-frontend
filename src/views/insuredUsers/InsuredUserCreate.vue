<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" lg="8">
        <b-card no-body>
          <b-card-body>
            <InsuredUserForm ref="refForm" />
          </b-card-body>
        </b-card>

        <pre>{{ formData }}</pre>
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
import InsuredUserForm from './components/InsuredUserForm'
import { InsuredResource } from '@/network/lib/insured'

export default {
  name: 'InsuredUserCreate',
  components: {
    InsuredUserForm,
  },
  setup() {
    const formData = ref({
      insuredType: '',
      relationship_code: '',
      registration_code: '',
      affiliation_date: '',
      medical_center_id: null,
      medical_unit_id: null,
      beneficiary_code: '',

      employer_code: '',
      employer_name: '',
      employer_date: '',
      salary: '',

      name: '',
      paternal_surname: '',
      maternal_surname: '',
      ci: '',
      ci_exp: '',
      birth_date: '',
      gender: '',
      phone_number: '',
      staff_registration_code: '',

      user_titular_id: null,
      email: '',
      password: '',
      password_confirmation: '',

      region: '',
      address_zone: '',
      address: '',
      reference_phone_number: '',
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
    },
  },
}
</script>

<style scoped></style>
