import { Resource } from '@/network/resource'

class RegistrationResource extends Resource {
  constructor() {
    super('api/registration')
  }
}

const resource = new RegistrationResource()
export { resource as RegistrationResource }
