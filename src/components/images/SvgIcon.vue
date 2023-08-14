<template>
  <span v-html="icon" :class="className"></span>
</template>

<script>

export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  computed: {
    icon () {
      return require(`@/assets/svg/${this.name}.svg`)
    },

    className () {
      return 'svg-icon svg-icon--' + this.name
    }
  }
}
</script>

<style>
  .svg-icon {
    display: inline-block;
    fill: currentColor;
    height: 1.6rem;
    width: 1.6rem;
  }
</style>
