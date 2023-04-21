<script setup lang="ts">
import VerifyInput from "../../basic/VerifyInput.vue";

withDefaults(defineProps<{ label: string; field: string }>(), { label: "" });
</script>

<template>
  <div class="text-sm mb-1">{{ label }}</div>
  <VerifyInput v-bind="$attrs" :field="field"></VerifyInput>
</template>

<style scoped lang="scss">
:deep(input) {
  @apply w-full text-sm px-2 py-1 border-[1px] border-[#13fc5c] bg-transparent focus-visible:outline-none;
}
</style>
