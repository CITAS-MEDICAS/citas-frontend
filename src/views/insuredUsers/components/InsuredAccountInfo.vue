<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Cuenta</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col :sm="6">
            <b-form-group label="Tipo de Cuenta *">
              <validation-provider v-slot="{ errors }" name="Tipo de Cuenta" rules="required">
                <b-form-radio-group
                  v-model="formData.isNewAccount"
                  :options="[
                    { text: 'Nueva', value: true },
                    { text: 'Existente', value: false },
                  ]"
                  name="accountType"
                  class="mt-1"
                  @change="handleAccountType"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group v-if="!formData.isNewAccount" label=" Usuario *">
          <validation-provider v-slot="{ errors }" name="Usuario" rules="required">
            <!--            <v-select-->
            <!--              v-model="formData.user_id"-->
            <!--              :options="users"-->
            <!--              :reduce="item => item.id"-->
            <!--              label="name"-->
            <!--              :clearable="false"-->
            <!--              placeholder="Buscar..."-->
            <!--            >-->
            <!--              <template #search="{ attributes, events }">-->
            <!--                <input-->
            <!--                  class="vs__search"-->
            <!--                  :required="errors.length ? false : null"-->
            <!--                  v-bind="attributes"-->
            <!--                  v-on="events"-->
            <!--                />-->
            <!--              </template>-->
            <!--            </v-select>-->
            <b-form-input v-model="formData.user_id" :state="errors.length ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-row v-if="formData.isNewAccount">
          <b-col cols="12">
            <b-form-group label="Correo Electronico *">
              <validation-provider
                v-slot="{ errors }"
                name="Correo Electronico"
                rules="required|email"
              >
                <b-form-input
                  v-model="formData.email"
                  type="email"
                  :state="errors.length ? false : null"
                />
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
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { toRefs, inject, ref } from '@vue/composition-api'
import { required, confirmed, min, email } from '@validations'

export default {
  name: 'InsuredAccountInfo',
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
      users: [],
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
      confirmed,
      email,
      min,
      validate,
    }
  },
  methods: {
    handleAccountType() {
      this.formData.user_id = null
      this.formData.email = null
      this.formData.password = null
      this.formData.password_confirmation = null
      this.formData.name = null
      this.formData.paternal_surname = null
      this.formData.maternal_surname = null
      this.formData.ci = null
      this.formData.ci_exp = null
      this.formData.birth_date = null
      this.formData.gender = null
      this.formData.phone_number = null
    },
  },
}
</script>

<style scoped></style>
