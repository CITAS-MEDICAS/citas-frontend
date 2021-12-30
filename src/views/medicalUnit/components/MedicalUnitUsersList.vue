<template>
  <div>
    <h3 class="my-2">Usuarios Consultorio</h3>
    <b-row>
      <b-col xl="9" md="8">
        <b-card no-body>
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
                <b-button
                  v-b-tooltip.hover.top="'Editar Consultorio'"
                  variant="flat-success"
                  class="btn-icon rounded-circle"
                  :to="{
                    name: 'medical-unit-edit',
                    params: { id: data.item.id },
                  }"
                >
                  <feather-icon icon="EditIcon" />
                </b-button>
                <b-button
                  v-b-tooltip.hover.top="'Eliminar Consultorio'"
                  variant="flat-danger"
                  class="btn-icon rounded-circle"
                  @click="handleDelete(data.item.id)"
                >
                  <feather-icon icon="TrashIcon" />
                </b-button>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col xl="3" md="4">
        <b-card no-body>
          <b-button variant="primary" block @click="handleSubmit()">
            Agregar Usuario al Consultorio
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import useList from '@/custom/libs/useList'
import { MedicalUnitResource } from '@/network/lib/medicalUnit'

export default {
  name: 'MedicalUnitUsersList',
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

      const { data } = await MedicalUnitResource.getAll({
        q: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy.value,
        include: 'center;specialty;type;serviceHour',
      })

      isBusy.value = false
      totalRows.value = data.total_data
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      { key: 'user', label: 'Usuario', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Rol', sortable: false },
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
}
</script>

<style scoped></style>
