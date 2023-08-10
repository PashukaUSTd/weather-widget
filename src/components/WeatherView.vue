<template>
  <div :class="$style.WeatherView">
    <IconButton
      :class="$style.button"
      icon-name="settings"
      @click="$emit('open-settings')"
    />

    <p>
      weather view
    </p>
  </div>
</template>

<script>
import IconButton from '@/components/ui/IconButton.vue'

export default {
  name: 'WeatherView',
  components: { IconButton }
}
</script>

<style lang="scss" module>
  .WeatherView {
    position: relative;
  }

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
