import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import baseComponents from './baseComponents/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/less/index.less'
import http from './service/index'
const app = createApp(App)
interface DataType {
  status: number
  success: boolean
  data: any
}
http
  .requset<DataType>({
    url: 'https://api.douban.com/v2/book/search1',
    method: 'GET'
  })
  .then((res) => {
    console.log('333', res)
  })

app.use(ElementPlus)
app.use(baseComponents)
app.use(store)
app.use(router)
app.mount('#app')
