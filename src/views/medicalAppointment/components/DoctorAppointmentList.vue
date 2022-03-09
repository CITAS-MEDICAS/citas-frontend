<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <v-select style="width: 150px"
                  :clearable="false"
                  :options="['Atendidos', 'Reservados']" placeholder="Mostrar" />
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
        <ShowHistoryButton :item="data.item" />
      </template>
      <template #cell(date_reservation)="data">
        {{ data.value | getDate }}
      </template>
      <template #cell(date)="data">
        <strong>{{ data.item.start_time | formatDate }}</strong>
      </template>
      <template #cell(status.name)="data">
        <b-badge pill :variant="`light-${statusVariant[data.value]}`">
          <small>{{ data.value.toLowerCase() }}</small>
        </b-badge>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
// TODO: Mostrar edad, motivo consulta

import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { AppointmentResource } from '@/network/lib/appointment'
import { getDate, getTime, formatDate } from '@/custom/filters'
import ShowHistoryButton from './ShowHistoryButton'

export default {
  name: 'DoctorAppointmentList',
  components: {
    TableHeader,
    TablePagination,
    ShowHistoryButton
  },
  filters: {
    getDate,
    getTime,
    formatDate
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
        scope: `search:${searchQuery.value}`,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'status;treatment.patient'
      })

      totalRows.value = data.total_data
      return data.rows
    }

    const statusVariant = {
      'RESERVADO': 'success',
      'SOLICITADO': 'warning',
      'NO SE PRESENTO': 'secondary',
      'CANCELADO': 'danger',
      'ATENDIDO': 'info'
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '150px' } },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
      { key: 'date_reservation', label: 'Reservado', sortable: false },
      { key: 'date', label: 'Fecha Cita', sortable: false },
      { key: 'status.name', label: 'Estado', sortable: false }
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
      statusVariant,
      fetchItems,
      deleteResource,
      refetchData
    }
  }
}
</script>

<style scoped></style>
