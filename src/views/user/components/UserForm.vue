<template>
  <section>
    <PersonalInfo ref="refPersonalInfo" />
    <hr />
    <MedicalRegistration ref="refMedicalRegistration" />
    <hr />
    <AccountInfo ref="refAccountInfo" />
    <hr />
    <UserRoleList ref="refUserRoleList" />
    <hr />
    <UserCenterList ref="refUserCenterList" />
  </section>
</template>

<script>
import { inject, ref } from '@vue/composition-api'
import { required, confirmed, min, email, date } from '@validations'

import AccountInfo from './AccountInfo'
import PersonalInfo from './PersonalInfo'
import UserRoleList from './UserRoleList'
import UserCenterList from './UserCenterList'
import MedicalRegistration from './MedicalRegistration'

export default {
  name: 'UserForm',
  components: {
    PersonalInfo,
    AccountInfo,
    UserRoleList,
    UserCenterList,
    MedicalRegistration,
  },

  setup() {
    const formData = inject('formData')
    const refPersonalInfo = ref(null)
    const refAccountInfo = ref(null)
    const refUserRoleList = ref(null)
    const refUserCenterList = ref(null)
    const refMedicalRegistration = ref(null)

    const validate = async () => {
      const personal = await refPersonalInfo.value.validate()
      const registration = await refMedicalRegistration.value.validate()
      const account = await refAccountInfo.value.validate()
      const roleList = await refUserRoleList.value.validate()
      const centerList = await refUserCenterList.value.validate()
      return personal && registration && account && roleList && centerList
    }

    return {
      formData,
      refPersonalInfo,
      refMedicalRegistration,
      refAccountInfo,
      refUserRoleList,
      refUserCenterList,
      required,
      confirmed,
      min,
      email,
      date,
      validate,
    }
  },
}
</script>

<style scoped></style>
