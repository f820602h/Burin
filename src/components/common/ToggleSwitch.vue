<script setup lang="ts">
import SliderKnob from "./SliderKnob.vue";
withDefaults(defineProps<{ modelValue?: boolean; disabled?: boolean }>(), {
  modelValue: false,
  disabled: false,
});

defineEmits<{ (e: "update:modelValue", checked: boolean): void }>();
</script>

<template>
  <button
    class="toggle-switch"
    :class="modelValue ? 'pl-5' : ''"
    :disabled="disabled"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <SliderKnob />
  </button>
</template>

<style lang="scss" scoped>
.toggle-switch {
  background: linear-gradient(
    to right,
    theme("colors.green.400") 50%,
    theme("colors.stone.300") 50%
  );

  @apply w-13 rounded-lg bg-stone-300 shadow-inner-md shadow-light transition-all duration-100 disabled:cursor-not-allowed;
}
</style>
