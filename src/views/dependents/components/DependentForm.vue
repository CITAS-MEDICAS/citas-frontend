<template>
  <div>
    <DependentMembership ref="refDependentMembership" />
    <hr />
    <MedicalUnit ref="refMedicalUnit" />
    <hr />
    <PersonalInfo ref="refPersonalInfo" />
    <hr />
    <Contact ref="refContact" />
  </div>
</template>

<script>
import DependentMembership from './DependentMembership'
import MedicalUnit from '@/views/insuredUsers/components/MedicalUnit'
import PersonalInfo from '@/views/user/components/PersonalInfo'
import Contact from '@/views/insuredUsers/components/Contact'
import { inject, ref } from '@vue/composition-api'

export default {
  name: 'DependentForm',
  components: {
    DependentMembership,
    MedicalUnit,
    PersonalInfo,
    Contact
  },
  setup() {
    const formData = inject('formData')

    const refDependentMembership = ref(null)
    const refMedicalUnit = ref(null)
    const refPersonalInfo = ref(null)
    const refContact = ref(null)

    const validate = async () => {
      const membership = await refDependentMembership.value.validate()
      const medicalUnit = await refMedicalUnit.value.validate()
      const personal = await refPersonalInfo.value.validate()
      const contact = await refContact.value.validate()

      return membership && medicalUnit && personal && contact
    }

    return {
      formData,
      refDependentMembership,
      refMedicalUnit,
      refPersonalInfo,
      refContact,
      validate
    }
  }
}
</script>

<style scoped>

</style>