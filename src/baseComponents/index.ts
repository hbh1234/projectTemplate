import { App } from 'vue'
import panel from './panel/index.vue'
//基础组件入口
export default {
  install(app: App): void {
    app.component(panel.name, panel)
  }
}
