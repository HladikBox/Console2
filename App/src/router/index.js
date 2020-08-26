import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Register from '@/components/Register'
import PasswordReset from '@/components/PasswordReset'
import Management from '@/components/Management'
import Account from '@/components/Account'
import Certification from '@/components/Certification'
import AccessGroup from '@/components/AccessGroup'
import AppCreate from '@/components/AppCreate'
import App from '@/components/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/passwordreset',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/management',
      name: 'Management',
      component: Management
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/certification',
      name: 'Certification',
      component: Certification
    },
    {
      path: '/access-group',
      name: 'AccessGroup',
      component: AccessGroup
    },
    {
      path: '/app-create',
      name: 'AppCreate',
      component: AppCreate
    },
    {
      path: '/app/:alias',
      name: 'App',
      component: App
    }
  ]
})
