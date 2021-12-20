import { useJwt } from '@/auth/jwt/useJwt'

const request = useJwt.axiosIns

export class Resource {
  constructor(uri) {
    this.uri = uri
    this.request = request
  }

  getAll(query) {
    return this.request({
      url: '/' + this.uri,
      method: 'get',
      params: query,
    })
  }

  getById(id, query) {
    return this.request({
      url: '/' + this.uri + '/' + id,
      method: 'get',
      params: query,
    })
  }

  store(resource) {
    return this.request({
      url: '/' + this.uri,
      method: 'post',
      data: resource,
    })
  }

  update(id, resource) {
    return this.request({
      url: '/' + this.uri + '/' + id,
      method: 'put',
      data: resource,
    })
  }

  destroy(id) {
    return this.request({
      url: '/' + this.uri + '/' + id,
      method: 'delete',
    })
  }
}
