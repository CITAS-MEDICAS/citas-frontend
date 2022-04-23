<template>
  <div class="page-wrapper">
    <b-row>
      <b-col cols="12" xl="9" md="8">
        <b-card no-body>
          <b-card-body>
            <relationshipForm ref="refForm" />
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" xl="3" md="4">
        <b-card>
          <b-button v-if="$can('update', PERMISSION_RELATIONSHIPS)"  variant="primary" block @click="handleSubmit()">Guardar</b-button>
          <b-button variant="outline-secondary" block @click="handleCancel()">Cancelar</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { provide, ref } from '@vue/composition-api'

import relationshipForm from './components/relationshipForm.vue'
import { TypesResource } from '@/network/lib/types'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { PERMISSION_RELATIONSHIPS } from '@/permissions'

export default {
  name: 'RelationshipEdit',
  components: {
    relationshipForm,
  },
  setup() {
    const formData = ref({
      name: '',
    })

    provide('formData', formData)

    return {
      formData,
      PERMISSION_RELATIONSHIPS,
    }
  },
  created() {
    this.getResourceData()
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.refForm.validate()

      if (!isValid) return
    
      const { data } = await TypesResource.update(this.$route.params.id, this.formData)

      if (data) {
        this.$router.push({ name: 'relationship-list' }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Creado Exitosamente!`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    handleCancel() {
      this.$router.push({ name: 'relationship-list' })
    },
    async getResourceData() {      
      const { data } = await TypesResource.getById(this.$route.params.id)      
      this.formData = data.types
    },
  },
}
</script>

<style scoped></style>
