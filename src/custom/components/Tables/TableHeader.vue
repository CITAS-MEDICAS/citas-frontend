<template>
  <div class="m-2">
    <b-row>
      <b-col cols="12" md="8" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
        <label>Entradas</label>
        <v-select
          v-model="perPage"
          :options="perPageOptions"
          class="per-page-selector d-inline-block ml-50 mr-1"
          :clearable="false"
        />
        <slot name="button" />
      </b-col>
      <b-col cols="12" md="4">
        <slot name="search-bar">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input v-model="searchQuery" class="d-inline-block" placeholder="Buscar..." />
          </div>
        </slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'

export default {
  name: 'TableHeader',
  components: {
    vSelect
  },
  props: { perPageOptions: { required: true, type: Array } },
  setup() {
    return {
      perPage: inject('perPage'),
      searchQuery: inject('searchQuery')
    }
  }
}
</script>

<style scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
