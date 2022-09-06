import { Resource } from '@/network/resource'

class TicketResource extends Resource {
  constructor() {
    super('api/tickets')
  }

  printTicket(ticketId) {
    return this.request({
      url: `/${this.uri}/${ticketId}/pdf/?output=print`,
      method: 'get',
      responseType: 'blob',
    })
  }
}

const resource = new TicketResource()
export { resource as TicketResource }
