<template>
  <div>
    <MedicalUnit ref="refMedicalUnit" />
    <hr />
    <EmployerInfo ref="refEmployerInfo" />
    <hr />
    <AccountInfo ref="refAccountInfo" />
    <hr />
    <PersonalInfo ref="refPersonalInfo" />
    <hr />
    <Contact ref="refContact" />
  </div>
</template>

<script>
import EmployerInfo from './EmployerInfo'
import MedicalUnit from './MedicalUnit'
import Contact from './Contact'
import PersonalInfo from '@/views/user/components/PersonalInfo'
import AccountInfo from '@/views/user/components/AccountInfo'

import { ref } from '@vue/composition-api'

export default {
  name: 'InsuredUserForm',
  components: {
    EmployerInfo,
    PersonalInfo,
    AccountInfo,
    MedicalUnit,
    Contact,
  },

  setup() {
    const refEmployerInfo = ref(null)
    const refPersonalInfo = ref(null)
    const refAccountInfo = ref(null)
    const refMedicalUnit = ref(null)
    const refContact = ref(null)

    const validate = async () => {
      const employer = await refEmployerInfo.value.validate()
      const account = await refAccountInfo.value.validate()
      const personal = await refPersonalInfo.value.validate()
      const medicalUnit = await refMedicalUnit.value.validate()
      const contact = await refContact.value.validate()

      return employer && personal && account && medicalUnit && contact
    }

    return {
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
