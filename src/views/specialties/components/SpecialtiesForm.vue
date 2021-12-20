<template>
  <validation-observer ref="refFormObserver">
    <b-form-group label="Nombre Especialidad">
      <validation-provider v-slot="{ errors }" name="Nombre de la Especialidad" rules="required">
        <b-form-input v-model="formData.name" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group label="Especialidad">
      <b-form-checkbox
        v-model="formData.is_general"
        checked="false"
        name="check-button"
        switch
        inline
      >
        Es general
      </b-form-checkbox>
    </b-form-group>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required } from '@validations'

export default {
  name: 'SpecialtiesForm',
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
