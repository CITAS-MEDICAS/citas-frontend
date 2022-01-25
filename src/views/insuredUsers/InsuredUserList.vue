<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary" :to="{ name: 'insured-create' }"> Crear Asegurado</b-button>
      </template>
    </table-header>

    <b-table
      ref="refTable"
      :items="fetchItems"
      :fields="tableColumns"
      :sort-by.sync="sortBy"
      :sort-desc.sync="isSortDirDesc"
      show-empty
      empty-text="No se encontraron resultados"
      responsive
      primary-key="id"
      class="position-relative"
    >
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <b-button
            v-b-tooltip.hover.top="'Editar Asegurado'"
            variant="flat-success"
            class="btn-icon rounded-circle"
            :to="{
              name: 'insured-edit',
              params: { id: data.item.id },
            }"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            v-b-tooltip.hover.top="'Eliminar Asegurado'"
            variant="flat-danger"
            class="btn-icon rounded-circle"
            @click="handleDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </div>
      </template>

      <template #cell(name)="data">
        <b-link
          :to="{ name: 'insured-edit', params: { id: data.item.id } }"
          class="font-weight-bold"
        >
          {{ data.value }}
        </b-link>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { InsuredResource } from '@/network/lib/insured'

export default {
  name: 'InsuredUserList',
  components: {
    TableHeader,
    TablePagination,
  },
  setup() {
    let {
      refTable,
      perPage,
      perPageOptions,
      currentPage,
      totalRows,
      searchQuery,
      sortBy,
      isSortDirDesc,
      deleteResource,
      refetchData,
    } = useList()

    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      const { data } = await InsuredResource.getAll({
        q: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
      })

      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'id', label: '#', width: '10px', sortable: true, thStyle: { width: '50px' } },
      { key: 'name', label: 'Centro de Salud', sortable: true },
      { key: 'institution_code', label: 'Código de Establecimiento', sortable: true },
      { key: 'institution_network', label: 'Red de Salud', sortable: true },
    ]

    return {
      refTable,
      perPage,
      perPageOptions,
      currentPage,
      totalRows,
      searchQuery,
      tableColumns,
      sortBy,
      isSortDirDesc,
      fetchItems,
      deleteResource,
      refetchData,
    }
  },

  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, InsuredResource)
      if (isDeleted) {
        this.refetchData()
      }
    },
  },
}
</script>

<style scoped></style>
