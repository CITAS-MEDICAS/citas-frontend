import { Resource } from '@/network/resource'

class MedicalCenterResource extends Resource {
  constructor() {
    super('api/medical-center')
  }
  downloadCsv(id) {
    return this.request({
      url: '/' + this.uri + '/download-csv/' + id,
      method: 'get',
    })
  }
}

const resource = new MedicalCenterResource()
export { resource as MedicalCenterResource }
