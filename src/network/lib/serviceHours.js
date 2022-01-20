import { Resource } from '@/network/resource'

class ServiceHourResource extends Resource {
  constructor() {
    super('api/service-hours')
  }
}

const resource = new ServiceHourResource()
export { resource as ServiceHourResource }
