import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  withCredentials: true,
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_API_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
