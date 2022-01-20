import { useJwt } from '@/auth/jwt/useJwt'

const request = useJwt.axiosIns

class ProfileResource {
  constructor() {
    this.uri = 'api/profile'
    this.request = request
  }

  permissions() {
    return this.request({
      url: '/' + this.uri + '/permissions',
      method: 'get',
    })
  }
}

const resource = new ProfileResource()
export { resource as ProfileResource }
