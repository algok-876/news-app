import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import 'normalize.css'
import './assets/style/global.css'
import './assets/iconfont/iconfont.css'
import { AppCode } from './service/config'

store.dispatch('channels/getNewsChannel')
store.dispatch('login/whoAmI')

Vue.config.productionTip = false

const newsData = axios.create({
  baseURL: 'http://ali-news.showapi.com',
  headers: {
    Authorization: `APPCODE ${AppCode}`
  }
})

// 添加响应拦截器
newsData.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
Vue.prototype.$http = newsData

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
