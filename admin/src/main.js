import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
Vue.use(ElementUi)


import http from './http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
