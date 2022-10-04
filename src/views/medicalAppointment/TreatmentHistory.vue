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
        <router-link v-if="$can('create', PERMISSION_RECONSULT_APPOINTMENTS)  && $route.query.cita" :to="{
          name: 'appointment-reprogram-form',
          params: {treatmentId: $route.params.treatmentId},
          query: { cita: $route.query.cita }
        }">
          <b-button class="ml-1" variant="outline-secondary">Reprogramar</b-button>
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
          v-b-tooltip.hover.top="'Atender al Asegurado'"
          @click="showForm(data.item.id)"
          variant="success"
        >
          Atender
        </b-button>

      </template>

      <template #cell(medic.fullname)="data">
        {{ data.value.toUpperCase() }}
      </template>

      <template #cell(date_reservation)="data">
        {{ data.value| formatDate }}
      </template>

      <template #cell(start_time)="data">
        <strong>{{ data.value| formatDate }}</strong>
      </template>

      <template #cell(updated_at)="data">
        <span v-if="data.item.status.name === 'ATENDIDO' || data.item.status.name === 'CANCELADO' || data.item.status.name === 'NO SE PRESENTO' ">{{ data.item.updated_at | formatDate }}</span>
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
import {AppointmentResource} from '@/network/lib/appointment'
import {formatDate, getDate, getTime} from '@/custom/filters'

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
        include: 'center;unit;specialty;status;medic;treatment.patient',
        scope: `treatment:${route.value.params.treatmentId},search:${searchQuery.value}`,
        getAll: '1'
      })
      totalRows.value = data.total_data
      console.log(data)
      return data.rows
    }

    const statusVariant = {
      'RESERVADO': 'warning',
      'SOLICITADO': 'warning',
      'NO SE PRESENTO': 'danger',
      'CANCELADO': 'danger',
      'ATENDIDO': 'success',
      'REPROGRAMADO': 'secondary',
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '50px' } },
      { key: 'status.name', label: 'Estado', sortable: false },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
      { key: 'date_reservation', label: 'Fecha de Solicitud', sortable: false },
      { key: 'start_time', label: 'Fecha Cita Medica', sortable: false },
      { key: 'diagnostic', label: 'Diagnostico', sortable: false },
      { key: 'comment', label: 'Comentario', sortable: false },
      { key: 'updated_at', label: 'Fecha Atención', sortable: false },
      { key: 'medic.fullname', label: 'Medico', sortable: false ,thStyle: { width: '150px' } }
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
      let dataPermission = JSON.parse(localStorage.getItem('userRole'))
      console.log(item.start_time)
      console.log(this.resolveDifDate(item.start_time))
      if (dataPermission["role"] === "medico"){
        console.log("es rol Medico")
        console.log(this.resolveDifDate(item.start_time))
        if ((this.resolveDifDate(item.start_time)>=-0.5) && (this.resolveDifDate(item.start_time)<=0.5)) {
          return parseInt(item.id) === parseInt(this.$route.query.cita) && item.status.name === 'RESERVADO'
        }
      } else {
        console.log("no medic")
        return parseInt(item.id) === parseInt(this.$route.query.cita) && item.status.name === 'RESERVADO'
      }

    },
    resolveDifDate(startTime){
      let date1 = new Date(Date.now())
      let date2 = new Date(startTime)
      let difNumeric = date2.getTime() - date1.getTime()
      return difNumeric / (1000 * 3600 * 24)
    }

  }
}
</script>

<style scoped></style>
