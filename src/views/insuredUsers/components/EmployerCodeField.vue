<template>
  <v-select
    v-model="formData.employer_code"
    label="code"
    :filterable="false"
    :options="employers"
    :reduce="item => item.code"
    placeholder="ej. 11-222-1234567"
    @search="onSearchEmployer"
    @input="handleSelectEmployer"
  >
    <template slot="no-options">No se encontraron resultados...</template>
    <template slot="option" slot-scope="option">
      {{ option.name }}
    </template>
    <template slot="selected-option" slot-scope="option">
      <code>{{ option.code }}</code>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'EmployerCodeField'
}
</script>

<style scoped>

</style>