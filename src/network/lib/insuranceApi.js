import { request } from '@/network/resource'

class InsuranceApi {
  constructor() {
    this.uri = 'api/external/insurance'
    this.request = request
  }

  search(query) {
    return this.request({
      url: `/${this.uri}/search`,
      method: 'get',
      params: query,
    })
  }
}

const resource = new InsuranceApi()
export { resource as InsuranceApi }
