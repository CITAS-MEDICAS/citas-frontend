import { Resource } from '@/network/resource'

class MedicalUnitResource extends Resource {
  constructor() {
    super('api/medical-unit')
  }
}

const resource = new MedicalUnitResource()
export { resource as MedicalUnitResource }
