<template>
  <div>
    <b-row align-v="center" align-h="between">
      <b-col class="my-1">
        <h3 class="mb-0">Roles de Usuario</h3>
      </b-col>
      <b-col class="my-1" md="4">
        <b-button variant="flat-primary" block @click="addItem()"> Agregar Rol</b-button>
      </b-col>
    </b-row>

    <validation-observer ref="refFormObserver">
      <div class="table-responsive" style="padding-bottom: 150px">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th></th>
              <th width="50%">ROL</th>
              <th width="40%">DESCRIPCION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formData.roles" :key="index">
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
                  :vid="`role_${index}`"
                  name="Rol"
                  rules="required"
                >
                  <v-select
                    v-model="item.role_id"
                    label="display_name"
                    :clearable="false"
                    :reduce="record => record.id"
                    :options="roles"
                    :selectable="option => !selectedRoles.includes(option.id)"
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
              <td>
                <RoleVariant :role="getRoleInfo(item.role_id)" />
                <small>
                  {{ getRoleInfo(item.role_id) ? getRoleInfo(item.role_id).description : '' }}
                </small>
              </td>
            </tr>
            <tr v-if="formData.roles.length === 0">
              <td colspan="3">
                <p class="text-center my-5">
                  El usuario aun no tiene Roles.
                  <a href="#" @click.prevent="addItem">Agregar Rol</a>
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
import { RoleResource } from '@/network/lib/role'

import RoleVariant from '@/custom/components/RoleVariant'

export default {
  name: 'UserRoleList',
  components: {
    ValidationObserver,
    ValidationProvider,
    RoleVariant,
  },
  data() {
    return {
      roles: [],
    }
  },
  setup() {
    const formData = inject('formData')
    const refFormObserver = ref(null)

    const validate = async () => await refFormObserver.value.validate()

    const addItem = () => {
      formData.value.roles.push({
        id: (Math.random() * 1000).toFixed(),
        ...{
          role_id: null,
        },
      })
    }

    const removeItem = index => {
      formData.value.roles.splice(index, 1)
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
    selectedRoles() {
      return this.formData.roles.map(role => role.role_id)
    },
  },
  mounted() {
    this.fetchRoles()
  },
  methods: {
    async fetchRoles() {
      const { data } = await RoleResource.getAll()
      this.roles = data.rows
    },
    getRoleInfo(roleId) {
      return this.roles.find(item => item.id === roleId)
    },
  },
}
</script>

<style scoped></style>
