<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Registro Médico</h3>
      </b-col>
      <b-col lg="7">
        <b-form-group label="Código/Matricula">
          <validation-provider v-slot="{ errors }" name="Código/Matricula" rules="min:5">
            <b-form-input
              v-model="formData.staff_registration_code"
              :state="errors.length ? false : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'

import { min } from '@core/utils/validations/validations'

export default {
  name: 'MedicalRegistration',
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
      min,
      validate,
    }
  },
}
</script>

<style scoped></style>
