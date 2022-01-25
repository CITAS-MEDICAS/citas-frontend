<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Datos Empleador</h3>
        <p class="mt-2">
          Para verificar el estado de la empresa donde trabaja cuenta con un estado
          <code>ACTIVO</code>, escribe el Código Patronal que se encuentra en el
          <code>AVC-04</code>.
        </p>
        <p><code>Ej: 01 - 730 - 0000001 </code></p>
        <small>
          <strong>Nota:</strong> En este paso solo pueden registrarse los
          <strong> Asegurados Titulares.</strong>
        </small>
      </b-col>
      <b-col lg="7">
        <b-form-group label="Código Patronal" label-for="employer_code">
          <validation-provider v-slot="{ errors }" name="Código Patronal" rules="required">
            <cleave
              id="employer_code"
              v-model="formData.employer_code"
              class="form-control form-control-lg w-75"
              placeholder="11-222-1234567"
              :options="mask.employer_code"
              :raw="false"
              :state="errors.length ? false : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group label="Empleador">
          <validation-provider v-slot="{ errors }" name="Empleador" rules="required">
            <b-form-input v-model="formData.employer_name" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-group label="Salario Actual">
              <validation-provider v-slot="{ errors }" name="Salario" rules="required">
                <b-form-input v-model="formData.salary" :state="errors.length ? false : null" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Inicio de Contrato *">
              <validation-provider v-slot="{ errors }" name="Inicio de Contrato" rules="required">
                <b-form-input
                  v-model="formData.employer_date"
                  type="date"
                  :state="errors.length ? false : null"
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
import Cleave from 'vue-cleave-component'
import { required } from '@core/utils/validations/validations'

export default {
  name: 'EmployerInfo',
  components: {
    ValidationObserver,
    ValidationProvider,
    Cleave,
  },
  data() {
    return {
      mask: {
        employer_code: {
          numericOnly: true,
          delimiters: ['-', '-', '-'],
          blocks: [2, 3, 7],
        },
      },
    }
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
