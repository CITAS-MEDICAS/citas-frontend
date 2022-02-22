<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary" :to="{ name: 'insured-appointment-create', params: { id: $route.params.id } }">Crear
          Cita Médica
        </b-button>
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
        <b-avatar size="32" variant="light-danger" @click="alert(1)">
          <feather-icon icon="XCircleIcon" />
        </b-avatar>
      </template>

      <template #cell(date_reservation)="data">
        {{ data.value.split(' ')[0].split('-').reverse().join('/') }}
      </template>
      <template #cell(date)="data">
        {{ data.item.start_time ? data.item.start_time.split(' ')[0].split('-').reverse().join('/') : '' }}
      </template>
      <template #cell(time)="data">
        {{ data.item.start_time ? data.item.start_time.split(' ')[1].slice(0, 5) : '' }}
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { AppointmentResource } from '@/network/lib/appointment'

export default {
  name: 'AppointmentList',
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
      route,
      deleteResource,
      refetchData
    } = useList()

    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      const { data } = await AppointmentResource.getAll({
        q: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        scope: `hasPatient:${route.value.params.id}`,
        include: 'center;unit;specialty;type;status'

      })

      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '50px' } },
      { key: 'id', label: '#', width: '10px', sortable: true, thStyle: { width: '10px' } },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'date_reservation', label: 'Fecha Reserva', sortable: false },
      { key: 'date', label: 'Fecha', sortable: false },
      { key: 'time', label: 'Hora', sortable: false },
      { key: 'status.name', label: 'Estado', sortable: false },
      { key: 'type.name', label: 'Tipo', sortable: false }
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
      refetchData
    }
  },

  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, AppointmentResource)
      if (isDeleted) {
        this.refetchData()
      }
    }
  }
}
</script>

<style scoped></style>
