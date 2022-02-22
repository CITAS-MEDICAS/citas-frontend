import { Resource } from '@/network/resource'

class TypesResource extends Resource {
  constructor() {
    super('api/types')
  }

  getSpecialties(query) {
    return this.getAll({ scope: 'specialties', ...query })
  }

  getUnitTypes(query) {
    return this.getAll({ scope: 'medicalUnit', ...query })
  }

  getRelationships(query) {
    return this.getAll({ scope: 'relationship', ...query })
  }

  getAttentionTypes(query) {
    return this.getAll({ scope: 'attentionType', ...query })
  }

  getTreatmentTypes(query) {
    return this.getAll({ scope: 'treatment', ...query })
  }

  getAppointmentTypes(query) {
    return this.getAll({ scope: 'appointmentType', ...query })
  }

  getAppointmentStatuses(query) {
    return this.getAll({ scope: 'appointmentStatus', ...query })
  }
}

const resource = new TypesResource()
export { resource as TypesResource }
