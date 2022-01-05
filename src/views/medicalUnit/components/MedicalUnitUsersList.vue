<template>
  <div>
    <b-row align-v="center" align-h="between">
      <b-col class="my-1">
        <h3 class="mb-0">Usuarios Consultorio</h3>
      </b-col>
      <b-col class="my-1" md="4">
        <b-button variant="primary" block @click="addItem()"> Agregar Personal</b-button>
      </b-col>
    </b-row>

    <validation-observer>
      <div class="table-responsive" style="padding-bottom: 150px">
        <table class="table table-sm table-bordered">
          <thead>
            <tr>
              <th></th>
              <th width="50%">NOMBRE</th>
              <th width="40%">ROL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formData.users" :key="index">
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
                  :vid="`user_${index}`"
                  name="Usuario"
                  rules="required"
                >
                  <v-select
                    v-model="item.user_id"
                    label="fullname"
                    :clearable="false"
                    :reduce="record => record.id"
                    :options="users"
                    :selectable="option => !selectedUsers.includes(option.id)"
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
                </validation-provider>
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
                    :options="getRoles(item.user_id, index)"
                    :reduce="record => record.id"
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
                </validation-provider>
              </td>
            </tr>
            <tr v-if="formData.users.length === 0">
              <td colspan="3">
                <p class="text-center my-5">
                  El consultorio aun no tiene Personal registrado.
                  <a href="#" @click.prevent="addItem">Agregar Personal.</a>
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
import { inject, ref } from '@vue/composition-api'
import { UserResource } from '@/network/lib/users'

export default {
  name: 'MedicalUnitUsersList',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      users: [],
    }
  },
  setup() {
    const formData = inject('formData')

    const addItem = () => {
      formData.value.users.push({
        id: (Math.random() * 1000).toFixed(),
        ...{
          user_id: null,
          role_id: null,
        },
      })
    }

    const removeItem = index => {
      formData.value.users.splice(index, 1)
    }

    return {
      formData,
      addItem,
      removeItem,
    }
  },
  computed: {
    selectedUsers() {
      return this.formData.users.map(user => user.user_id)
    },
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const { data } = await UserResource.getAll({ include: 'roles' })
      this.users = data.rows
    },
    getRoles(userId, index) {
      const user = this.users.find(item => item.id === userId)

      if (user) {
        this.formData.users[index].role_id = user.roles[0].id
        return user.roles
      }
      return []
    },
  },
}
</script>

<style scoped></style>
