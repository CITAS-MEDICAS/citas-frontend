<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <v-select
          style="width: 150px"
          :clearable="false"
          :options="['Atendidos', 'Reservados']" placeholder="Mostrar"
        />

        <router-link v-if="$can('create', PERMISSION_RECONSULT_APPOINTMENTS)  && $route.query.cita" :to="{
          name: 'appointment-reconsult-form',
          params: {treatmentId: $route.params.treatmentId},
          query: { cita: $route.query.cita }
        }">
          <b-button class="ml-1" variant="outline-success">Reconsulta</b-button>
        </router-link>

        <router-link v-if="$can('create', PERMISSION_TRANSFER_APPOINTMENTS)  && $route.query.cita" :to="{
          name: 'appointment-transfer-form',
          params: {treatmentId: $route.params.treatmentId },
          query: { cita: $route.query.cita }
        }">
          <b-button class="ml-1" variant="outline-warning">Transferencia</b-button>
        </router-link>
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
        <b-button
          v-if="$can('create', PERMISSION_ATTEND_APPOINTMENTS) && resolveShowAttendButton(data.item)"
          class="ml-1" variant="outline-info" size="sm"
          @click="showForm(data.item.id)"
        >
          Atender
        </b-button>
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

    <AttendAppointmentForm ref="appointmentForm" @update-list="refetchData" />
  </b-card>
</template>

<script>
import {
  PERMISSION_ATTEND_APPOINTMENTS,
  PERMISSION_RECONSULT_APPOINTMENTS,
  PERMISSION_TRANSFER_APPOINTMENTS
} from '@/permissions'

import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import AttendAppointmentForm from './components/AttendAppointmentForm'
import { AppointmentResource } from '@/network/lib/appointment'
import { getDate, getTime, formatDate } from '@/custom/filters'

export default {
  name: 'InsuredTreatmentList',
  components: {
    TableHeader,
    TablePagination,
    AttendAppointmentForm
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
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient',
        scope: `treatment:${route.value.params.treatmentId},search:${searchQuery.value}`,
        getAll: '1'
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
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
      { key: 'date_reservation', label: 'Reservado', sortable: false },
      { key: 'date', label: 'Fecha Cita', sortable: true },
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
      refetchData,
      PERMISSION_ATTEND_APPOINTMENTS,
      PERMISSION_RECONSULT_APPOINTMENTS,
      PERMISSION_TRANSFER_APPOINTMENTS
    }
  },
  methods: {
    showForm(appointmentId) {
      this.$refs.appointmentForm.setAppointment(appointmentId)
      this.$bvModal.show('attend-appointment-form')
    },
    resolveShowAttendButton(item) {
      return item.id == this.$route.query.cita && item.status.name != 'CANCELADO'
    }
  }
}
</script>

<style scoped></style>
