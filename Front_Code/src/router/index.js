import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import index from '@/components/index'
import home from '@/components/home'
import china from '@/components/china'
import outChina from '@/components/outChina'
import mySchedule from '@/components/mySchedule'
import registe from '@/components/registe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registe',
      name: 'registe',
      component: registe
    },
    {
      path: '/',
      component: home,
      meta: {requiresAuth: true},
      children: [
        {path: '/index', component: index, name: 'index', meta: {requiresAuth: true}},
        {path: '/china', component: china, name: 'china', meta: {requiresAuth: true}},
        {path: '/international', component: outChina, name: 'outChina', meta: {requiresAuth: true}},
        {path: '/schedule', component: mySchedule, name: 'mySchedule', meta: {requiresAuth: true}},

      ]
    }
  ]
})
