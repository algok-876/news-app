import { userLogin, whoami, loginOut } from '../service/userService'

export default {
  namespaced: true,
  state: {
    loginInfo: {
      data: '',
      isLoading: false
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loginInfo.isLoading = payload
    },
    setData (state, payload) {
      state.loginInfo.data = payload
    }
  },
  actions: {
    async login (context, payload) {
      context.commit('setLoading', true)
      const res = await userLogin(payload)
      context.commit('setLoading', false)
      // 判断是否登录成功
      if (res.data.code === 0) {
        localStorage.setItem('token', res.headers.authorization)
        context.commit('setData', res.data.data)
        return true
      }
      return false
    },
    // 检查是否登录
    async whoAmI (context) {
      context.commit('setLoading', true)
      const res = await whoami()
      context.commit('setLoading', false)
      context.commit('setData', res)
    },
    // 登出
    loginOut (context) {
      loginOut()
      context.commit('setLoading', false)
      context.commit('setData', null)
    }
  }
}
