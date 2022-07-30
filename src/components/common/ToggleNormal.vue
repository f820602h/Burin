<script setup lang="ts">
withDefaults(defineProps<{ modelValue?: boolean; disabled?: boolean }>(), {
  modelValue: false,
  disabled: false,
});

defineEmits<{ (e: "update:modelValue", checked: boolean): void }>();
</script>

<template>
  <button
    class="w-13 rounded-lg bg-stone-300 shadow-inner-md shadow-black/30 transition-all duration-100"
    :class="modelValue ? 'pl-5' : ''"
    :disabled="disabled"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div class="w-8 h-5 p-0 rounded-lg bg-stone-400 shadow-sm shadow-black/30">
      <div class="full rounded-lg bg-stone-200 -translate-y-1">
        <div class="flex justify-between full px-2 py-[5px]">
          <div
            v-for="i in 3"
            :key="i"
            class="w-[2px] h-full bg-black/20 rotate-[10deg]"
          />
        </div>
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply disabled:cursor-not-allowed;
  background: linear-gradient(
      to right,
      theme("colors.green.400") 50%,
      theme("colors.stone.300") 50%
    ),
    50%;
}
</style>
