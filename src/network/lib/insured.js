import { Resource } from '@/network/resource'

class InsuredResource extends Resource {
  constructor() {
    super('api/insured')
  }

  renovate(id, resource) {
    return this.request({
      url: `/${this.uri}/${id}/renovate`,
      method: 'post',
      data: resource,
    })
  }
  undelete(id, obs, resource) {
    return this.request({
      url: `api/insured/undelete/${id}/${obs}`,
      method: 'get',
      data: resource,
    })
  }
  deleteWithObs(id, obs, resource) {
    return this.request({
      url: `api/insured/${id}/${obs}`,
      method: 'delete',
      data: resource,
    })
  }
}

const resource = new InsuredResource()
export { resource as InsuredResource }
