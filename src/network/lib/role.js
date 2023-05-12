import { Resource } from '@/network/resource'

class RoleResource extends Resource {
  constructor() {
    super('api/roles')
  }
}

const resource = new RoleResource()
export { resource as RoleResource }
