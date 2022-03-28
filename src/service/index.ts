import HttpRequest from './request'
import { BASE_URL } from './request/config'
const http = new HttpRequest({
  baseURL: BASE_URL,
  timeout: 10000
})
export default http
