<template>
  <validation-observer ref="refFormObserver">
    <b-row>
      <b-col lg="5">
        <h3>Afiliación</h3>
      </b-col>
      <b-col lg="7">
        <b-row>
          <b-col sm="12">
            <b-form-group label="Parentesco *">
              <validation-provider v-slot="{ errors }" name="Codigo Beneficiario" rules="required">
                <v-select
                  v-model="formData.relationship_type_id"
                  :options="filterRelationships"
                  :reduce="item => item.id"
                  label="name"
                  :clearable="false"
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
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inject, ref } from '@vue/composition-api'

import { required } from '@core/utils/validations/validations'
import { TypesResource } from '@/network/lib/types'
import { UserResource } from '@/network/lib/users'
import { debounce } from '@/libs/utils'

const titularID = 'ID'

// TODO: Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'id')"
export default {
  name: 'DependentMembership',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  directives: {
    uppercase: {
      update: (el) => {
        el.value = el.value.toUpperCase()
      }
    }
  },
  data() {
    return {
      relationships: [],
      titularOptions: []
    }
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
      validate
    }
  },
  computed: {
    filterRelationships() {
      return this.relationships.filter(item => !item.name.includes(titularID))
    }
  },
  watch: {
    'formData.user_titular_id': {
      handler: function(after, before) {
        if (!this.insuredIsTitular && after) {
          this.setTitularOption(after)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getRelationships()
  },
  methods: {
    async getRelationships() {
      const { data } = await TypesResource.getAll({ scope: 'relationship', sortByAsc: 'id' })
      this.relationships = data.rows
    },
    handleInsuredType() {
      this.resolveTitularID()

      this.formData.isNewAccount = null
      this.formData.employer_code = null
      this.formData.employer_name = null
      this.formData.employer_date = null
      this.formData.salary = null
      this.formData.email = null
      this.formData.password = null
      this.formData.password_confirmation = null
      this.formData.isNewAccount = true
    },
    resolveTitularID() {
      this.formData.relationship_type_id = null
      if (this.isTitular()) {
        const relationship = this.relationships.find(item => item.name.includes(titularID))
        this.formData.relationship_type_id = relationship?.id
      }
    },
    isTitular() {
      return this.formData.insuredIsTitular
    },
    onSearchTitular(term, loading) {
      if (term.length > 5) {
        loading(true)
        this.searchTitular(loading, term, this)
      }
    },
    searchTitular: debounce(async (loading, term, vm) => {
      const { data } = await UserResource.getAll({
        'filter[ci][eq]': term,
        scope: 'IsTitular'
      })
      loading(false)
      vm.titularOptions = data.rows
    }, 500),

    async setTitularOption(id) {
      const { data } = await UserResource.getById(id)
      this.titularOptions = [data.user]
    }
  }
}
</script>

<style scoped></style>
