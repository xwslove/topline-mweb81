import Vue from 'vue'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
// 导入veevalidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vant)
// 配置插件veevalidate
Vue.use(VeeValidate)
// 配置中文
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
