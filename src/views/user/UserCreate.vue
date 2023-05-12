<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" lg="8">
        <b-card no-body>
          <b-card-body>
            <UserForm ref="refForm" />
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
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import UserForm from './components/UserForm'
import { UserResource } from '@/network/lib/users'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'UserCreate',
  components: {
    UserForm,
  },
  setup() {
    const formData = ref({
      name: '',
      paternal_surname: '',
      maternal_surname: '',
      ci: '',
      ci_exp: '',
      birth_date: '',
      gender: '',
      phone_number: '',
      staff_registration_code: '',
      email: '',
      password: '',
      password_confirmation: '',
      roles: [],
      centers: [],
    })

    provide('formData', formData)

    return {
      formData,
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return
      if (this.formData.roles.length === 0 || this.formData.centers.length === 0) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Debe asignar Roles y Centros`,
            icon: 'BadIcon',
            variant: 'warning',
          },
        })
        console.log(this.formData)
        return
      }
      try {
        const { data } = await UserResource.store(this.formData)
        if (data.user) {
          this.$router.push({ name: 'user-list' }).then(() => {
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
      } catch (error){
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Existe un personal o asegurado con el mismo Carnet, matricula o correo electrónico ... !Verifique porfavor!`,
            // text: error,
            icon: 'CheckIcon',
            variant: 'danger',
          },
        })
      }

    },
    handleCancel() {
      this.$router.push({ name: 'user-list' })
    },
  },
}
</script>

<style scoped></style>
