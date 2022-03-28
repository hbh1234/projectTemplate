import HttpRequest from './request'
import { BASE_URL } from './request/config'
const http = new HttpRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptoprs: {
    // 请求前
    requestInterceptor: (config) => {
      // 成功
      return config
    },
    requestInterceptorCatch: (error) => {
      // 失败
      return error
    },
    // 响应后
    responseInterceptor: (config) => {
      // 成功
      return config
    },
    responseInterceptorCatch: (error) => {
      // 失败
      return error
    }
  }
})
export default http
