<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <b-button
        v-b-modal.calendar-form
        aria-controls="sidebar-add-new-event"
        variant="primary"
        block
      >
        Generar
      </b-button>
      <div class="mt-3">
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">Tipo de Atención</span>
        </h5>
        <b-form-checkbox v-model="checkAll" class="mb-1"> Ver Todo</b-form-checkbox>
        <b-form-group>
          <b-form-checkbox-group v-model="attentionSelected" name="event-filter" stacked>
            <b-form-checkbox
              v-for="item in attentionTypes"
              :key="item.id"
              name="event-filter"
              :value="item.id"
              class="mb-1"
              :class="`custom-control-${attentionTypeColor[item.name]}`"
            >
              {{ item.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import { useCalendarSidebar } from './useCalendarSidebar'

export default {
  name: 'CalendarSidebar',
  setup() {
    const { attentionTypes, attentionSelected, checkAll, attentionTypeColor } = useCalendarSidebar()

    return {
      attentionTypes,
      attentionSelected,
      checkAll,
      attentionTypeColor
    }
  }
}
</script>

<style lang="scss"></style>
