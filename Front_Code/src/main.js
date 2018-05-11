// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'

export const myAxios = axios

Vue.use(ElementUI)
Vue.use(Vuex)

import store from '@/vuex/store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    localStorage.userid = ""
  }
  if (to.meta.requiresAuth) {
    if (localStorage.userid == "") {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  }
  else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
