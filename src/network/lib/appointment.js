import { Resource } from '@/network/resource'

class AppointmentResource extends Resource {
  constructor() {
    super('api/appointment')
  }
}

const resource = new AppointmentResource()
export { resource as AppointmentResource }
