<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script>
import WeatherWidget from '@/components/common/WeatherWidget.vue'
import SvgIcon from '@/components/images/SvgIcon.vue'
import Vue from 'vue'

// import axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// import api
import api from '@/api/api'

Vue.component('SvgIcon', SvgIcon)
Vue.use(VueAxios, axios)
Vue.prototype.$api = api

export default {
  name: 'App',

  components: {
    WeatherWidget
  }
}
</script>

<style src="./assets/scss/bundle.scss" lang="scss">
  //
</style>
