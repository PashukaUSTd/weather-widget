<template>
  <div :class="$style.WidgetHeader">
    <h2 :class="$style.title">
      {{ title }}
    </h2>

    <IconButton
      :icon-name="iconName"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
import IconButton from '@/components/ui/IconButton.vue'

export default {
  name: 'WidgetHeader',
  components: { IconButton },

  props: {
    iconName: {
      type: String,
      default: 'close'
    },

    title: {
      type: String,
      default: 'Settings'
    }
  }
}
</script>

<style lang="scss" module>
  .WidgetHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $gap-sm;
  }

  .title {
    font-weight: bold;
  }
</style>
