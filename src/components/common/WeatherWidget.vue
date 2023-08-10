<template>
  <div :class="$style.WeatherWidget">
    <transition name="fade" mode="out-in">
      <WeatherView
        v-if="view === 'weather'"
        :locations="locations"
        @open-settings="view = 'settings'"
      />

      <SettingsView
        v-else
        :locations="locations"
        @add-location="addLocation"
        @remove-location="removeLocation"
        @close-settings="view = 'weather'"
      />
    </transition>
  </div>
</template>

<script>
import WeatherView from '@/components/common/WeatherView.vue'
import SettingsView from '@/components/common/SettingsView.vue'

export default {
  name: 'WeatherWidget',

  components: {
    SettingsView,
    WeatherView
  },

  data () {
    return {
      view: 'weather',
      locations: []
    }
  },

  created () {
    this.locations = JSON.parse(localStorage.getItem('widget-weather-locations')) || []
  },

  methods: {
    addLocation (location) {
      this.locations.push(location)
      this.saveData()
    },

    removeLocation (id) {
      const index = this.locations.findIndex(el => el.id === id)
      this.locations.splice(index, 1)
      this.saveData()
    },

    saveData () {
      localStorage.setItem('widget-weather-locations', JSON.stringify(this.locations))
    }
  }
}
</script>

<style lang="scss" module>
  .WeatherWidget {
    position: fixed;
    top: $gap;
    left: $gap;
    display: flex;
    flex-direction: column;
    width: 25rem;
    min-height: 30rem;
    padding: $gap-sm;
    box-shadow: $box-shadow;
  }
</style>
