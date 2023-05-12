<template>
  <validation-observer ref="refFormObserver">
    <b-form-group label="Nombre del Establecimiento">
      <validation-provider v-slot="{ errors }" name="Nombre del Establecimiento" rules="required">
        <b-form-input v-model="formData.name" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>

    <b-form-group label="Dirección">
      <validation-provider v-slot="{ errors }" name="Dirección" rules="required">
        <b-form-input v-model="formData.address" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>

    <b-row>
      <b-col sm="6">
        <b-form-group label="Código Establecimiento">
          <validation-provider v-slot="{ errors }">
            <b-form-input
              v-model="formData.institution_code"
              :state="errors.length ? false : null"
              size="lg"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-col sm="6">
        <b-form-group label="Red de Salud">
          <validation-provider v-slot="{ errors }">
            <b-form-input
              v-model="formData.institution_network"
              :state="errors.length ? false : null"
              size="lg"
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
import { required } from '@validations'

export default {
  name: 'MedicalCenterForm',
  components: {
    ValidationObserver,
    ValidationProvider,
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
      validate,
    }
  },
}
</script>

<style scoped></style>
