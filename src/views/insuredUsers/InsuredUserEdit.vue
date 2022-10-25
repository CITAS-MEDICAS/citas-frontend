<template>
  <div class="page-wrapper">
<!--    <EditUserForm v-if="parseInt(this.$route.params.relationship_type_id) === 39"/>-->
    <EditUserForm/>
    <hr />
    <EditInsuredForm />
  </div>
</template>

<script>
import EditUserForm from '@/views/insuredUsers/components/EditUserForm'
import EditInsuredForm from '@/views/insuredUsers/components/EditInsuredForm'
import { InsuredResource } from '@/network/lib/insured'
import { ref, provide } from '@vue/composition-api'

export default {
  name: 'InsuredUserEdit',
  components: {
    EditUserForm,
    EditInsuredForm,
  },
  setup() {
    const userData = ref({})
    const insuredData = ref({})
    provide('userData', userData)
    provide('insuredData', insuredData)

    return {
      userData,
      insuredData,
    }
  },
  data() {

    return {
      insuredId: this.$route.params.id,
    }
  },
  mounted() {
    this.getResourceData()
    console.log('mounted')
    console.log(this.$route.params)
    if(parseInt(this.$route.params.relationship_type_id) === 39){
      console.log('titular')
    }
  },
  methods: {
    async getResourceData() {
      console.log('getResourceData')
      const { data } = await InsuredResource.getById(this.insuredId, {
        include: 'user;unit',
      })
      const userData = data.insured.user
      delete data.insured.user
      const insuredData = data.insured
      this.userData = userData
      this.insuredData = this.initInsuredVariables(insuredData)
    },
    initInsuredVariables(insuredData) {
      console.log('initInsuredVariables')
      const medicalUnit = insuredData.unit
      delete insuredData.unit
      const data = {
        insuredIsTitular: !insuredData.user_titular_id,
        registration_code: this.userData.registration_code,
        medical_center_id: medicalUnit.medical_center_id,
      }
      return { ...insuredData, ...data }
    },
  },
}
</script>

<style scoped></style>
