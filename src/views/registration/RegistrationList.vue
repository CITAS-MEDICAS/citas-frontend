<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary" :to="{ name: 'registration-create' }"> Crear Registro</b-button>
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
        <div class="text-nowrap">
          <b-button
            v-b-tooltip.hover.top="'Editar Registro'"
            variant="flat-success"
            class="btn-icon rounded-circle"
            :to="{
              name: 'registro-edit',
              params: { id: data.item.id },
            }"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            v-b-tooltip.hover.top="'Eliminar Registro'"
            variant="flat-danger"
            class="btn-icon rounded-circle"
            @click="handleDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
          <b-button
            v-if="data.item.is_verified"
            v-b-tooltip.hover.top="'Enviar credenciales'"
            variant="flat-info"
            class="btn-icon rounded-circle"
            @click="handleVerificationEmail(data.item.id)"
          >
            <b-spinner v-if="showSpinner" small />
            <feather-icon v-else icon="MailIcon" />
          </b-button>
        </div>
      </template>

      <template #cell(name)="data">
        <b-link
          :to="{ name: 'registration-edit', params: { id: data.item.id } }"
          class="font-weight-bold"
        >
          {{ data.value }}
        </b-link>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'
import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { RegistrationResource } from '@/network/lib/registration'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
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
      showSpinner,
      deleteResource,
      refetchData
    } = useList()
    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const { data } = await RegistrationResource.getAll({
        q: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value
      })
      totalRows.value = data.total_data
      return data.rows
    }
    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'id', label: '#', width: '10px', sortable: true, thStyle: { width: '50px' } },
      { key: 'ci', label: 'Carnet', sortable: true },
      { key: 'code_affiliate', label: 'Matricula', sortable: true },
      { key: 'name', label: 'Nombre', sortable: true },
      { key: 'paternal_surname', label: 'Paterno', sortable: true },
      { key: 'maternal_surname', label: 'Materno', sortable: true },
      { key: 'gender', label: 'Género', sortable: true },
      { key: 'employer_code', label: 'Patronal', sortable: true },
      { key: 'employer_name', label: 'Empleador', sortable: true }
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
      showSpinner,
      fetchItems,
      deleteResource,
      refetchData
    }
  },
  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, RegistrationResource)
      if (isDeleted) {
        this.refetchData()
      }
    },
    async handleVerificationEmail(resourceId) {
      this.showSpinner = true
      const { data } = await RegistrationResource.verificationMail(resourceId)
      if (data.status == 'success') {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `¡Credenciales enviadas!`,
            icon: 'MailIcon',
            variant: 'success'
          }
        })
      }

      this.showSpinner = false
    }
  }
}
</script>
