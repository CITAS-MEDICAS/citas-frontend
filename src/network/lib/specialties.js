import { Resource } from '@/network/resource'

class SpecialtiesResource extends Resource {
  constructor() {
    super('api/specialties')
  }
}

const resource = new SpecialtiesResource()
export { resource as SpecialtiesResource }
