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
              :reduce="item => item.id"
              label="name"
            />
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
              :reduce="item => item.id"
              label="name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Especialidad">
          <validation-provider v-slot="{ errors }" name="Especialidad" rules="required">
            <v-select
              v-model="formData.specialty_type_id"
              :options="filterSpecialties"
              :clearable="true"
              :reduce="item => item.id"
              label="name"
            />
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
                  :reduce="item => item.id"
                  label="name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Duración consulta">
              <validation-provider v-slot="{ errors }" name="Duración" rules="required">
                <v-select v-model="formData.duration_time" :options="[10,15,20,25,30,35,40,45,50,55]">
                  <template v-slot:selected-option="option">
                    {{ option.label }} minutos
                  </template>
                  <template v-slot:option="option">
                    {{ option.label }} minutos
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Reservar con anticipación de">
              <validation-provider v-slot="{ errors }" name="Reservacion" rules="required">
                <v-select v-model="formData.advance_booking_days" :options="[10,20,30,60,90]">
                  <template v-slot:selected-option="option">
                    {{ option.label }} dias
                  </template>
                  <template v-slot:option="option">
                    {{ option.label }} dias
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
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
    MedicalUnitUsersList
  },
  data() {
    return {
      medicalCenters: [],
      serviceHour: [],
      unitTypes: [],
      specialties: []
    }
  },
  computed: {
    filterSpecialties() {
      console.log("xxxx")
      const unitType = this.unitTypes.find(item => this.formData.unit_type_id == item.id)
      console.log(unitType)
      if (unitType) {
        const specialties = this.specialties.filter(item => item.filter === unitType.filter)
        console.log(specialties)
        const findSpecialty = specialties.filter(item => item.id === this.formData.specialty_type_id)
        if(findSpecialty.length === 0) {
          this.formData.specialty_type_id = null
        }
        return specialties
      }
      return []
    }
  },
  mounted() {
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
      validate
    }
  },
  methods: {
    async fetchMedicalCenter() {
      const { data } = await MedicalCenterResource.getAll({ sortByAsc: 'name' })
      return data.rows
    },
    async fetchUnitTypes() {
      const { data } = await TypesResource.getUnitTypes({ sortByAsc: 'name' })
      return data.rows
    },
    async fetchServiceHours() {
      const { data } = await ServiceHoursResource.getAll({ sortByAsc: 'id' })
      return data.rows
    },
    async fetchSpecialties() {
      const { data } = await TypesResource.getSpecialties({ sortByAsc: 'name' })
      return data.rows
    },

    async fetchResources() {
      const [medicalCenters, serviceHours, unitTypes, specialties] = await Promise.all([
        this.fetchMedicalCenter(),
        this.fetchServiceHours(),
        this.fetchUnitTypes(),
        this.fetchSpecialties()
      ])

      this.medicalCenters = medicalCenters
      this.serviceHour = serviceHours
      this.unitTypes = unitTypes
      this.specialties = specialties
    }
  }
}
</script>

<style scoped></style>
