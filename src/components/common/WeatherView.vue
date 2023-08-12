<template>
  <div :class="$style.WeatherView">
    <h2>new version</h2>

    <IconButton
      :class="$style.button"
      icon-name="settings"
      @click="$emit('open-settings')"
    />

    <transition name="fade" mode="out-in">
      <ul
        v-if="locations.length"
        :class="$style.list"
      >
        <li
          v-for="location in locations"
          :key="location.id"
          :class="$style.item"
        >
          <WeatherForecastCard :init-data="location" />
        </li>
      </ul>

      <p
        v-else
        :class="$style.empty"
      >
        There are no locations here yet<br>
        you can add city in settings
      </p>
    </transition>
  </div>
</template>

<script>
import IconButton from '@/components/ui/IconButton.vue'
import WeatherForecastCard from '@/components/common/WeatherForecastCard.vue'

export default {
  name: 'WeatherView',

  components: { WeatherForecastCard, IconButton },

  props: {
    locations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
  .WeatherView {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .list {
    & > * + * {
      margin-top: $gap;
    }
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin: auto 0;
    padding: $gap-sm;
    font-size: 1.6rem;
  }
</style>
