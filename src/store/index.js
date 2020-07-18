import Vue from 'vue'
import Vuex from 'vuex'
import channels from './channels'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  // 将每个模块重组
  modules: {
    channels,
    login
  }
})
