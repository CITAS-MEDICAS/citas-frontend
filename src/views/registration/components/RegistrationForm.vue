<template>
  <form-wizard
    title="Formulario AVC-04"
    subtitle="Datos de afiliación y reingreso del trabajador"
    finish-button-text="Guardar"
    back-button-text="Atrás"
    next-button-text="Siguiente"
    class="steps-transparent mb-3"
    @on-complete="formSubmitted"
  >
    <!-- account detail tab -->
    <tab-content title="1. Empleador" icon="feather icon-file-text" :before-change="validationForm">
      <validation-observer ref="accountRules" tag="form">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Codigo Patronal">
              <validation-provider v-slot="{ errors }" name="Codigo Patronal" rules="minmax:12,13|required|regex:^([0-9-]+)$">
                <b-form-input
                  v-model="formData.employer_code"
                  :state="errors.length > 0 ? false:null"
                  placeholder="00-000-00000000"
                  @change="SendEmployer_code(true)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nombre o razon social del Empleador" disabled>
              <!-- <validation-provider v-slot="{ errors }" name="Empleador" rules="required"> -->
              <validation-provider v-slot="{ errors }" name="Empleador" rules="required">
                <b-form-input v-model="formData.employer_name" :state="errors.length ? false : null" size="lg"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Fecha de Afiliación">
              <b-form-datepicker
                id="affiliation_date"
                v-model="formData.affiliation_date"
                locale="es"
                :show-decade-nav="true"
                :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
                menu-class="w-100"
                calendar-width="100%"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </tab-content>

    <tab-content title="2. Centro de Salud" icon="feather icon-file-text"  :before-change="validationForm2">
      <validation-observer ref="accountRules2" tag="form">
        <MedicalUnit ref="refMedicalUnit" />
      </validation-observer>
    </tab-content>

    <tab-content title="3. Datos Personales" icon="feather icon-file-text" :before-change="validationForm3">
      <validation-observer ref="accountRules3" tag="form">
        <b-row>
          <b-col cols="6">
            <b-form-group label="Carnet">
              <validation-provider #default="{ errors }" rules="minmax:5,12|required|regex:^([0-9a-zA-Z-]+)$" name="Carnet">
                <b-form-input
                  v-model="formData.ci"
                  :state="errors.length > 0 ? false:null"
                  placeholder="00000000-xx"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="3" class="mb-2">
            <b-form-group label="Expedido en">
              <validation-provider v-slot="{ errors }" name="expedido" rules="required">
                <b-form-select
                  v-model="formData.exp"
                  :options="options.sigla"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" class="mb-2">
            <b-form-group label="Número de Asegurado o Matricula">
              <validation-provider v-slot="{ errors }" name="Matricula" rules="minmax:9,10|required|regex:^([0-9a-zñA-ZÑ-]+)$">
                <b-form-input
                  v-model="formData.code_affiliate"
                  :state="errors.length > 0 ? false:null"
                  placeholder="000000ABC"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Fecha de Nacimiento">
              <b-form-datepicker
                id="birth_date"
                v-model="formData.birth_date"
                locale="es"
                :show-decade-nav="true"
                :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
                menu-class="w-100"
                calendar-width="100%"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Nombres">
              <validation-provider v-slot="{ errors }" name="Nombres" rules="minmax:2,40|required|regex:^([A-ZÑ ]+)$">
                <b-form-input
                  v-model="formData.name"
                  class="form-control"
                  :state="errors.length ? false : null"
                  onkeyup="this.value=this.value.toUpperCase();"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="6" class="mb-2">
            <b-form-group label="Paterno">
              <validation-provider v-slot="{ errors }" name="Paterno" rules="minmax:2,40|required|regex:^([A-ZÑ ]+)$">
                <b-form-input
                  v-model="formData.paternal_surname"
                  class="form-control"
                  :state="errors.length ? false : null"
                  onkeyup="this.value=this.value.toUpperCase();"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Materno">
              <validation-provider v-slot="{ errors }" name="Materno" rules="minmax:2,40|required|regex:^([A-ZÑ ]+)$">
                <b-form-input
                  v-model="formData.maternal_surname"
                  class="form-control"
                  :state="errors.length ? false : null"
                  onkeyup="this.value=this.value.toUpperCase();"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="6" class="mb-2">
            <validation-provider v-slot="{ errors }" name="Género" rules="required">
              <b-form-group label="Género">
                <b-form-select v-model="formData.gender" :options="options.gender"/>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" class="mb-2">
            <b-form-group label="Celular">
              <validation-provider #default="{ errors }" name="Celular" rules="minmax:8,9|required|regex:^([0-9]+)$">
                <b-form-input
                  id="email"
                  v-model="formData.phone_number"
                  type="email"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="6" class="mb-2">
            <b-form-group label="Correo electronico personal" label-for="email">
              <validation-provider #default="{ errors }" name="email" rules="required|email">
                <b-form-input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="correo@mail.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </tab-content>
    <!-- <tab-content title="3. Domicilio y Ocupación" icon="feather icon-file-text" :before-change="validationForm2"> -->
    <tab-content title="4. Domicilio y Ocupación" icon="feather icon-file-text">
      <b-row>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Region">
            <validation-provider #default="{ errors }" name="Region" rules="minmax:4,40|required">
              <b-form-input
                id="address"
                v-model="formData.region"
                :state="errors.length > 0 ? false:null"
                onkeyup="this.value=this.value.toUpperCase();"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Zona">
            <validation-provider #default="{ errors }" name="Zona" rules="minmax:4,40|required">
              <b-form-input
                id="address"
                v-model="formData.address_zone"
                :state="errors.length > 0 ? false:null"
                onkeyup="this.value=this.value.toUpperCase();"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Dirección">
            <validation-provider #default="{ errors }" name="Celular" rules="minmax:7,40|required">
              <b-form-input
                id="address_zone"
                v-model="formData.address"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Ocupación">
            <validation-provider #default="{ errors }" name="Ocupacion" rules="minmax:5,40|required|regex:^([A-ZÑ ]+)$" >
              <b-form-input
                id="profession"
                v-model="formData.profession"
                :state="errors.length > 0 ? false:null"
                onkeyup="this.value=this.value.toUpperCase();"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Salario">
