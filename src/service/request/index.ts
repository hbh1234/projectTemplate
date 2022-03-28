import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
interface requestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig // 请求前成功
  requestInterceptorCatch?: (error: any) => any // 请求前失败
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse // 响应后成功
  responseInterceptorCatch?: (error: any) => any // 响应后失败
}
// 扩展AxiosRequestConfig类型
interface requestConfig extends AxiosRequestConfig {
  interceptoprs?: requestInterceptors
  loading?: boolean
}

class HttpRequest {
  instance: AxiosInstance
  interceptoprs?: requestInterceptors
  loadingInstance?: any
  loading?: boolean
  constructor(config: requestConfig) {
    this.instance = axios.create(config)
    this.interceptoprs = config.interceptoprs
    this.loading = config.loading ?? true
    // 每个axios都有自己独立的拦截
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      this.interceptoprs?.requestInterceptor,
      this.interceptoprs?.requestInterceptorCatch
    )
    // 每个axios 添加响应拦截器
    this.instance.interceptors.response.use(
      this.interceptoprs?.responseInterceptor,
      this.interceptoprs?.responseInterceptorCatch
    )
    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.loading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '请求中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        // 设置token
        if (config.headers) {
          config.headers.Authorization = `Bearer 12345`
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loadingInstance?.close()
        }, 2000)
        // 请求接口成功后的返回拦截
        if (res.status == 200) {
          return res
        } else {
          console.log('数据错误')
        }
      },
      (err) => {
        setTimeout(() => {
          this.loadingInstance?.close()
        }, 2000)
        // http错误拦截
        if (err.response.status == 404) {
          console.log('错误')
        }
        return err
      }
    )
  }
  requset<T>(config: requestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // loading处理
      if (config.loading == false) {
        this.loading = config.loading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          console.log(res)
          this.loading = true
          resolve(res)
        })
        .catch((err) => {
          this.loading = true
          reject(err)
        })
    })
  }
  get<T>(config: requestConfig): Promise<T> {
    return this.requset<T>({ ...config, method: 'GET' })
  }
  post<T>(config: requestConfig): Promise<T> {
    return this.requset<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: requestConfig): Promise<T> {
    return this.requset<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: requestConfig): Promise<T> {
    return this.requset<T>({ ...config, method: 'PUT' })
  }
}
export default HttpRequest
