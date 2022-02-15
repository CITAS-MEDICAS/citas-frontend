import { computed, ref } from '@vue/composition-api'
import store from '@/store'

export const useCalendarSidebar = () => {
  const attentionTypes = computed(() => store.state.calendar.attentionTypes)
  const attentionTypeColor = computed(() => store.state.calendar.attentionTypeColor)

  const attentionSelected = computed({
    get: () => store.state.calendar.attentionSelected,
    set: val => {
      store.commit('calendar/ATTENTION_SELECTED', val)
    },
  })

  const checkAll = computed({
    get: () => attentionSelected.value.length === attentionTypes.value.length,
    set: val => {
      if (val) {
        attentionSelected.value = attentionTypes.value.map(i => i.id)
      } else if (attentionSelected.value.length === attentionTypes.value.length) {
        attentionSelected.value = []
      }
    },
  })

  return {
    attentionTypes,
    attentionSelected,
    checkAll,
    attentionTypeColor,
  }
}
