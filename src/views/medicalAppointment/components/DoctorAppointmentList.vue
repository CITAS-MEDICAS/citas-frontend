<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <v-select v-model="status"
                  style="width: 250px"
                  :clearable="true"
                  :options="['TODOS...','RESERVADO','SOLICITADO','NO SE PRESENTO','REPROGRAMADO','CANCELADO','ATENDIDO']" placeholder="TODOS"
                  @input="refetchData"
        />
        <b-form-datepicker
          v-model="starttime"
          label-no-date-selected="Fecha"
          locale="es"
          :show-decade-nav="true"
          :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
          @input="refetchData"
          class="ml-1"
          style="width: 150px"
        />
        <b-button variant="primary" class="btn-icon ml-1" @click="downloadPdf">
          <feather-icon icon="PrinterIcon" />
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
import { ref } from '@vue/composition-api/dist/vue-composition-api'

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
    const status = ref('TODOS...')
    const starttime = ref('')
    const fetchItems = async () => {
      if (status.value === 'TODOS...') {
        status.value = ''
      }
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const { data } = await AppointmentResource.getAll({
        scope: `search:${searchQuery.value},status:${status.value},starttime:${starttime.value}`,
        limit: perPage.value,
        page: currentPage.value,
        ['start_time']: sortBy.value,
        include: 'status;treatment.patient;center;unit'
      })

      totalRows.value = data.total_data
      return data.rows
    }

    const downloadPdf = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const response = await AppointmentResource.download({
        scope: `search:${searchQuery.value},status:${status.value},starttime:${starttime.value}`,
        [sortOption]: sortBy.value,
        include: 'status;treatment.patient;center;unit.specialty;unit.serviceHour;unit.staff.roles;attention',
        date: starttime.value
      })

      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      window.open(url)
    }


    const statusVariant = {
      'RESERVADO': 'success',
      'SOLICITADO': 'warning',
      'NO SE PRESENTO': 'secondary',
      'CANCELADO': 'danger',
      'ATENDIDO': 'info',
      'REPROGRAMADO': 'secondary',
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '150px' } },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
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
      downloadPdf,
      deleteResource,
      refetchData
    }
  }
}
</script>

<style scoped></style>
