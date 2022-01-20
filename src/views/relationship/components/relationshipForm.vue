<template>
  <validation-observer ref="refFormObserver">
    <b-form-group label="Nombre del Parentesco">
      <validation-provider v-slot="{ errors }" name="Nombre del Tipo de Parentesco" rules="required">
        <b-form-input v-model="formData.name" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required } from '@validations'

export default {
  name: 'relationshipForm',
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