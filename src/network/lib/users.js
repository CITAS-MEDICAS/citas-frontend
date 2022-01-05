import { Resource } from '@/network/resource'

class UserResource extends Resource {
  constructor() {
    super('api/users')
  }
}

const resource = new UserResource()
export { resource as UserResource }
