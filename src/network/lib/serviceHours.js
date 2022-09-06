import { Resource } from '@/network/resource'

class ServiceHoursResource extends Resource {
  constructor() {
    super('api/service-hours')
  }
}

const resource = new ServiceHoursResource()
export { resource as ServiceHoursResource }
