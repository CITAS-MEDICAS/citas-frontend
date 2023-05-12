<template>
  <b-card no-body>
    <table-header :per-page-options="perPageOptions">
      <template #button>
        <b-button
          v-if="$can('create', PERMISSION_INSURED_USERS)"
          class="ml-1" variant="primary" :to="{ name: 'insured-create' }">
          Crear Asegurado
        </b-button>
        <b-button
          v-if="$can('update', PERMISSION_INSURED_USERS)"
          class="ml-1" variant="primary" :to="{ name: 'insured-enabled' }">
          Alta de Asegurado
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
            :to="{
              name: 'insured-edit',
              params: { id: data.item.id, relationship_type_id: data.item.relationship_type_id  },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Editar Asegurado'"
              variant="flat-success"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
          </router-link>

          <router-link
            :to="{
              name: 'insured-disabled',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Baja solo del dependiente'"
              v-if="data.item.relationship_type_id !== 39"
              variant="flat-warning"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="ArrowDownIcon" />
            </b-button>
          </router-link>

          <router-link
            :to="{
              name: 'insured-disabled',
              params: { id: data.item.id },
            }"
          >
            <b-button
              v-b-tooltip.hover.top="'Baja del titular y sus dependientes'"
              v-if="data.item.relationship_type_id === 39"
              variant="flat-danger"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="ArrowDownIcon" />
            </b-button>
          </router-link>

          <router-link :to="{
            name: 'dependent-create-admin',
            params: { id: data.item.user_id},

          }">
            <b-button v-b-tooltip.hover.top="'Crear Dependiente'"
                      v-if="data.item.id === 31"
                      variant="flat-danger"
                      class="btn-icon rounded-circle"
            >
              <feather-icon icon="UserIcon" />
            </b-button>
          </router-link>

          <!-- CITAS -->
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
            </b-button>
          </router-link>

        </div>
      </template>

      <template #cell(user.birth_date)="data">
        <strong>{{ data.item.user.birth_date | formatDateSimple }}</strong>
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
import {formatDate, formatDateSimple, getDate, getTime} from "@/custom/filters"
import { PERMISSION_INSURED_USERS } from '@/permissions'

const ref = require("@vue/composition-api");

export default {
  name: 'InsuredUserList',
  components: {
    TableHeader,
    TablePagination,
  },
  filters: {
    formatDateSimple
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
      refetchData,
    } = useList()

    const fetchItems = async () => {
      let sortBy = 'updated_at'
      const sortOption = 'sortBy' + (isSortDirDesc.value ? 'Desc' : 'Asc')
      const { data } = await InsuredResource.getAll({
        scope: `search:${searchQuery.value},OnlyInsuredRoles`,
        limit: perPage.value,
        page: currentPage.value,
        [sortOption]: sortBy,
        include: 'user;unit.center;relationship;user.roles',
      })

      totalRows.value = data.total_data
      console.log("lista")
      console.log(data.rows)
      return data.rows
    }

    const tableColumns = [
      { key: 'actions', label: 'Acciones', thStyle: { width: '100px' } },
      //user_id replace for id
      // { key: 'user_id', label: '#', width: '10px', sortable: true, thStyle: { width: '50px' } },
      { key: 'user.name', label: 'Nombre', sortable: false },
      { key: 'user.paternal_surname', label: 'Paterno', sortable: false },
      { key: 'user.maternal_surname', label: 'Materno', sortable: false },
      { key: 'user.ci', label: 'Carnet', sortable: false },
      { key: 'relationship.name', label: 'Parentesco', sortable: false },
      { key: 'unit.center.name', label: 'Centro de Salud', sortable: false },
      { key: 'user.birth_date', label: 'Fecha Nacimiento', sortable: false },
      { key: 'user.email', label: 'Correo', sortable: false },
      { key: 'user.registration_code', label: 'Numero Asegurado', sortable: false },
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
      PERMISSION_INSURED_USERS
    }
  },

  methods: {
    async handleDelete(resourceId) {
      const isDeleted = await this.deleteResource(resourceId, InsuredResource)
      if (isDeleted) {
        this.refetchData()
      }
    },
  },
}
</script>

<style scoped></style>
