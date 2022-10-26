<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4" class="mb-1">
              <b-row>
                <b-col cols="4">
                  <v-select
                    v-model="perPage"
                    :options="perPageOptions"
                    class="per-page-selector"
                    :clearable="false"
                  />
                </b-col>
                <b-col cols="5">
                  <v-select v-model="status"
                            v-b-popover.hover.left="'Reservado con Fecha Cita Médica |  Solicitado con Fecha de Solicitud  |  Atendido, Cancelado y No-se-presento con Fecha Atención | Todos, funciona con Buscar genérico'"
                            title="El estado se vincula con las fechas"
                            variant="outline-primary"
                            :clearable="false"
                            :options="['TODOS...','RESERVADO','SOLICITADO','NO SE PRESENTO','CANCELADO','ATENDIDO']"
                            placeholder="TODOS"
                            @input="refetchData"
                  />
                </b-col>
                <b-col cols="1">
                  <!--        PRINT IMPRIMIR LISTA PDF-->
                  <b-button variant="primary" class="btn-icon ml-1" @click="downloadPdf">
                    <feather-icon icon="PrinterIcon" />
                  </b-button>
                </b-col>

                <b-col cols="1">
                  <JsonExcel
                  :fetch=fetchXls
                  name="Listado.xls"
                  >
                    <b-button variant="primary" class="btn-icon ml-1">
                      <feather-icon icon="DownloadIcon" />
                    </b-button>
                  </JsonExcel>
                </b-col>

              </b-row>
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
      responsive
      empty-text="No se encontraron resultados"
      primary-key="id"
      class="position-relative"
    >
      <template #cell(show_details)="row">
        <b-form-checkbox
          v-model="row.detailsShowing"
          plain
          class="vs-checkbox-con"
          @change="row.toggleDetails"
        >
          <span class="vs-checkbox">
            <span class="vs-checkbox--check">
              <i class="vs-icon feather icon-check" />
            </span>
          </span>
          <span class="vs-label">{{ row.detailsShowing ? 'Oculta' : 'Ver' }}</span>
        </b-form-checkbox>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Fecha Nacimiento : </strong>{{ row.item.treatment.patient.birth_date | getDate }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Email : </strong>{{ row.item.treatment.patient.email }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Género : </strong>{{ row.item.treatment.patient.gender }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Telefono : </strong>{{ row.item.treatment.patient.phone_number }} - {{ row.item.treatment.patient.insured[0].reference_phone_number }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Zona y Dirección : </strong>{{ row.item.treatment.patient.insured[0].region }} - {{ row.item.treatment.patient.insured[0].address_zone }} - {{ row.item.treatment.patient.insured[0].address }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>Empleador : </strong>{{ row.item.treatment.patient.insured[0].employer_code }} - {{ row.item.treatment.patient.insured[0].employer_name }}
            </b-col>
            <b-col
              md="4"
              class="mb-1"
            >
              <strong>último usuario que atendio : </strong>{{ row.item.medic.fullname }}
            </b-col>
          </b-row>
          <b-button
            size="sm"
            variant="outline-secondary"
            @click="row.toggleDetails"
          >
            Hide Details
          </b-button>
        </b-card>
      </template>

      <template #head(actions)="">
        ACCIONES
      </template>

      <template #cell(actions)="data">
        <ActionButtons :item="data.item">>
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
import JsonExcel from "vue-json-excel"

const today = dateISO(new Date())
const now = new Date()

export default {
  name: 'AdminAppointmentList',
  components: {
    TablePagination,
    ActionButtons,
    TransferAppointmentForm,
    flatPickr,
    JsonExcel
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

    let datax = []

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
    const fetchXls = async () => {
      let data = await fetchItems()
      if (data) {
        return Array.from(data, function (item) {
          return {
            Especialidad: String(item['specialty']['name']),
            Centro: String(item['center']['name']),
            Consultorio: String(item['unit']['name']),
            Asegurado: String(item['treatment']['patient']['fullname']),
            Carnet: String(item['treatment']['patient']['ci']),
            fecha_solicitud: String(item['date_reservation']),
            fecha_cita_medica: String(item['start_time']),
            fecha_Atencion:  String(item['status']['name']) === 'ATENDIDO' ? String(item['updated_at']) : '',
            estado: String(item['status']['name']),
            motivo: String(item['treatment']['comment']),
            calendario: String(item['calendar']['attention_type']['name']),
          }
        })
      }
    }

    const fetchItems = async () => {

      if (status.value === 'TODOS...') {
        status.value = ''
      }

      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Asc' : 'Desc')
      let scope = [
        `search:${searchQuery.value}`,
        `status:${status.value}`,
      ]

      if (startDate.value && endDate.value) {
        scope = [
          `search:${searchQuery.value}`,
          `status:${status.value}`,
          `reservationDate:${status.value}|${startDate.value}|${endDate.value}`
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
        include: 'center;unit;specialty;status;treatment.patient.insured;calendar.attentionType;medic'
      }
      const { data } = await AppointmentResource.getAll(query)
      totalRows.value = data.total_data
      console.log('listadoxxxx')
      console.log(data)
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
      { key: 'show_details', label: 'Ver', thStyle: { width: '10px' }},
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'treatment.patient.fullname', label: 'Asegurado', sortable: false },
      { key: 'treatment.patient.ci', label: 'Carnet', sortable: false },
      { key: 'date_reservation', label: 'Fecha de Solicitud', sortable: false },
      { key: 'start_time', label: 'Fecha Cita Medica', sortable: false },
      { key: 'updated_at', label: 'Fecha Atención', sortable: false },
      // { key: 'date', label: 'Fecha Atención', sortable: false },
      { key: 'status.name', label: 'Estado', sortable: false },
      { key: 'treatment.comment', label: 'Motivo Consulta', sortable: false },
      { key: 'calendar.attention_type.name', label: 'Tipo Consulta', sortable: false },
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

      if (status.value !== 'RESERVADO') {
        alert('El Listado es para el estado : RESERVADO')
        return
      }
      if (status.value === 'TODOS...') {
        status.value = ''
      }

      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Asc' : 'Desc')
      let scope = [
        `search:${searchQuery.value}`,
        `status:${status.value}`,
      ]

      if (startDate.value && endDate.value) {
        scope = [
          `search:${searchQuery.value}`,
          `status:${status.value}`,
          `reservationDate:${status.value}|${startDate.value}|${endDate.value}`
        ]
      }

      if (medicalUnit.value) {
        scope.push(`hasUnit:${medicalUnit.value}`)
      }

      const query = {
        scope: scope.join(','),
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient.insured;calendar.attentionType'
      }

      const response = await AppointmentResource.download({
        scope: scope.join(','),
        limit: perPage.value,
        [sortOption]: sortBy.value,
        include: 'center;unit;specialty;status;treatment.patient.insured;calendar.attentionType'
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
      fetchXls,
    }
  },
  methods: {
    startDownload(){
      console.log('show loading')
      // console.log(datax)

    },
  }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style scoped></style>
