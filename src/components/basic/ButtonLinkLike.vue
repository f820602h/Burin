<script setup lang="ts">
type ButtonTheme = "primary";

const props = withDefaults(
  defineProps<{
    text?: string;
    theme?: ButtonTheme;
    disabled?: boolean;
  }>(),
  {
    text: "click me",
    theme: "primary",
    disabled: false,
  },
);
</script>

<template>
  <button :class="[props.theme]" :disabled="disabled" type="button">
    <slot>{{ text }}</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply border-none outline-none bg-transparent cursor-pointer transition duration-200;
  @apply hover:underline hover:decoration-1;

  &.primary {
    @apply text-sm text-primary-400;
    @apply hover:text-primary-200;
    @apply disabled:text-gray-600/75 disabled:cursor-not-allowed;
  }
}
</style>
