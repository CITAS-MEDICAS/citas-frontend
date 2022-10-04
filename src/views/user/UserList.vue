<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button variant="primary" :to="{ name: 'user-create' }"> Crear Usuario</b-button>
      </template>
    </table-header>

    <b-table
      ref="refTable"
      :items="fetchItems"
      :fields="tableColumns"
      :sort-by.sync="sortBy"
      :sort-desc.sync="isSortDirDesc"
      :busy="isBusy"
      show-empty
      empty-text="No se encontraron resultados"
      responsive
      primary-key="id"
      class="position-relative"
    >
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <router-link
            :to="{
              name: 'user-edit',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Editar Personal'"
              variant="flat-success"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
          </router-link>

          <b-button
            v-b-tooltip.hover.top="'Eliminar Personal'"
            variant="flat-danger"
            class="btn-icon rounded-circle"
            @click="handleDelete(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </div>
      </template>

      <template #cell(name)="data">
        <b-link :to="{ name: 'user-edit', params: { id: data.item.id } }" class="font-weight-bold">
          {{ data.value }}
        </b-link>
      </template>
      <template #cell(roles)="data">
        <RoleVariant v-for="role in data.item.roles" :key="role.id" :role="role" />
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle mr-2" />
          <strong>Cargando...</strong>
        </div>
      </template>
    </b-table>

    <table-pagination :total-rows="totalRows" :per-page="perPage" />
  </b-card>
</template>

<script>
import useList from '@/custom/libs/useList'

import TableHeader from '@/custom/components/Tables/TableHeader'
import TablePagination from '@/custom/components/Tables/TablePagination'
import { UserResource } from '@/network/lib/users'
import RoleVariant from '@/custom/components/RoleVariant'

export default {
  name: 'UserList',
  components: {
    TableHeader,
    TablePagination,
    RoleVariant,
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
      isBusy,
      deleteResource,
      refetchData,
    } = useList()

    const fetchItems = async () => {
      isBusy.value = true
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')

      let sortBy = 'updated_at'

      const { data } = await UserResource.getAll({
        scope: `search:${searchQuery.value},onlyStaffRoles`,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy,
        include: 'roles',
      })

      isBusy.value = false
      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'ci', label: 'CI', sortable: true },
      { key: 'name', label: 'Nombre', sortable: true },
      { key: 'paternal_surname', label: 'Ap. Paterno', sortable: true },
      { key: 'maternal_surname', label: 'Ap. Materno', sortable: true },
      { key: 'email', label: 'correo', sortable: true },
      { key: 'phone_number', label: 'Telefono', sortable: true },
      { key: 'roles', label: 'Roles', sortable: false },
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
      isBusy,
      fetchItems,
      deleteResource,
      refetchData,
    }
  },
  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, UserResource)
      if (isDeleted) {
        this.refetchData()
      }
    },
  },
}
</script>
