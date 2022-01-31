<template>
  <div>
    <Membership ref="refMembership" />
    <hr />
    <MedicalUnit ref="refMedicalUnit" />
    <hr />

    <EmployerInfo
      v-show="formData.insuredIsTitular"
      ref="refEmployerInfo"
      :validate-form="formData.insuredIsTitular"
    />
    <hr v-show="formData.insuredIsTitular" />

    <InsuredAccountInfo
      v-show="formData.insuredIsTitular"
      ref="refAccountInfo"
      :validate-form="formData.insuredIsTitular"
    />
    <hr v-show="formData.insuredIsTitular" />

    <PersonalInfo
      v-show="formData.isNewAccount"
      ref="refPersonalInfo"
      :validate-form="formData.isNewAccount"
    />
    <hr v-show="formData.isNewAccount" />
    <Contact ref="refContact" />
  </div>
</template>

<script>
import Membership from './Membership'
import MedicalUnit from './MedicalUnit'
import EmployerInfo from './EmployerInfo'
import Contact from './Contact'
import PersonalInfo from '@/views/user/components/PersonalInfo'
import InsuredAccountInfo from './InsuredAccountInfo'

import { ref, inject } from '@vue/composition-api'

export default {
  name: 'InsuredUserForm',
  components: {
    Membership,
    EmployerInfo,
    PersonalInfo,
    InsuredAccountInfo,
    MedicalUnit,
    Contact,
  },

  setup() {
    const formData = inject('formData')

    const refMembership = ref(null)
    const refEmployerInfo = ref(null)
    const refPersonalInfo = ref(null)
    const refAccountInfo = ref(null)
    const refMedicalUnit = ref(null)
    const refContact = ref(null)

    const validate = async () => {
      const membership = await refMembership.value.validate()
      console.log('-> membership', membership)
      const medicalUnit = await refMedicalUnit.value.validate()
      console.log('-> medicalUnit', medicalUnit)
      const employer = await refEmployerInfo.value.validate()
      console.log('-> employer', employer)
      const account = await refAccountInfo.value.validate()
      console.log('-> account', account)
      const personal = await refPersonalInfo.value.validate()
      console.log('-> personal', personal)
      const contact = await refContact.value.validate()
      console.log('-> contact', contact)

      return membership && medicalUnit && employer && personal && account && contact
    }

    return {
      formData,
      refMembership,
      refEmployerInfo,
      refAccountInfo,
      refPersonalInfo,
      refMedicalUnit,
      refContact,
      validate,
    }
  },
}
</script>

<style scoped></style>
