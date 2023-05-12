import { Resource } from '@/network/resource'

class CalendarResource extends Resource {
  constructor() {
    super('api/insuredAppointment-calendar')
  }

  getCalendar(medicalUnitId, query) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar`,
      method: 'get',
      params: query
    })
  }

  storeCalendar(medicalUnitId, resource) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar`,
      method: 'post',
      data: resource
    })
  }

  deleteCalendar(medicalUnitId, resource) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar`,
      method: 'delete',
      data: resource
    })
  }
  availability(medicalUnitId, query) {
    return this.request({
      url: `/api/medical-unit/${medicalUnitId}/calendar/availability`,
      method: 'get',
      params: query
    })
  }
}

const resource = new CalendarResource()
export { resource as CalendarResource }
