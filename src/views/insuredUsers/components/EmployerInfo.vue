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
            <v-select
              v-model="formData.employer_code"
              label="code"
              :filterable="false"
              :options="employers"
              :reduce="item => item.code"
              placeholder="ej. 11-222-1234567"
              @search="onSearchEmployer"
              @input="handleSelectEmployer"
            >
              <template slot="no-options">No se encontraron resultados...</template>
              <template slot="option" slot-scope="option">
                {{ option.name }}
              </template>
              <template slot="selected-option" slot-scope="option">
                <code>{{ option.code }}</code>
              </template>
            </v-select>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group label="Empleador">
          <validation-provider v-slot="{ errors }" name="Empleador" rules="required">
            <b-form-input
              v-model="formData.employer_name"
              :state="errors.length ? false : null"
              readonly
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-row>
          <b-col sm="6">
            <b-form-group label="Salario Actual (Bs.)">
              <validation-provider v-slot="{ errors }" name="Salario" rules="required">
                <b-form-input
                  v-model="formData.salary"
                  type="number"
                  :state="errors.length ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Inicio de Relacion Laboral *">
              <validation-provider v-slot="{ errors }" name="Inicio de Relacion Laboral" rules="required">
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
import { toRefs, inject, ref } from '@vue/composition-api'

import { required } from '@core/utils/validations/validations'
import { debounce } from '@/libs/utils'
import { InsuranceApi } from '@/network/lib/insuranceApi'

export default {
  name: 'EmployerInfo',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    validateForm: {
      type: Boolean,
      required: false,
      default: true,
    },
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
      employers: [],
    }
  },
  setup(props) {
    const { validateForm } = toRefs(props)

    const formData = inject('formData')
    const refFormObserver = ref(null)

    const validate = async () => {
      const isValid = await refFormObserver.value.validate()
      return validateForm.value ? isValid : true
    }

    return {
      formData,
      refFormObserver,
      required,
      validate,
    }
  },
  methods: {
    onSearchEmployer(term, loading) {
      if (term.length > 5) {
        loading(true)
        this.searchEmployer(loading, term, this)
      }
    },
    searchEmployer: debounce(async (loading, term, vm) => {
      const { data } = await InsuranceApi.search({ code: term })
      loading(false)
      vm.employers = data.rows
    }, 500),

    handleSelectEmployer() {
      this.formData.employer_name = ''
      this.formData.employer_name = this.employers.find(
        item => item.code === this.formData.employer_code
      )?.name
    },
  },
}
</script>

<style scoped></style>
