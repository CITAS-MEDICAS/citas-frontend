<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Cuenta</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Correo Electronico *">
              <validation-provider
                v-slot="{ errors }"
                name="Correo Electronico"
                rules="required|email"
              >
                <b-form-input
                  v-model="formData.email"
                  type="email"
                  :state="errors.length ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Contraseña">
              <validation-provider
                v-slot="{ errors }"
                name="Contraseña"
                vid="Password"
                rules="min:5"
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
          <b-col sm="6">
            <b-form-group label="Confirma contraseña">
              <validation-provider v-slot="{ errors }" name="Contraseña" rules="confirmed:Password">
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
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required, confirmed, min, email } from '@validations'

export default {
  name: 'AccountInfo',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {}
  },
  setup() {
    const formData = inject('formData')
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
      validate,
    }
  },
}
</script>

<style scoped></style>
