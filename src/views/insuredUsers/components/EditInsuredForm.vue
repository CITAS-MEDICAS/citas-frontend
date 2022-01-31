<template>
  <b-row class="mt-3">
    <b-col cols="12" xl="9" lg="8">
      <b-card no-body>
        <b-card-body>
          <Membership ref="refMembership" />
          <hr />
          <EmployerInfo
            v-show="formData.insuredIsTitular"
            ref="refEmployerInfo"
            :validate-form="formData.insuredIsTitular"
          />
          <hr v-show="formData.insuredIsTitular" />
          <MedicalUnit ref="refMedicalUnit" />
          <hr />
          <Contact ref="refContact" />
        </b-card-body>
      </b-card>
    </b-col>
    <b-col cols="12" xl="3" lg="4">
      <b-card>
        <b-button variant="primary" block @click="handleSubmit()">Guardar</b-button>
        <b-button variant="outline-secondary" block @click="handleCancel">Cancelar</b-button>
      </b-card>

      <pre>{{ formData }}</pre>
    </b-col>
  </b-row>
</template>

<script>
import { inject, provide, ref } from '@vue/composition-api'

import Membership from '@/views/insuredUsers/components/Membership'
import EmployerInfo from '@/views/insuredUsers/components/EmployerInfo'
import MedicalUnit from '@/views/insuredUsers/components/MedicalUnit'
import Contact from '@/views/insuredUsers/components/Contact'
import { InsuredResource } from '@/network/lib/insured'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'EditInsuredForm',
  components: {
    Membership,
    EmployerInfo,
    Contact,
    MedicalUnit,
  },
  setup() {
    const formData = inject('insuredData')
    provide('formData', formData)

    const refMembership = ref(null)
    const refEmployerInfo = ref(null)
    const refMedicalUnit = ref(null)
    const refContact = ref(null)

    const validate = async () => {
      const membership = await refMembership.value.validate()
      const employer = await refEmployerInfo.value.validate()
      const unit = await refMedicalUnit.value.validate()
      const contact = await refContact.value.validate()

      return membership && employer && unit && contact
    }

    return {
      formData,
      refMembership,
      refEmployerInfo,
      refMedicalUnit,
      refContact,

      validate,
    }
  },

  methods: {
    async handleSubmit() {
      const isValid = await this.validate()

      if (!isValid) return false

      const { data } = await InsuredResource.renovate(this.formData.id, this.formData)
      if (data.insured) {
        this.$router.push({ name: 'insured-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Actualizado Exitosamente!`,
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
