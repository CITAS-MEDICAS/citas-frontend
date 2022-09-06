<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="12" md="8" class="p-3">
        <RegistrationForm ref="refForm" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'
import RegistrationForm from './components/RegistrationForm'
import { RegistrationResource } from '@/network/lib/registration'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { debounce } from '@/libs/utils'
import { InsuranceApi } from '@/network/lib/insuranceApi'

export default {
  name: 'MedicalCenterCreate',
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
      affiliation_date: ''
    })
    provide('formData', formData)
    return {
      formData
    }
  },
  methods: {
    async handleSubmit() {
      // const isValid = this.$refs.refForm.validate()
      // if (!isValid) return
      const { data } = await RegistrationResource.store(this.formData)
      // console.log(this.formData)
      // console.log(data)
      try {
        if (data) {
          this.$router.push({ name: 'registration-list' }).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `Creado Exitosamente!`,
                icon: 'CheckIcon',
                variant: 'success'
              }
            })
          })
        }
      } catch (error){
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `!El Carnet, numero de asegurado o correo ya existen Verifique porfavor!`,
            icon: 'CheckIcon',
            variant: 'danger',
          },
        })
      }
    },
    handleCancel() {
      this.$router.push({ name: 'medical-center-list' })
    }
  }
}
</script>

<style scoped></style>
