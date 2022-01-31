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
}

const resource = new InsuredResource()
export { resource as InsuredResource }
