import Vue from 'vue'
import App from './App.vue'

// svg sprite
import '@/svg'
import SvgIcon from '@/components/images/SvgIcon.vue'

// import global css
import './assets/scss/bundle.scss'

// import axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// import api
import api from '@/api/api'

Vue.component('SvgIcon', SvgIcon)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.prototype.$api = api

new Vue({
  render: h => h(App)
}).$mount('#weather-widget')