<!--            <validation-provider #default="{ errors }" name="Salario" rules="required|regex:^([0-9]+)$">-->
            <validation-provider #default="{ errors }" name="Salario" rules="required">
              <b-form-input
                v-model="formData.salary"
                type="number"
                :state="errors.length ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="6" class="mb-2">
          <b-form-group label="Fecha de ingreso al trabajo">
            <b-form-datepicker
              id="employer_date"
              v-model="formData.employer_date"
              locale="es"
              :show-decade-nav="true"
              :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
              menu-class="w-100"
              calendar-width="100%"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>
<!--    <pre>{{ formData }}</pre>-->
    <b-card no-body>
      <b-card-body body-text-variant="primary">
        NOTA : Debe registrar su información según su AVC-04 de forma exacta según lo que se solicita, el código patronal según el ej. 01-730-00001,
        si no lo encuentra o tiene algún problema con su registro envíe un mensaje al correo informaciones@cnslpz.bo.,
        en el punto 2. Centro de Salud, busque y seleccione el Centro de Salud y el número de consultorio donde le atienden.
      </b-card-body>
    </b-card>
  </form-wizard>
</template>

<script>
import { extend ,ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { FormWizard, TabContent } from 'vue-form-wizard'
import { inject, ref } from '@vue/composition-api'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import MedicalUnit from '@/views/insuredUsers/components/MedicalUnit.vue'
import {debounce} from "@/libs/utils"
import {InsuranceApi} from "@/network/lib/insuranceApi"
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: 'El {_field_} es de {min} a {max} caracteres válidos.'
});
export default {
  name: 'RegistrationForm',
  components: {
    FormWizard,
    TabContent,
    ValidationObserver,
    ValidationProvider,
    MedicalUnit,
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
      options: {
        date: {
          date: true,
          delimiter: '/',
          datePattern: ['d', 'm', 'Y'],
        },
        sigla:[
          { value: null, text: 'Seleccione' },
          { value: 'LP', text: 'LP' },
          { value: 'CB', text: 'CB' },
          { value: 'SC', text: 'SC' },
          { value: 'PT', text: 'PT' },
          { value: 'CH', text: 'CH' },
          { value: 'TJ', text: 'TJ' },
          { value: 'BN', text: 'BN' },
          { value: 'PA', text: 'PA' },
        ],
        gender:[
          { value: null, text: 'Seleccione' },
          { value: 'M', text: 'Masculino' },
          { value: 'F', text: 'Femenino' },
        ],
        employer_code:{
          delimiter: ' ',
          blocks: [2,3,8],
        },
        carnet:{
          uppercase: true,
        },
        matricula:{
          blocks: [11],
          uppercase: true,
        },
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          numeralDecimalMark: '.',
          // delimiter: '.',
        },
        phone: {
          phone: true,
          phoneRegionCode: 'US',
        },
      },
    }
  },
  methods: {
    searchEmployer: debounce(async (loading, term, vm) => {
      vm.formData.employer_name = ''
      const { data } = await InsuranceApi.search({ code: term })
      // loading(false)
      if (data.rows.length > 0) {
        vm.formData.employer_name = data.rows[0].name
      }

    }, 500),
    uppercase() {
      console.log(this.formData)
      this.formData.name = this.formData.name.toUpperCase()
    },
    SendEmployer_code(loading){
      try {
        if (this.formData.employer_code.length > 5) {
          this.searchEmployer(true, this.formData.employer_code,this)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async formSubmitted() {
      this.$parent.handleSubmit();
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationForm2() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules2.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationForm3() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules3.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>

<style scoped></style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
</style>
