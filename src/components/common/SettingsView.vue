<template>
  <div :class="$style.SettingsView">
    <WidgetHeader
      @click="$emit('close-settings')"
    />

    <transition name="fade" mode="out-in">
      <draggable
        v-if="locations.length"
        v-model="locations"
        :class="[$style.list, 'scrollable-container']"
      >
        <div
          v-for="location in locations"
          :key="location.id"
          :class="$style.location"
        >
          <svg-icon name="menu" :class="$style.drag" />

          <h3>
            {{ location.name }}, {{ location.sys.country }}
          </h3>

          <IconButton
            icon-name="trash"
            :class="$style.remove"
            @click="$emit('remove-location', location.id)"
          />
        </div>
      </draggable>

      <p
        v-else
        :class="$style.empty"
      >
        There are no locations here yet
      </p>
    </transition>

    <form
      :class="$style.form"
      @submit.prevent="addLocation"
    >
      <div :class="$style.wrapper">
        <VInput
          v-model="value"
          :class="$style.input"
          :error="error"
          :error-text="errorText"
          label="Add location"
          icon-name="enter"
        />

        <IconButton
          :class="$style.button"
          :disabled="!value"
          icon-name="enter"
          @click.prevent="addLocation"
        />
      </div>
    </form>
  </div>
</template>

<script>
import WidgetHeader from '@/components/common/WidgetHeader.vue'
import IconButton from '@/components/ui/IconButton.vue'
import VInput from '@/components/ui/VInput.vue'
import draggable from 'vuedraggable'

export default {
  name: 'SettingsView',

  components: { VInput, IconButton, WidgetHeader, draggable },

  props: {
    initLocations: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      locations: [...this.initLocations],
      value: '',
      error: false,
      errorText: ''
    }
  },

  watch: {
    locations (val) {
      this.$emit('change-locations', val)
    },

    initLocations (val) {
      this.locations = val
    }
  },

  methods: {
    async addLocation () {
      try {
        const { data } = await this.axios.get(this.$api.weather.searchCityCoords(this.value))
          .then(({ data }) => {
            if (data.length > 0) {
              const { lat, lon } = data[0]
              return this.axios.get(this.$api.weather.searchWeather(lat, lon))
            }

            throw new Error('Can not find location')
          })

        this.$emit('add-location', data)
        this.value = ''
        this.error = false
      } catch (e) {
        this.errorText = 'Can not find this location'
        this.error = true
        this.value = ''
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" module>
  .SettingsView {
    position: relative;
    flex-grow: 1;
    padding-bottom: 7rem;
  }

  .list {
    overflow-y: auto;
    max-height: 25rem;
  }

  .location {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: $gap-sm;
    padding: $gap-sm;
    background-color: $base-300;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15rem;
    padding: $gap-sm;
    font-size: 1.6rem;
  }

  .drag {
    margin-right: $gap-m;
    cursor: move;
  }

  .remove {
    margin-left: auto;
  }

  .form {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .wrapper {
    display: flex;
    align-items: flex-end;
  }

  .input {
    flex-grow: 1;
  }

  .button {
    margin-left: $gap-m;

    :global(.svg-icon--enter) {
      width: 3rem;
      height: 3rem;
      transform: rotate(90deg);
    }
  }
</style>
