import { Resource } from '@/network/resource'

class MedicalCenterResource extends Resource {
  constructor() {
    super('api/medical-center')
  }
}

const resource = new MedicalCenterResource()
export { resource as MedicalCenterResource }
