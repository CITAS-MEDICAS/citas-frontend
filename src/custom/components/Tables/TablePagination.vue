<template>
  <div class="mx-2 mb-2 d-flex justify-content-end">
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
      class="mb-0 mt-1 mt-sm-0"
      prev-class="prev-item"
      next-class="next-item"
    >
      <template #prev-text>
        <feather-icon icon="ChevronLeftIcon" size="18" />
      </template>
      <template #next-text>
        <feather-icon icon="ChevronRightIcon" size="18" />
      </template>
    </b-pagination>
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'

export default {
  name: 'TablePagination',
  props: {
    totalRows: {
      required: true,
      type: Number,
    },
    perPage: {
      required: true,
      type: Number,
    },
  },
  setup() {
    return {
      currentPage: inject('currentPage'),
    }
  },
}
</script>

<style scoped></style>
