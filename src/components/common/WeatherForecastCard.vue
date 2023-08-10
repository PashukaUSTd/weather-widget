<template>
  <article :class="$style.WeatherForecastCard">
    <h2 :class="$style.title">
      {{ title }}
    </h2>

    <div :class="$style.wrapper">
      <img
        :class="$style.icon"
        :alt="weather.description"
        :src="getWeatherIcon"
      />

      <h3 :class="$style.degree">
        {{ getDegree }} °C
      </h3>
    </div>

    <p :class="$style.description">
      {{ description }}
    </p>

    <ul :class="$style.options">
      <li :class="$style.option">
        {{ wind.speed }}m/s SSE
      </li>

      <li :class="$style.option">
        {{ main.pressure }}hPa
      </li>

      <li :class="$style.option">
        Humidity: {{ main.humidity }}%
      </li>

      <li :class="$style.option">
        Visibility: {{ visibility }}km
      </li>
    </ul>
  </article>
</template>

<script>
import { formateToCelsius } from '@/assets/js/utils'

export default {
  name: 'WeatherForecastCard',

  props: {
    initData: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      data: { ...this.initData }
    }
  },

  computed: {
    title () {
      return `${this.data.name}, ${this.data.sys.country}`
    },

    wind () {
      return this.data.wind
    },

    weather () {
      return this.data.weather[0]
    },

    main () {
      return this.data.main
    },

    visibility () {
      return this.data.visibility / 1000
    },

    getWeatherIcon () {
      return this.$api.weather.getIcon(this.weather.icon)
    },

    getDegree () {
      return parseInt(formateToCelsius(this.main.temp, 'k'))
    },

    feelsLike () {
      return `Feels like ${parseInt(formateToCelsius(this.main.feels_like, 'k'))} °C`
    },

    description () {
      return `${this.feelsLike} ${this.weather.description}. ${this.weather.main}`
    }
  }
}
</script>

<style lang="scss" module>
  .WeatherForecastCard {
    //
  }

  .title {
    margin-bottom: $gap;
    font-weight: bold;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 8.4rem;
    height: 8.4rem;
    margin-right: $gap-m;
  }

  .degree {
    margin-left: $gap-sm;
    font-size: 2.8rem;
    font-weight: bold;
  }

  .description {
    margin-bottom: $gap-tinny;
    font-size: 1rem;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
  }

  .option {
    width: 50%;
    margin-bottom: $gap-sm;
    font-size: 1rem;
  }
</style>
