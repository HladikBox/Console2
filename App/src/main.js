// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Header from './components/Header'
import PeroidGenerate from './components/PeroidGenerate'
import FuncGenerate from './components/FuncGenerate'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import fullCalendar from 'vue-fullcalendar'
import echarts from 'echarts'
import htmlToPdf from './htmlToPdf.js'

Vue.use(htmlToPdf)

Vue.prototype.$echarts = echarts

Vue.component('full-calendar', fullCalendar)
// use
Vue.use(mavonEditor)

Vue.use(ElementUI)
Vue.component('MyHeader', Header);
Vue.component('PeroidGenerate', PeroidGenerate);
Vue.component('FuncGenerate', FuncGenerate);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
