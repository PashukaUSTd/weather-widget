<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script>

import WeatherWidget from '@/components/common/WeatherWidget.vue'

export default {
  name: 'App',

  components: {
    WeatherWidget
  }
}
</script>

<style src="../dist/weather-widget-rakhmukov.css" scoped>
  //
</style>
