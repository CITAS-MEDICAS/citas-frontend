<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="12" md="8">
        <b-card no-body>
          <b-card-body>
            <RegistrationForm ref="refForm" />
          </b-card-body>
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
import {debounce} from "@/libs/utils";
import {InsuranceApi} from "@/network/lib/insuranceApi";
export default {
  name: 'MedicalCenterCreate',
  components: {
    RegistrationForm,
  },
  setup() {
    const formData = ref({
      medical_unit_id: '',
      ci: '',
      exp: '',
      code_affiliate: '',
      name: 'JUAN',
      paternal_surname: 'PEREZ',
      maternal_surname: 'PRIETO',
      birth_date: '2000-01-01',
      gender: 'M',
      email: 'sss@ssss.com',
      phone_number: '78965421',
      address_zone: 'calle pulacayao',
      address: 'nro 1265 vcopaca',
      region: 'La Paz',
      salary: '8000',
      profession: 'tabledance',
      employer_date: '2010-10-01',
      employer_name: '',
      employer_code: '',
      affiliation_date: '2000-01-01',
    })
    provide('formData', formData)
    return {
      formData,
    }
  },
  methods: {
    async handleSubmit() {
      // const isValid = this.$refs.refForm.validate()
      // if (!isValid) return
      const { data } = await RegistrationResource.store(this.formData)
      console.log(this.formData);
      console.log(data);
      if (data) {
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
      this.$router.push({ name: 'medical-center-list' })
    },
  },
}
</script>

<style scoped></style>
