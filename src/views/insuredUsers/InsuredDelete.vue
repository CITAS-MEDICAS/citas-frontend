<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <b-form-group label="Motivo de la Baja del Titular o Dependientes">
              <validation-provider #default="{ errors }" rules="minmax:5,100|required|regex:^([0-9a-zA-Z-. ]+)$" name="Motivo">
                <b-form-input
                  v-model="formData.obs"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Dejo de trabajar en la empresa"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" md="4">
        <b-card>
          <b-button variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'
import { extend ,ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { InsuredResource } from '@/network/lib/insured'
import { PERMISSION_MEDICAL_CENTER } from '@/permissions'
import {app} from "@/main"
import ToastificationContent from "@core/components/toastification/ToastificationContent";
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: 'El {_field_} es de {min} a {max} caracteres válidos.'
})
export default {
  name: 'MedicalCenterEdit',
  components: {
    ValidationProvider,
  },
  setup() {
    const formData = ref({
      obs: '',
    })

    provide('formData', formData)

    return {
      formData,
    }
  },
  created() {
    // this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      const result = await app.$swal({
        title: '¿Esta used seguro/a?',
        text: 'Posiblemente no se pueda revertir el cambio.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Continuar!',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-outline-dark ml-1',
        },
        buttonsStyling: false,
      })

      if (!result.isConfirmed) return false
      let insuredId = this.$route.params.id
      const isDeleted = await InsuredResource.deleteWithObs(insuredId,this.formData.obs)

      if (isDeleted.status == 204) {
        this.$router.push({ name: 'insured-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `! Baja realizada ¡`,
              icon: 'CheckIcon',
              variant: 'warning',
            },
          })
        })
        return true
      } else {
        app.$swal({
          icon: 'warning',
          title: '¡Error!',
          text: 'Ocurrio un error en el proceso, consulte con el administrador',
          timer: 1500,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })

        return false
      }
    },
    handleCancel() {
      this.$router.push({ name: 'insured-list' })
    },
  },
}
</script>

<style scoped></style>
