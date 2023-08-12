<template>
  <label :class="[$style.VInput, {[$style._error]: error}]">
    <span :class="$style.label">
      {{ error ? errorText : label }}
    </span>

    <input
      :value="value"
      :class="$style.input"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
export default {
  name: 'VInput',

  props: {
    value: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    iconName: {
      type: String,
      default: ''
    },

    errorText: {
      type: String,
      default: 'Something went wrong try again'
    },

    error: Boolean
  }
}
</script>

<style lang="scss" module>
  .VInput {
    display: flex;
    flex-direction: column;

    &._error {
      .input {
        border-color: $error;
      }

      .label {
        color: $error;
      }
    }
  }

  .label {
    font-size: 1.4rem;
    margin-bottom: $gap-tinny;
  }

  .input {
    width: 100%;
    padding: $gap-tinny;
    border: 1px solid $aqua;
    border-radius: $border-radius;
  }
</style>
