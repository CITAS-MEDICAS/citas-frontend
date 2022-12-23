<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <v-select v-model="status"
                  style="width: 200px"
                  :clearable="false"
                  :options="['TODOS...','RESERVADO','SOLICITADO','NO SE PRESENTO','CANCELADO','ATENDIDO']" placeholder="TODOS"
                  @input="refetchData"
        />
        <b-button
          v-if="selectedAppointments.length"
          v-b-modal.transfer-appointment-form
          variant="outline-info"
          class="ml-1"
        >
          Transferir Citas
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
      <template #head(actions)="">
        <b-form-checkbox
          v-model="selectAll"
          style="display: inline-block"
          class="mr-1"
        />
        ACCIONES
      </template>
      <template #cell(actions)="data">
        <ActionButtons :item="data.item">
          <template #control>
            <b-form-checkbox
              v-model="selectedAppointments"
              :value="data.item"
              style="display: inline-block"
              class="mr-1"
            />
          </template>
        </ActionButtons>
      </template>

      <template #cell(date_reservation)="data">
        {{ data.value| formatDate }}
      </template>

      <template #cell(start_time)="data">
        <strong>{{ data.value| formatDate }}</strong>
      </template>

      <template #cell(updated_at)="data">
        <span v-if="data.item.status.name === 'ATENDIDO'">{{ data.item.updated_at | formatDate }}</span>
      </template>


      <template #cell(status.name)="data">
        <b-badge pill :variant="`light-${statusVariant[data.value]}`">
          <small>{{ data.value.toLowerCase() }}</small>
        </b-badge>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
    <TransferAppointmentForm />
  </b-card>
</template>

<script>
import { ref, computed, provide } from '@vue/composition-api'
import useList from '@/custom/libs/useList'
import { AppointmentResource } from '@/network/lib/appointment'
import { getDate, getTime, formatDate } from '@/custom/filters'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import ActionButtons from './ActionButtons'
import TransferAppointmentForm from './transfer-appointment-form/TransferAppointmentForm'

export default {
  name: 'PersonalAppointmentList',
  components: {
    TableHeader,
    TablePagination,
    ActionButtons,
    TransferAppointmentForm
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
    const selectedAppointments = ref([])

    provide('selectedAppointments', selectedAppointments)

    const fetchItems = async () => {
      if (status.value === 'TODOS...') {
        status.value = ''
      }
      // console.log('fetchItems staty : ' + staty)
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const { data } = await AppointmentResource.getAll({
        scope: `search:${searchQuery.value},status:${status.value}`,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient'
      })
      totalRows.value = data.total_data
      return data.rows
    }

    const statusVariant = {
      'RESERVADO': 'success',
      'SOLICITADO': 'warning',
      'NO SE PRESENTO': 'secondary',
      'CANCELADO': 'danger',
      'ATENDIDO': 'info',
      'REPROGRAMADO' : 'secondary'
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '150px' } },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
      { key: 'treatment.patient.ci', label: 'Carnet', sortable: false },
      { key: 'treatment.patient.registration_code', label: 'Matricula', sortable: false },
      { key: 'date_reservation', label: 'Fecha de Solicitud', sortable: false },
      { key: 'start_time', label: 'Fecha Cita Medica', sortable: false },
      { key: 'updated_at', label: 'Fecha Atención', sortable: false },
      // { key: 'date', label: 'Fecha Atención', sortable: false },
      { key: 'status.name', label: 'Estado', sortable: false }
    ]

    const selectAll = computed({
      get: () => selectedAppointments.value.length === refTable.value?.localItems.length,
      set: val => {
        if (val) {
          selectedAppointments.value = refTable.value.localItems
        } else if (selectedAppointments.value.length === refTable.value.localItems.length) {
          selectedAppointments.value = []
        }
      }
    })

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
      selectedAppointments,
      selectAll,
      status,
      fetchItems,
      deleteResource,
      refetchData
    }
  },
  methods: {}
}
</script>

<style scoped></style>
