<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button v-if="$can('create', PERMISSION_DEPENDENT_USERS)" variant="primary" :to="{ name: 'dependent-create' }">Crear Dependiente</b-button>
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
          <router-link :to="{
            name: 'insured-appointment-list',
            params: { userId: data.item.user_id}
          }">
            <b-button
              v-b-tooltip.hover.top="'Citas Medicas'"
              variant="flat-warning"
              class="btn-icon "
            >
              <feather-icon icon="CalendarIcon" />
              <small> Citas Médicas </small>
            </b-button>
          </router-link>
        </div>
      </template>

      <template #cell(relationship)="data">
        {{ data.item.key }}
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'
import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { InsuredResource } from '@/network/lib/insured'
import { PERMISSION_DEPENDENT_USERS } from '@/permissions'

export default {
  name: 'DependentList',
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
      deleteResource,
      refetchData
    } = useList()

    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      const { data } = await InsuredResource.getAll({
        scope: `search:${searchQuery.value}`,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'user;unit.center;relationship'
      })

      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'user_id', label: '#', width: '10px', sortable: true, thStyle: { width: '50px' } },
      { key: 'user.name', label: 'Nombre', sortable: false },
      { key: 'user.paternal_surname', label: 'Paterno', sortable: false },
      { key: 'user.maternal_surname', label: 'Materno', sortable: false },
      { key: 'unit.center.name', label: 'Centro de Salud', sortable: false },
      { key: 'unit.name', label: 'Consultorio', sortable: false },
      { key: 'user.registration_code', label: 'Numero Asegurado', sortable: false },
      { key: 'relationship.name', label: 'Parentesco', sortable: false }
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
      PERMISSION_DEPENDENT_USERS
    }
  },

  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, InsuredResource)
      if (isDeleted) {
        this.refetchData()
      }
    }
  }
}
</script>

<style scoped></style>
