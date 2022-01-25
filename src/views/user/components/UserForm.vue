<template>
  <section>
    <PersonalInfo ref="refPersonalInfo" />
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

export default {
  name: 'UserForm',
  components: {
    PersonalInfo,
    AccountInfo,
    UserRoleList,
    UserCenterList,
  },

  setup() {
    const formData = inject('formData')
    const refPersonalInfo = ref(null)
    const refAccountInfo = ref(null)
    const refUserRoleList = ref(null)
    const refUserCenterList = ref(null)

    const validate = async () => {
      const personal = await refPersonalInfo.value.validate()
      const account = await refAccountInfo.value.validate()
      const list = await refUserRoleList.value.validate()
      const list2 = await refUserCenterList.value.validate()
      return personal && account && list && list2
    }

    return {
      formData,
      refAccountInfo,
      refPersonalInfo,
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
