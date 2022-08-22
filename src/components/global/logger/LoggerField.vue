<script setup lang="ts">
import VerifyInput from "../../basic/VerifyInput.vue";

withDefaults(defineProps<{ label: string }>(), { label: "" });
</script>

<template>
  <div class="text-sm mb-1">{{ label }}</div>
  <VerifyInput v-bind="$attrs">
    <template #error="{ errorMessage, meta }">
      <div class="text-xs text-right min-h-4 mt-1">
        <template v-if="errorMessage && meta.touched">
          {{ errorMessage }}
        </template>
      </div>
    </template>
  </VerifyInput>
</template>

<style scoped lang="scss">
:deep(input) {
  @apply w-full text-sm px-2 py-1 border-[1px] border-[#13fc5c] bg-transparent focus-visible:outline-none;
}
</style>
