<template>
  <validation-observer ref="refFormObserver">
    <b-form-group label="Nombre del Horario">
      <validation-provider v-slot="{ errors }" name="Nombre del Horario" rules="required">
        <b-form-input v-model="formData.name" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>

    <b-form-group label="Duracion">
      <validation-provider v-slot="{ errors }" name="Duración" rules="required">
        <b-form-input v-model="formData.duration" :state="errors.length ? false : null" size="lg" />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>

    <b-row>
      <b-col sm="6">
        <b-form-group label="Inicio">
          <validation-provider v-slot="{ errors }">
            <b-form-input
              v-model="formData.startTime"
              :state="errors.length ? false : null"
              size="lg"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-col sm="6">
        <b-form-group label="Fin">
          <validation-provider v-slot="{ errors }">
            <b-form-input
              v-model="formData.endTime"
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
  name: 'ServiceHourForm',
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
