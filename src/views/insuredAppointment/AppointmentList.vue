<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary"
                  :to="{ name: 'insured-appointment-create', params: { id: $route.params.id } }">Crear
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
        <b-button v-if="resolveShowCancelButton(data.item)" size="32" variant="flat-danger"
                  @click="handleCancel(data.item.id)">
          <feather-icon icon="XCircleIcon" />
          Cancelar
        </b-button>
      </template>

      <template #cell(date_reservation)="data">
        {{ data.value | getDate }}
      </template>
      <template #cell(date)="data">
        {{ data.item.start_time | getDate }}
      </template>
      <template #cell(time)="data">
        {{ data.item.start_time | getTime }}
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
import { getDate, getTime } from '@/custom/filters'
import { app } from '@/main'

export default {
  name: 'AppointmentList',
  components: {
    TableHeader,
    TablePagination
  },
  filters: {
    getDate, getTime
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
      refetchData,
      app
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
      { key: 'actions', label: 'Acciones', thStyle: { width: '190px' } },
      { key: 'id', label: '#', width: '10px', sortable: true, thStyle: { width: '10px' } },
      { key: 'specialty.name', label: 'Especialidad', sortable: false },
      { key: 'center.name', label: 'Centro', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'date_reservation', label: 'Reservado', sortable: false },
      { key: 'date', label: 'Fecha Cita', sortable: false },
      { key: 'time', label: 'Hora Cita', sortable: false },
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
      refetchData,
      app
    }
  },

  methods: {
    async handleCancel(id) {
      const result = await app.$swal({
        title: '¿Realmente desea cancelar la Reserva?',
        text: 'No se pordrá revertir este cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Cancelar!',
        cancelButtonText: 'Cerrar',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-outline-dark ml-1'
        },
        buttonsStyling: false
      })

      if (!result.isConfirmed) return false

      const { data } = await AppointmentResource.cancelAppointment(id)

      if (data.appointment) {
        app.$swal({
          icon: 'success',
          title: '¡Reserva Cancelada!',
          text: 'La operación se realizo exitosamente.',
          timer: 1500,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        this.refetchData()
      } else {
        app.$swal({
          icon: 'warning',
          title: '¡Error!',
          text: 'Ocurrio un error en el proceso. Intenta nuevamente',
          timer: 1500,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    },
    resolveShowCancelButton(data) {
      if (['RESERVADO', 'SOLICITADO'].includes(data.status.name)) return true

      return false
    }
  }
}
</script>

<style scoped></style>
