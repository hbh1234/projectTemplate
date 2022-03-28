import { createStore } from 'vuex'
export interface GlobalPorps {
  userName: string
  isLogin: boolean
  token: string
}

export default createStore<GlobalPorps>({
  state: {
    userName: 'hebaohai',
    isLogin: true,
    token: 'ajskldjaklsdj'
  },
  mutations: {},
  actions: {},
  modules: {}
})
