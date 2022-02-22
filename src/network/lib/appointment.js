import { Resource } from '@/network/resource'

class AppointmentResource extends Resource {
  constructor() {
    super('api/appointment')
  }

  cancelAppointment(id) {
    return this.request({
      url: `${this.uri}/${id}/cancel`,
      method: 'post'
    })
  }
}

const resource = new AppointmentResource()
export { resource as AppointmentResource }
