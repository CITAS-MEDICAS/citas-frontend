<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button v-if="$can('create', PERMISSION_MEDICAL_CENTER)" variant="primary"
                  :to="{ name: 'medical-center-create' }"> Crear Centro
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
        <div class="text-nowrap">
          <router-link
            v-if="$can('update', PERMISSION_MEDICAL_CENTER)"
            :to="{
              name: 'medical-center-edit',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Editar Centro'"
              variant="flat-success"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
          </router-link>

          <b-button
            v-if="$can('delete', PERMISSION_MEDICAL_CENTER)"
            v-b-tooltip.hover.top="'Eliminar Centro'"
            variant="flat-danger"
            class="btn-icon rounded-circle"
            @click="handleDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </div>
      </template>

      <template #cell(name)="data">
        <b-link v-if="$can('update', PERMISSION_MEDICAL_CENTER)"
                :to="{ name: 'medical-center-edit', params: { id: data.item.id } }"
                class="font-weight-bold"
        >
          {{ data.value }}
        </b-link>
        <template v-else>
          {{ data.value }}
        </template>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'
import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { MedicalCenterResource } from '@/network/lib/medicalCenter'
import { PERMISSION_MEDICAL_CENTER } from '@/permissions'

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
      deleteResource,
      refetchData
    } = useList()

    const fetchItems = async () => {
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      const { data } = await MedicalCenterResource.getAll({
        scope: `search:${searchQuery.value}`,
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
      { key: 'name', label: 'Centro de Salud', sortable: true },
      { key: 'institution_code', label: 'Código de Establecimiento', sortable: true },
      { key: 'institution_network', label: 'Red de Salud', sortable: true }
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
      PERMISSION_MEDICAL_CENTER
    }
  },
  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, MedicalCenterResource)
      if (isDeleted) {
        this.refetchData()
      }
    }
  }
}
</script>
