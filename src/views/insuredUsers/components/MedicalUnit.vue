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
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <b-row>
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
        <hr />
        <b-form-group label="Centro de Salud Asignado *">
          <validation-provider v-slot="{ errors }" name="Centro de Salud" rules="required">
            <v-select
              v-model="formData.medical_center_id"
              :options="medicalCenters"
              :reduce="item => item.id"
              label="name"
              :clearable="false"
              @input="handleMedicalCenter"
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

        <b-form-group label="Consultorio *">
          <validation-provider v-slot="{ errors }" name="Consultorio " rules="required">
            <v-select
              v-model="formData.medical_unit_id"
              :options="medicalUnits"
              :reduce="item => item.id"
              label="name"
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
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'

import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import { required } from '@core/utils/validations/validations'

export default {
  name: 'MedicalUnit',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      medicalCenters: [],
      medicalUnits: [],
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
    this.getMedicalCenters()
  },
  methods: {
    async getMedicalCenters() {
      const { data } = await MedicalCenterResource.getAll({ has: 'units' })
      this.medicalCenters = data.rows
    },
    async getMedicalUnits() {
      const { data } = await MedicalUnitResource.getAll({
        'filter[medical_center_id]': this.formData.medical_center_id,
      })
      this.medicalUnits = data.rows
    },
    handleMedicalCenter() {
      this.formData.medical_unit_id = ''
      this.getMedicalUnits()
    },
  },
}
</script>

<style scoped></style>
