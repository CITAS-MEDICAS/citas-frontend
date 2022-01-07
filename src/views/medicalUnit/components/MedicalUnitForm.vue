<template>
  <validation-observer ref="refFormObserver">
    <div class="d-flex justify-content-end align-items-center">
      <label for="is_enabled" class="mr-5">Habilitado para Consultas </label>
      <b-form-checkbox id="is_enabled" v-model="formData.is_enabled" :checked="true" switch />
    </div>

    <hr />

    <b-row>
      <b-col lg="5"></b-col>
      <b-col lg="7">
        <b-form-group label="Centro de Salud">
          <validation-provider v-slot="{ errors }" name="Centro de Salud" rules="required">
            <v-select
              v-model="formData.medical_center_id"
              :options="medicalCenters"
              :clearable="true"
              :reduce="item => item.value"
              label="label"
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

        <b-form-group label="Código">
          <validation-provider v-slot="{ errors }" name="Código" rules="required">
            <b-form-input v-model="formData.code" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Nombre">
          <validation-provider v-slot="{ errors }" name="Nombre del consultorio" rules="required">
            <b-form-input v-model="formData.name" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-row>
          <b-col sm="6">
            <b-form-group label="Horario de Atención">
              <validation-provider v-slot="{ errors }" name="Horario de Atención" rules="required">
                <v-select
                  v-model="formData.service_hour_id"
                  :options="serviceHour"
                  :clearable="true"
                  :reduce="item => item.value"
                  label="label"
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
          <b-col sm="6">
            <b-form-group label="Duración(min)">
              <validation-provider v-slot="{ errors }" name="Duración" rules="required">
                <b-form-input
                  v-model="formData.duration_time"
                  :state="errors.length ? false : null"
                  type="number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <hr />

    <b-row>
      <b-col lg="5"></b-col>
      <b-col lg="7">
        <b-form-group label="Tipo de Consultorio">
          <validation-provider v-slot="{ errors }" name="Tipo de Consultorio" rules="required">
            <v-select
              v-model="formData.unit_type_id"
              :options="unitTypes"
              :clearable="true"
              :reduce="item => item.value"
              label="label"
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

        <b-form-group label="Especialidad">
          <validation-provider v-slot="{ errors }" name="Especialidad" rules="required">
            <v-select
              v-model="formData.specialty_type_id"
              :options="specialties"
              :clearable="true"
              :reduce="item => item.value"
              label="label"
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
    <hr />
    <MedicalUnitUsersList ref="refUsersList" />
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required } from '@validations'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { TypesResource } from '@/network/lib/types'
import { ServiceHoursResource } from '@/network/lib/serviceHours'
import MedicalUnitUsersList from '@/views/medicalUnit/components/MedicalUnitUsersList'

export default {
  name: 'MedicalUnitForm',
  components: {
    ValidationObserver,
    ValidationProvider,
    MedicalUnitUsersList,
  },
  data() {
    return {
      medicalCenters: [],
      serviceHour: [],
      unitTypes: [],
      specialties: [],
    }
  },
  created() {
    this.fetchResources()
  },
  setup() {
    const formData = inject('formData')
    const refFormObserver = ref(null)
    const refUsersList = ref(null)

    const validate = async () => {
      const form = await refFormObserver.value.validate()
      const list = await refUsersList.value.validate()
      return form && list
    }

    return {
      formData,
      refFormObserver,
      refUsersList,
      required,
      validate,
    }
  },
  methods: {
    async fetchMedicalCenter() {
      const { data } = await MedicalCenterResource.getAll({ sortByAsc: 'name' })
      return this.mapItems(data.rows)
    },
    async fetchUnitTypes() {
      const { data } = await TypesResource.getUnitTypes({ sortByAsc: 'name' })
      return this.mapItems(data.rows)
    },
    async fetchServiceHours() {
      const { data } = await ServiceHoursResource.getAll()
      return this.mapItems(data.rows)
    },
    async fetchSpecialties() {
      const { data } = await TypesResource.getSpecialties({ sortByAsc: 'name' })
      return this.mapItems(data.rows)
    },

    async fetchResources() {
      const [medicalCenters, serviceHours, unitTypes, specialties] = await Promise.all([
        this.fetchMedicalCenter(),
        this.fetchServiceHours(),
        this.fetchUnitTypes(),
        this.fetchSpecialties(),
      ])

      this.medicalCenters = medicalCenters
      this.serviceHour = serviceHours
      this.unitTypes = unitTypes
      this.specialties = specialties
    },

    mapItems(items, value, label) {
      value = value || 'id'
      label = label || 'name'

      return items.map(item => {
        return {
          value: item[value],
          label: item[label],
        }
      })
    },
  },
}
</script>

<style scoped></style>
