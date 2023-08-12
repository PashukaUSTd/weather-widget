<template>
  <button
    :class="[$style.IconButton, {[$style._disabled]: disabled}]"
    @click="$emit('click', $event)"
  >
    <svg-icon :name="iconName" />
  </button>
</template>

<script>

export default {
  name: 'IconButton',

  props: {
    iconName: {
      type: String,
      default: ''
    },

    disabled: Boolean
  }
}
</script>

<style lang="scss" module>
  .IconButton {
    cursor: pointer;
    transition: color $default-transition, opacity $default-transition;

    @include hover() {
      color: $base-400;
    }

    &:active {
      color: $base-900;
    }

    &._disabled {
      pointer-events: none;
      opacity: .3;
    }
  }
</style>
