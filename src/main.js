import Vue from 'vue'
import Vant from 'vant'
import VeeValidate from 'vee-validate'
import 'vant/lib/index.css'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vant)
// 配置插件veevalidate
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
