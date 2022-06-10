<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <v-select v-model="status"
                  style="width: 200px"
                  :clearable="false"
                  :options="['RESERVADO','SOLICITADO','NO SE PRESENTO','CANCELADO','ATENDIDO']" placeholder="Mostrar"
                  @input="refetchData"
        />
        <b-col cols="6" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
          <b-form-datepicker
            v-model="starttime"
            label-no-date-selected="Fecha"
            locale="es"
            :show-decade-nav="true"
            :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
            @input="refetchData"
          />
        </b-col>
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
import ShowHistoryButton from './ActionButtons'
import {ref} from "@vue/composition-api/dist/vue-composition-api";

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
    const status = ref('RESERVADO')
    const starttime = ref('')
    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const { data } = await AppointmentResource.getAll({
        scope: `search:${searchQuery.value},status:${status.value},starttime:${starttime.value}`,
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
      status,
      starttime,
      fetchItems,
      deleteResource,
      refetchData
    }
  }
}
</script>

<style scoped></style>
