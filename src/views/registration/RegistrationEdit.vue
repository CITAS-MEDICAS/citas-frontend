<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <RegistrationForm ref="refForm" />
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
import RegistrationForm from './components/RegistrationForm'
import { RegistrationResource } from '@/network/lib/registration'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
export default {
  name: 'RegistrationEdit',
  components: {
    RegistrationForm
  },
  setup() {
    const formData = ref({
      medical_unit_id: '',
      ci: '',
      exp: '',
      code_affiliate: '',
      name: '',
      paternal_surname: '',
      maternal_surname: '',
      birth_date: '',
      gender: '',
      email: '',
      phone_number: '',
      address_zone: '',
      address: '',
      region: '',
      salary: '',
      profession: '',
      employer_date: '',
      employer_name: '',
      employer_code: '',
      affiliation_date: '',
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
      // const isValid = await this.$refs.refForm.validate()

      // if (!isValid) return
      const { data } = await RegistrationResource.update(this.$route.params.id, this.formData)
      if (data.registration) {
        this.$router.push({ name: 'registration-list' }).then(() => {
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
      this.$router.push({ name: 'registration-list' })
    },
    async getResourceData() {
      const { data } = await RegistrationResource.getById(this.$route.params.id, {
        include: 'unit'
      })
      console.log(data)
      this.formData = this.initVariables(data.registration)
    },
    initVariables(registrationData) {
      const medicalUnit = registrationData.unit
      delete registrationData.unit
      const data = {
        medical_center_id: medicalUnit.medical_center_id,
      }
      return { ...registrationData, ...data }

    },
  },
}
</script>

<style scoped></style>
