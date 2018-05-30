// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastckick from 'fastclick'

Vue.prototype.$axios = axios
Vue.config.productionTip = true
fastckick.attach(document.body) //解决点击300s延迟问题
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
