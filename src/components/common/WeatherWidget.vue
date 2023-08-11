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

  async created () {
    this.locations = JSON.parse(localStorage.getItem('widget-weather-locations')) || []
    this.locations = await this.updateData()
  },

  methods: {
    onChangeLocations (locations) {
      this.locations = locations
      this.saveData()
    },

    addLocation (location) {
      if (!this.checkDublicates(location)) {
        this.locations.push(location)
        this.saveData()
      }
    },

    checkDublicates (location) {
      return this.locations.find(el => el.id === location.id)
    },

    removeLocation (id) {
      const index = this.locations.findIndex(el => el.id === id)
      this.locations.splice(index, 1)
      this.saveData()
    },

    saveData () {
      localStorage.setItem('widget-weather-locations', JSON.stringify(this.locations))
    },

    updateData () {
      return Promise.all(this.locations.map(el => {
        return this.axios.get(this.$api.weather.searchWeather(el.coord.lat, el.coord.lon))
          .then(res => res.data)
      }))
    }
  }
}
</script>

<style lang="scss" module>
  .WeatherWidget {
    position: fixed;
    z-index: 1000;
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
