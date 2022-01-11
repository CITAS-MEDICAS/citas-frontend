<template>
  <div>
    <b-row align-v="center" align-h="between">
      <b-col class="my-1">
        <h3 class="mb-0">Centro de Salud</h3>
      </b-col>
      <b-col class="my-1" md="4">
        <b-button variant="flat-primary" block @click="addItem()"> Agregar Centro</b-button>
      </b-col>
    </b-row>

    <validation-observer ref="refFormObserver">
      <div class="table-responsive" style="padding-bottom: 150px">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th width="100px"></th>
              <th>CENTRO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formData.centers" :key="index">
              <td align="center">
                <b-button
                  variant="flat-danger"
                  class="btn-icon rounded-circle"
                  @click="removeItem(index)"
                >
                  <feather-icon icon="TrashIcon" />
                </b-button>
              </td>
              <td>
                <validation-provider
                  v-slot="{ errors }"
                  :vid="`center_${index}`"
                  name="Centro"
                  rules="required"
                >
                  <v-select
                    v-model="item.center_id"
                    label="name"
                    :clearable="false"
                    :reduce="record => record.id"
                    :options="centers"
                    :selectable="option => !selectedCenters.includes(option.id)"
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
              </td>
            </tr>
            <tr v-if="formData.centers.length === 0">
              <td colspan="3">
                <p class="text-center my-5">
                  El usuario aun no tiene un Centro de Salud Asignado.
                  <a href="#" @click.prevent="addItem">Agregar Centro</a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { inject, ref } from '@vue/composition-api'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'

export default {
  name: 'UserCenterList',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      centers: [],
    }
  },
  setup() {
    const formData = inject('formData')
    const refFormObserver = ref(null)

    const validate = async () => await refFormObserver.value.validate()

    const addItem = () => {
      formData.value.centers.push({
        id: (Math.random() * 1000).toFixed(),
        ...{
          center_id: null,
        },
      })
    }

    const removeItem = index => {
      formData.value.centers.splice(index, 1)
    }

    return {
      formData,
      refFormObserver,
      required,
      addItem,
      removeItem,
      validate,
    }
  },
  computed: {
    selectedCenters() {
      return this.formData.centers.map(role => role.role_id)
    },
  },
  mounted() {
    this.fetchCenters()
  },
  methods: {
    async fetchCenters() {
      const { data } = await MedicalCenterResource.getAll()
      this.centers = data.rows
    },
  },
}
</script>

<style scoped></style>
