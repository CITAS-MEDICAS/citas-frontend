import { Resource } from '@/network/resource'

class CalendarResource extends Resource {
  constructor() {
    super('api/calendar')
  }

  getCalendar(medicalUnitId, query) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar`,
      method: 'get',
      params: query,
    })
  }

  storeCalendar(medicalUnitId, resource) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar`,
      method: 'post',
      data: resource,
    })
  }
}

const resource = new CalendarResource()
export { resource as CalendarResource }
