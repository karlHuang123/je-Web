// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import Antd from 'ant-design-vue'
import BaiduMap from 'vue-baidu-map'
import ElementUI from "element-ui"
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'ant-design-vue/dist/antd.css'
import 'font-awesome/css/font-awesome.css'
import "element-ui/lib/theme-chalk/index.css"
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.config.productionTip = false
Vue.use(Antd).use(BaiduMap, { ak : 'ARuf2YIFGgzA3CAL4nyCbhD5qm29Z13n' }).use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
