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
                  v-model="formData.insuredType"
                  :options="[
                    { text: 'Titular', value: 'T' },
                    { text: 'Dependiente', value: 'D' },
                  ]"
                  name="radio-inline"
                  class="mt-1"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="formData.insuredType === 'D'">

          <b-col :sm="6">
            <b-form-group label="CI Titular *">
              <validation-provider v-slot="{ errors }" name="CI Titular" rules="required">
                <b-form-input
                  v-model="formData.registration_code"
                  :state="errors.length ? false : null"
                  placeholder="123456ABC"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Parentesco *">
              <validation-provider v-slot="{ errors }" name="Codigo Beneficiario" rules="required">
                <v-select
                  v-model="formData.relationship_code"
                  :options="relationships"
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

        <b-row v-if="formData.insuredType === 'T'">
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
  mounted() {
    this.getRelationships()
  },
  methods: {
    async getRelationships() {
      const { data } = await TypesResource.getAll({ scope: 'relationship', sortByAsc: 'id' })
      this.relationships = data.rows
    },
  },
}
</script>

<style scoped></style>
