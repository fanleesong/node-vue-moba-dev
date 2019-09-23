import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http';

Vue.prototype.$http = http; //将http加载到Vue的实例上，就可以任意地方使用http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')