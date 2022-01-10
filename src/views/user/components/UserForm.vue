<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Información Personal</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nombre *">
              <validation-provider v-slot="{ errors }" name="Nombre" rules="required|min:3">
                <b-form-input v-model="formData.name" :state="errors.length ? false : null" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Apellido Paterno">
              <validation-provider v-slot="{ errors }" name="Apellido Paterno" rules="min:3">
                <b-form-input
                  v-model="formData.paternal_surname"
                  :state="errors.length ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Apellido Materno *">
              <validation-provider
                v-slot="{ errors }"
                name="Apellido Materno"
                rules="required|min:3"
              >
                <b-form-input
                  v-model="formData.maternal_surname"
                  :state="errors.length ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <hr />

        <b-row>
          <b-col sm="9" lg="8">
            <b-form-group label="CI *">
              <validation-provider v-slot="{ errors }" name="CI" rules="required|min:5">
                <b-form-input v-model="formData.ci" :state="errors.length ? false : null" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="3" lg="4">
            <b-form-group label="CI Exp.">
              <validation-provider v-slot="{ errors }" name="CI Exp. *" rules="required">
                <v-select v-model="formData.ci_exp" :options="ciOptions">
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

        <b-row>
          <b-col md="6">
            <b-form-group label="Fecha de Nacimiento *">
              <validation-provider v-slot="{ errors }" name="Fecha de Nacimiento" rules="required">
                <b-form-input
                  v-model="formData.birth_date"
                  :state="errors.length ? false : null"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Telefono/Celular *">
              <validation-provider v-slot="{ errors }" name="Telefono/Celular" rules="required">
                <b-form-input
                  v-model="formData.phone_number"
                  :state="errors.length ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Género *">
              <validation-provider v-slot="{ errors }" name="Género" rules="required">
                <b-form-radio-group
                  v-model="formData.gender"
                  :options="[
                    { text: 'Masculino', value: 'M' },
                    { text: 'Femenino', value: 'F' },
                  ]"
                  name="radio-inline"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <b-form-group label="Código/Matricula">
          <validation-provider v-slot="{ errors }" name="Código/Matricula">
            <b-form-input
              v-model="formData.staff_registration_code"
              :state="errors.length ? false : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>

    <hr />

    <b-row>
      <b-col lg="5">
        <h3>Cuenta</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Correo Electronico *">
              <validation-provider
                v-slot="{ errors }"
                name="Correo Electronico"
                rules="required|email"
              >
                <b-form-input v-model="formData.email" :state="errors.length ? false : null" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Contraseña">
              <validation-provider
                v-slot="{ errors }"
                name="Contraseña"
                vid="Password"
                rules="min:5"
              >
                <b-form-input
                  v-model="formData.password"
                  :state="errors.length ? false : null"
                  type="password"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Confirma contraseña">
              <validation-provider v-slot="{ errors }" name="Contraseña" rules="confirmed:Password">
                <b-form-input
                  v-model="formData.password_confirmation"
                  :state="errors.length ? false : null"
                  type="password"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <UserRoleList ref="refUserRoleList" />

    <pre>{{ formData }}</pre>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'
import { required, confirmed, min, email, date } from '@validations'
import UserRoleList from '@/views/user/components/UserRoleList'

export default {
  name: 'UserForm',
  components: {
    ValidationObserver,
    ValidationProvider,
    UserRoleList,
  },
  data() {
    return {
      ciOptions: ['CH', 'LP', 'CB', 'OR', 'PT', 'TJ', 'SC', 'BE', 'PD'],
    }
  },
  setup() {
    const formData = inject('formData')
    const refFormObserver = ref(null)
    const refUserRoleList = ref(null)

    const validate = async () => {
      const form = await refFormObserver.value.validate()
      const list = await refUserRoleList.value.validate()
      return form && list
    }

    return {
      formData,
      refFormObserver,
      refUserRoleList,
      required,
      confirmed,
      min,
      email,
      date,
      validate,
    }
  },
  methods: {
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
