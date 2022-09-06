import { CalendarResource } from '@/network/lib/calendar'
import { TypesResource } from '@/network/lib/types'

export const ATTENTION_TYPES = 'ATTENTION_TYPES'
export const CALENDAR_EVENTS = 'CALENDAR_EVENTS'
export const ATTENTION_SELECTED = 'ATTENTION_SELECTED'

const state = {
  attentionTypes: [],
  attentionSelected: [],
  attentionTypeColor: {
    NUEVO: 'success',
    RECONSULTA: 'warning',
    OTRO: 'danger',
  },
}

const getters = {}
const mutations = {
  [ATTENTION_TYPES]: (state, options) => (state.attentionTypes = options),
  [ATTENTION_SELECTED]: (state, values) => (state.attentionSelected = values),
}
const actions = {
  [ATTENTION_TYPES]: async ({ commit }) => {
    const { data } = await TypesResource.getAttentionTypes({ sortByAsc: 'id' })
    commit(ATTENTION_TYPES, data.rows)
  },
  [CALENDAR_EVENTS]: async ({ commit }, { medicalUnitId, query }) => {
    return await CalendarResource.getCalendar(medicalUnitId, query)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
