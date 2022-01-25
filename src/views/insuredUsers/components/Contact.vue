<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Contacto</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col sm="8">
            <b-form-group label="Ciudad/Localidad *">
              <validation-provider v-slot="{ errors }" name="Ciudad/Localidad" rules="required">
                <b-form-input v-model="formData.region" :state="errors.length ? false : null" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Zona/Barrio *">
          <validation-provider v-slot="{ errors }" name="Zona/Barrio" rules="required">
            <b-form-input v-model="formData.address_zone" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Dirección *">
          <validation-provider v-slot="{ errors }" name="Dirección" rules="required">
            <b-form-input v-model="formData.address" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Telefono/Celular de Referencia *">
          <validation-provider
            v-slot="{ errors }"
            name="Telefono/Celular de Referencia"
            rules="required"
          >
            <b-form-input
              v-model="formData.reference_phone_number"
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

import { required } from '@core/utils/validations/validations'

export default {
  name: 'Contact',
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
      validate,
    }
  },
}
</script>

<style scoped></style>
