<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4" class="mb-1">
              <b-row>
                <b-col cols="5">
                  <v-select
                    v-model="perPage"
                    :options="perPageOptions"
                    class="per-page-selector"
                    :clearable="false"
                  />
                </b-col>
                <b-col cols="7">
                  <v-select v-model="status"
                            :clearable="false"
                            :options="['TODOS...','RESERVADO','SOLICITADO','NO SE PRESENTO','CANCELADO','ATENDIDO']"
                            placeholder="TODOS"
                            @input="refetchData"
                  />
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="4" class="mb-1">
              <b-button
                v-if="selectedAppointments.length"
                v-b-modal.transfer-appointment-form
                variant="outline-info"
              >
                <div>Transferir Citas</div>
              </b-button>
              <!--        PRINT IMPRIMIR LISTA PDF-->
              <b-button variant="primary" class="btn-icon ml-1" @click="downloadPdf">
                <feather-icon icon="PrinterIcon" />
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4" class="mb-1">
              <v-select v-model="medicalUnit"
                        :clearable="true"
                        :options="medicalUnits"
                        label="name"
                        :reduce="item => item.id"
                        placeholder="Consultorio"
                        @input="refetchData"
              >
                <template slot="option" slot-scope="option">
                  {{ option.center }} - {{ option.name }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  {{ option.center }} - {{ option.name }}
                </template>
              </v-select>
            </b-col>
            <b-col cols="12" md="4" class="mb-1">
              <b-row>
                <b-col cols="6">
<!--                  <b-form-input v-model="startDate" type="date" :max="endDate" :clearable="true" @input="refetchData" required />-->
                  <b-form-datepicker
                    v-model="startDate"
                    today-button
                    reset-button
                    close-button
                    label-no-date-selected="Fecha Cita Desde"
                    locale="es"
                    :show-decade-nav="true"
                    :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
                    class="ml-1"
                    @input="refetchData"
                  />
                </b-col>
                <b-col cols="6">
                  <b-form-datepicker
                    v-model="endDate"
                    today-button
                    reset-button
                    close-button
                    label-no-date-selected="Fecha Cita Hasta"
                    locale="es"
                    :show-decade-nav="true"
                    :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
                    class="ml-1"
                    @input="refetchData"
                  />
<!--                  <b-form-input v-model="endDate" type="date" :min="startDate"  @input="refetchData" required />-->
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <div class="d-flex align-items-center justify-content-end">
                <b-form-input v-model="searchQuery" class="d-inline-block" placeholder="Buscar..." />
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

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
        <span v-if="data.item.status.name === 'ATENDIDO' || data.item.status.name === 'CANCELADO' || data.item.status.name === 'NO SE PRESENTO' ">{{ data.item.updated_at | formatDate }}</span>
      </template>

<!--      <strong v-if="data.item.status.name === 'reservado'">{{ data.item.updated_at | formatDate }}</strong>-->

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
import { ref, computed, provide, onMounted } from '@vue/composition-api'
import useList from '@/custom/libs/useList'
import { AppointmentResource } from '@/network/lib/appointment'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'
import { getDate, getTime, formatDate } from '@/custom/filters'

import TablePagination from '@/custom/components/Tables/TablePagination'
import ActionButtons from './ActionButtons'
import TransferAppointmentForm from './transfer-appointment-form/TransferAppointmentForm'
import { dateISO } from '@/libs/utils'
import flatPickr from 'vue-flatpickr-component'

const today = dateISO(new Date())

export default {
  name: 'AdminAppointmentList',
  components: {
    TablePagination,
    ActionButtons,
    TransferAppointmentForm,
    flatPickr
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

    const medicalUnit = ref(null)
    const medicalUnits = ref([])
    const starttime = ref('')
    
    const selectedAppointments = ref([])
    const startDate = ref(today)
    const endDate = ref(today)

    provide('selectedAppointments', selectedAppointments)

    onMounted(async () => {
      const { data } = await MedicalUnitResource.getAll({
        scope: [
          'isEnabled'
        ].join(',')
      })
      medicalUnits.value = data.rows
      console.log('-> data.rows', data.rows)
    })

    const fetchItems = async () => {
      console.log('fetchItems')
      if (status.value === 'TODOS...') {
        status.value = ''
      }
      // const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')


      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Asc' : 'Desc')
      let scope = [
        `search:${searchQuery.value}`,
        `status:${status.value}`,
      ]
      if (startDate.value && endDate.value) {
        let scope = [
          `search:${searchQuery.value}`,
          `status:${status.value}`,
          `reservationDate:${startDate.value}|${endDate.value}`
        ]
      }

      if (medicalUnit.value) {
        scope.push(`hasUnit:${medicalUnit.value}`)
      }
      const query = {
        scope: scope.join(','),
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient'

      }
      const { data } = await AppointmentResource.getAll(query)
      totalRows.value = data.total_data
      return data.rows
    }

    const statusVariant = {
      'RESERVADO': 'success',
      'SOLICITADO': 'warning',
      'NO SE PRESENTO': 'secondary',
      'CANCELADO': 'danger',
      'ATENDIDO': 'info',
      'REPROGRAMADO': 'secondary'
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '150px' } },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
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
    const downloadPdf = async () => {
      console.log('downloadPdf')
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Asc' : 'Desc')
      const scope = [
        `search:${searchQuery.value}`,
        `status:${status.value}`,
        `reservationDate:${startDate.value}|${endDate.value}`
      ]
      if (medicalUnit.value) {
        scope.push(`hasUnit:${medicalUnit.value}`)
      }
      const response = await AppointmentResource.download({
        // scope: `search:${searchQuery.value},status:${status.value}`,
        scope: scope.join(','),
        limit: perPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient'
      })


      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      window.open(url)
    }
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
      medicalUnit,
      medicalUnits,
      startDate,
      endDate,
      fetchItems,
      deleteResource,
      refetchData,
      downloadPdf,
    }
  },
  methods: {}
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style scoped></style>
