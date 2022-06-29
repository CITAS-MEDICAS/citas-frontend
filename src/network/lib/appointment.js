import { Resource } from '@/network/resource'

class AppointmentResource extends Resource {
  constructor() {
    super('api/appointment')
  }

  updateStatus(id, resource) {
    return this.request({
      url: `/${this.uri}/${id}/update-status`,
      method: 'put',
      data: resource
    })
  }

  cancelAppointment(id) {
    return this.request({
      url: `/${this.uri}/${id}/cancel`,
      method: 'post'
    })
  }

  download(query) {
    return this.request({
      url: `/${this.uri}/download`,
      method: 'get',
      params: query,
      responseType: 'blob'
    })
  }
}

const resource = new AppointmentResource()
export { resource as AppointmentResource }
