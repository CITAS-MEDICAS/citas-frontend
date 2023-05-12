import { Resource } from '@/network/resource'

class RegistrationResource extends Resource {
  constructor() {
    super('api/registration')
  }

  verificationMail(id) {
    return this.request({
      url: `${this.uri}/${id}/verification-mail`,
      method: 'post',
    })
  }
}

const resource = new RegistrationResource()
export { resource as RegistrationResource }
