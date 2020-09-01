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
import AppSchedule from '@/components/AppSchedule'
import AppOverview from '@/components/AppOverview'
import AppScheduleCreate from '@/components/AppScheduleCreate'
import AppSetting from '@/components/AppSetting'
import AppSpec from '@/components/AppSpec'
import AppDev from '@/components/AppDev'

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
      component: App,
      children: [
        {
          path: '',
          name: 'AppOverview',
          component: AppOverview
        },
        {
          path: 'overview',
          name: 'AppOverview',
          component: AppOverview
        },
        {
          path: 'schedule',
          name: 'AppSchedule',
          component: AppSchedule
        },
        {
          path: 'spec',
          name: 'AppSpec',
          component: AppSpec
        },
        {
          path: 'dev',
          name: 'AppDev',
          component: AppDev
        },
        {
          path: 'setting',
          name: 'AppSetting',
          component: AppSetting
        },
        {
          path: 'schedule-create',
          name: 'AppScheduleCreate',
          component: AppScheduleCreate
        }
      ]
    }
  ]
})
