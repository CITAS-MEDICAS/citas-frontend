<template>
  <div class="page-wrapper">
    <b-row class="mt-3">
      <b-col cols="12" xl="9" lg="8">
        <b-card no-body>
          <b-card-body>
            <validation-observer ref="refFormObserver">
              <b-row>
                <b-col lg="5">
                  <h3>Contacto</h3>
                </b-col>
                <b-col lg="7">
                  <b-row>
                    <b-col sm="8">
                      <b-form-group label="Ciudad/Localidad *">
                        <validation-provider v-slot="{ errors }" name="Ciudad/Localidad" rules="required">
                          <b-form-input v-model="formData.region" :state="errors.length ? false : null" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-form-group label="Zona/Barrio *">
                    <validation-provider v-slot="{ errors }" name="Zona/Barrio" rules="required">
                      <b-form-input v-model="formData.address_zone" :state="errors.length ? false : null" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group label="Dirección *">
                    <validation-provider v-slot="{ errors }" name="Dirección" rules="required">
                      <b-form-input v-model="formData.address" :state="errors.length ? false : null" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group label="Telefono/Celular de Referencia *">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Telefono/Celular de Referencia"
                      rules="required|length:8"
                    >
                      <b-form-input
                        v-model="formData.reference_phone_number"
                        :state="errors.length ? false : null"
                        type="number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </validation-observer>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" lg="4">
        <b-card>
          <b-button variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { InsuredResource } from '@/network/lib/insured'
import { PERMISSION_MEDICAL_APPOINTMENTS } from '@/permissions'
import { required, length } from '@core/utils/validations/validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'InsuredContactEdit',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  setup() {
    const formData = ref({
      name: '',
      address: '',
      institution_code: '',
      institution_network: '',
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_MEDICAL_APPOINTMENTS,
    }
  },
  created() {
    this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      // const isValid = await this.$refs.refForm.validate()

      // if (!isValid) return
      const { data } = await InsuredResource.update(this.$route.params.id, this.formData)

      const validate = async () => {
        return await refFormObserver.value.validate()
      }

      if (data.insured) {
        this.$router.push({ name: 'dependent-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Editado el Contacto Exitosamente!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    handleCancel() {
      this.$router.push({ name:  'dependent-list' })
    },

    async getResourceData() {
      const { data } = await InsuredResource.getById(this.$route.params.id)
      this.formData = data.insured
    },
  },
}
</script>
<style scoped></style>
