import { TypesResource } from '@/network/lib/types'


export const SPECIALTIES = 'SPECIALTIES'
export const MEDICAL_UNIT_TYPE = 'MEDICAL_UNIT_TYPE'
export const RELATIONSHIP_TYPE = 'RELATIONSHIP_TYPE'
export const ATTENTION_TYPE = 'ATTENTION_TYPE'
export const TREATMENT_TYPE = 'TREATMENT_TYPE'
export const APPOINTMENT_STATUS = 'APPOINTMENT_STATUS'

const state = {
  specialties: [],
  medicalUnitTypes: [],
  relationshipTypes: [],
  attentionTypes: [],
  treatmentTypes: [],
  appointmentTypes: [],
  appointmentStatuses: []
}

const getters = {}

const mutations = {
  [SPECIALTIES]: (state, payload) => {
    state.specialties = payload
  },
  [ATTENTION_TYPE]: (state, payload) => {
    state.attentionTypes = payload
  },
  [TREATMENT_TYPE]: (state, payload) => {
    state.treatmentTypes = payload
  },
  [APPOINTMENT_STATUS]: (state, payload) => {
    state.appointmentStatuses = payload
  }
}

const actions = {
  [SPECIALTIES]: async ({ commit, state }, query) => {
    let items = []
    if (state.specialties.length) {
      items = state.specialties
    } else {
      const { data } = await TypesResource.getSpecialties({ sortByAsc: 'name', ...query })
      items = data.rows
    }
    commit(SPECIALTIES, items)
  },
  [ATTENTION_TYPE]: async ({ commit, state }, query) => {
    let items = []
    if (state.attentionTypes.length) {
      items = state.attentionTypes
    } else {
      const { data } = await TypesResource.getAttentionTypes({ sortByAsc: 'id', ...query })
      items = data.rows
    }
    commit(ATTENTION_TYPE, items)
  },
  [TREATMENT_TYPE]: async ({ commit, state }, payload) => {
    let items = []
    if (state.treatmentTypes.length) {
      items = state.treatmentTypes
    } else {
      const { data } = await TypesResource.getTreatmentTypes({ sortByAsc: 'id' })
      items = data.rows
    }
    commit(TREATMENT_TYPE, items)
  },
  [APPOINTMENT_STATUS]: async ({ commit }, payload) => {
    let items = []
    if (state.appointmentStatuses.length) {
      items = state.appointmentStatuses
    } else {
      const { data } = await TypesResource.getAppointmentStatuses({ sortByAsc: 'id' })
      items = data.rows
    }
    commit(APPOINTMENT_STATUS, items)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}