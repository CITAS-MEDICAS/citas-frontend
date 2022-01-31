<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Afiliación</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col :sm="6">
            <b-form-group label="Titularidad *">
              <validation-provider v-slot="{ errors }" name="Titularidad" rules="required">
                <b-form-radio-group
                  v-model="formData.insuredIsTitular"
                  :options="[
                    { text: 'Titular', value: true },
                    { text: 'Dependiente', value: false },
                  ]"
                  name="insuredType"
                  class="mt-1"
                  @change="handleInsuredType"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row v-if="!formData.insuredIsTitular">
          <b-col sm="12">
            <b-form-group label="Nro. Documento/CI Titular *">
              <validation-provider v-slot="{ errors }" name="CI Titular" rules="required">
                <b-form-input
                  v-model="formData.user_titular_id"
                  :state="errors.length ? false : null"
                  placeholder="ej. 1234567-1K"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group label="Parentesco *">
              <validation-provider v-slot="{ errors }" name="Codigo Beneficiario" rules="required">
                <v-select
                  v-model="formData.relationship_type_id"
                  :options="filterRelationships"
                  :reduce="item => item.id"
                  label="name"
                  :clearable="false"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="errors.length ? false : null"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row v-if="formData.insuredIsTitular">
          <b-col :sm="6">
            <b-form-group label="Número de Asegurado *">
              <validation-provider v-slot="{ errors }" name="Número de Asegurado" rules="required">
                <b-form-input
                  v-model="formData.registration_code"
                  :state="errors.length ? false : null"
                  placeholder="123456ABC"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col :sm="6">
            <b-form-group label="Fecha de Afiliación *">
              <validation-provider v-slot="{ errors }" name="Fecha de Afiliación" rules="required">
                <b-form-input
                  v-model="formData.affiliation_date"
                  :state="errors.length ? false : null"
                  placeholder="123456ABC"
                  type="date"
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

import { required } from '@core/utils/validations/validations'
import { TypesResource } from '@/network/lib/types'

export default {
  name: 'Membership',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      relationships: [],
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
  computed: {
    filterRelationships() {
      return this.relationships.filter(item => !item.name.includes('ID - Titular'))
    },
  },
  mounted() {
    this.getRelationships()
  },
  methods: {
    async getRelationships() {
      const { data } = await TypesResource.getAll({ scope: 'relationship', sortByAsc: 'id' })
      this.relationships = data.rows
    },
    handleInsuredType() {
      this.formData.relationship_type_id = null
      if (this.isTitular()) {
        const relationship = this.getIDTitular()
        this.formData.relationship_type_id = relationship.id
      }

      this.formData.isNewAccount = null
      this.formData.employer_code = null
      this.formData.employer_name = null
      this.formData.employer_date = null
      this.formData.salary = null
      this.formData.email = null
      this.formData.password = null
      this.formData.password_confirmation = null
      this.formData.isNewAccount = true
    },
    getIDTitular() {
      return this.relationships.find(item => item.name.includes('ID - Titular'))
    },
    isTitular() {
      return this.formData.insuredIsTitular
    },
  },
}
</script>

<style scoped></style>
