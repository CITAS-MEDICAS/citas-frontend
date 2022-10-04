import { Resource } from '@/network/resource'

class AppointmentResource extends Resource {
  constructor() {
    super('api/appointment')
  }

  getAppointmentInsuredVerification(user_id, specialty_id) {
    return this.request({
      url: `/${this.uri}/${user_id}/${specialty_id}`,
      method: 'get',
    })
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
      url: `/${this.uri}/listapdf`,
      method: 'get',
      params: query,
      responseType: 'blob'
    })
  }
  print(id) {
    return this.request({
      url: `/${this.uri}/caratulapdf/${id}`,
      method: 'get',
      responseType: 'blob',
    })
  }
}

const resource = new AppointmentResource()
export { resource as AppointmentResource }
