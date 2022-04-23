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

  changePassword(resource) {
    return this.request({
      url: '/' + this.uri + '/change-password',
      method: 'post',
      data: resource
    })
  }
}

const resource = new ProfileResource()
export { resource as ProfileResource }
