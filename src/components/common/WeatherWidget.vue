<template>
  <div
    :class="[$style.WeatherWidget, 'scrollable-container']"
    :style="styles"
  >
    <transition name="fade" mode="out-in">
      <WeatherView
        v-if="view === 'weather'"
        :locations="locations"
        @open-settings="view = 'settings'"
      />

      <SettingsView
        v-else
        :init-locations="locations"
        @add-location="addLocation"
        @remove-location="removeLocation"
        @close-settings="view = 'weather'"
        @change-locations="onChangeLocations"
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
      locations: [],
      styles: {}
    }
  },

  created () {
    this.locations = JSON.parse(localStorage.getItem('widget-weather-locations')) || []
  },

  methods: {
    onChangeLocations (locations) {
      this.locations = locations
      this.saveData()
    },

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
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 25rem;
    min-height: 30rem;
    max-height: 50rem;
    padding: $gap-sm;
    box-shadow: $box-shadow;
    transition: transform $default-transition;
  }
</style>
