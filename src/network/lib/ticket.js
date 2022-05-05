import { Resource } from '@/network/resource'

class TicketResource extends Resource {
  constructor() {
    super('api/tickets')
  }
}

const resource = new TicketResource()
export { resource as TicketResource }
