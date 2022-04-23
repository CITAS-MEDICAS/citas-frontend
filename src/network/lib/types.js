import { Resource } from '@/network/resource'

class TypesResource extends Resource {
  constructor() {
    super('api/types')
  }

  getSpecialties(query) {
    const scope = this.resolveScope(query, 'specialties')
    return this.getAll({ ...query, scope })
  }

  getUnitTypes(query) {
    const scope = this.resolveScope(query, 'medicalUnit')
    return this.getAll({ ...query, scope })
  }

  getRelationships(query) {
    const scope = this.resolveScope(query, 'relationship')
    return this.getAll({ ...query, scope })
  }

  getAttentionTypes(query) {
    const scope = this.resolveScope(query, 'attentionType')
    return this.getAll({ ...query, scope })
  }

  getTreatmentTypes(query) {
    const scope = this.resolveScope(query, 'treatment')
    return this.getAll({ ...query, scope })
  }

  getAppointmentStatuses(query) {
    const scope = this.resolveScope(query, 'appointmentStatus')
    return this.getAll({ ...query, scope })
  }

  resolveScope(query, scope) {
    if (query.scope) {
      scope = `${scope},${query.scope}`
    }
    return scope
  }

}

const resource = new TypesResource()
export { resource as TypesResource }
