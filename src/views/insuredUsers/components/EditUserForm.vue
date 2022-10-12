<template>
  <b-row>
    <b-col cols="12" xl="9" lg="8">
      <b-card no-body>
        <b-card-body>
          <AccountInfo v-if="true" ref="refAccountInfo" />
          <hr />
          <PersonalInfo ref="refPersonalInfo" />
        </b-card-body>
      </b-card>
    </b-col>
    <b-col cols="12" xl="3" lg="4">
      <b-card>
        <b-button variant="primary" block @click="handleSubmit()">Guardar</b-button>
        <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { inject, provide, ref } from '@vue/composition-api'

import AccountInfo from '@/views/user/components/AccountInfo'
import PersonalInfo from '@/views/user/components/PersonalInfo'

import { UserResource } from '@/network/lib/users'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'EditUserForm',
  components: {
    AccountInfo,
    PersonalInfo,
  },
  setup() {
    const formData = inject('userData')
    provide('formData', formData)
    console.log('setup')
    console.log(formData)

    const refAccountInfo = ref(null)
    const refPersonalInfo = ref(null)

    const validate = async () => {
      const account = await refAccountInfo.value.validate()
      const personal = await refPersonalInfo.value.validate()

      return account && personal
    }

    return {
      refAccountInfo,
      refPersonalInfo,
      formData,

      validate,
    }
  },
  methods: {
    async handleSubmit() {

      console.log('enviarx........')
      this.formData.insuredIsTitular =false
      console.log(this.formData)
      // if(!this.formData.email) {
      //   this.formData.email = Date.now() + 'sincorreo@cnslpz.bo'
      //   this.formData.email = 'sincorreo@cnslpz.bo'
      // }

      const isValid = await this.validate()
      console.log(isValid)
      if (!isValid) return false


      const { data } = await UserResource.update(this.formData.id, this.formData)

      if (data.user) {
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
      console.log('-> result', data)
    },
    handleCancel() {
      this.$router.push({ name: 'insured-list' })
    },
  },
}
</script>

<style scoped></style>
