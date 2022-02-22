<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary" :to="{ name: 'medical-unit-create' }">
          Crear Consultorio
        </b-button>
      </template>
    </table-header>

    <b-table
      ref="refTable"
      :items="fetchItems"
      :fields="tableColumns"
      :sort-by.sync="sortBy"
      :sort-desc.sync="isSortDirDesc"
      :busy="isBusy"
      show-empty
      empty-text="No se encontraron resultados"
      responsive
      primary-key="id"
      class="position-relative"
    >
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <router-link
            :to="{
              name: 'medical-unit-edit',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Editar Consultorio'"
              variant="flat-success"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
          </router-link>
          <b-button
            v-b-tooltip.hover.top="'Eliminar Consultorio'"
            variant="flat-danger"
            class="btn-icon rounded-circle"
            @click="handleDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
          <router-link
            :to="{
              name: 'medical-unit-calendar',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Calendario'"
              variant="flat-warning"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="CalendarIcon" />
            </b-button>
          </router-link>
        </div>
      </template>

      <template #cell(name)="data">
        <b-link
          :to="{ name: 'medical-unit-edit', params: { id: data.item.id } }"
          class="font-weight-bold"
        >
          {{ data.value }}
        </b-link>
      </template>
      <template #cell(is_enabled)="data">
        <b-avatar v-if="data.value" size="32" variant="light-success">
          <feather-icon icon="CheckCircleIcon" />
        </b-avatar>
        <b-avatar v-else size="32" variant="light-secondary">
          <feather-icon icon="AlertCircleIcon" />
        </b-avatar>
      </template>
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle mr-2" />
          <strong>Cargando...</strong>
        </div>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'

export default {
  components: {
    TableHeader,
    TablePagination
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
      isBusy,
      deleteResource,
      refetchData
    } = useList()

    const fetchItems = async () => {
      // TODO: Calendar Icon Color -> Unit has scheduled dates

      isBusy.value = true
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      const { data } = await MedicalUnitResource.getAll({
        q: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;specialty;type;serviceHour'
      })

      isBusy.value = false
      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'id', label: '#', width: '10px', sortable: true, thStyle: { width: '50px' } },
      { key: 'name', label: 'Consultorio', sortable: true },
      { key: 'code', label: 'Código', sortable: true },
      { key: 'is_enabled', label: 'Habilitado', sortable: true },
      { key: 'center', label: 'Centro', sortable: false },
      { key: 'specialty', label: 'Especialidad', sortable: false },
      { key: 'type', label: 'Tipo Consultorio', sortable: false }
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
      isBusy,
      fetchItems,
      deleteResource,
      refetchData
    }
  },
  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, MedicalUnitResource)
      if (isDeleted) {
        this.refetchData()
      }
    }
  }
}
</script>
