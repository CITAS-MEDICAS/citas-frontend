<template>
  <b-row>
    <b-col cols="12" xl="9" lg="8">
      <validation-observer ref="refFormObserver">
        <b-card no-body>
          <b-card-body>
            <b-row>
              <b-col lg="5">
                <h3>Cambiar contraseňa</h3>
              </b-col>
              <b-col lg="7">
                <b-row>
                  <b-col cols="8">
                    <b-form-group label="Contraseňa Actual *">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Contraseňa Actual *"
                        rules="required"
                      >
                        <b-form-input
                          v-model="formData.old_password"
                          type="password"
                          :state="errors.length ? false : null"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
                <hr>
                <b-row>
                  <b-col sm="8">
                    <b-form-group label="Nueva Contraseña">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Nueva Contraseña"
                        vid="Password"
                        rules="min:5|required"
                      >
                        <b-form-input
                          v-model="formData.password"
                          :state="errors.length ? false : null"
                          type="password"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="8">
                    <b-form-group label="Confirma contraseña">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Confirma Contraseña"
                        rules="confirmed:Password|required">
                        <b-form-input
                          v-model="formData.password_confirmation"
                          :state="errors.length ? false : null"
                          type="password"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </validation-observer>
    </b-col>
    <b-col cols="12" xl="3" lg="4">
      <b-card>
        <b-button variant="primary" block @click="handleSubmit()">Cambiar Contraseňa</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required, confirmed, min, email } from '@validations'
import { ProfileResource } from '@/network/lib/profile'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'ChangePassword',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {}
  },
  setup() {
    const formData = ref({
      old_password: '',
      password: '',
      password_confirmation: ''
    })
    const refFormObserver = ref(null)

    const validate = async () => {
      return await refFormObserver.value.validate()
    }

    return {
      formData,
      refFormObserver,
      required,
      confirmed,
      email,
      min,
      validate
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      const { data, status }  = await ProfileResource.changePassword(this.formData)
      if (status === 202) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: data.message,
            icon: 'CheckIcon',
            variant: 'success'
          }
        })
      }
    }
  }
}
</script>

<style scoped></style>
