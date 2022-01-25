import { Resource } from '@/network/resource'

class InsuredResource extends Resource {
  constructor() {
    super('api/insured')
  }
}

const resource = new InsuredResource()
export { resource as InsuredResource }
