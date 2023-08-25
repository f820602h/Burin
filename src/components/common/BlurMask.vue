<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useBodyScrollFixed } from "@/composables/useBodyScrollFixed";

defineEmits<{ (e: "mask-close"): void }>();

const { fixed, reset } = useBodyScrollFixed();

onMounted(() => {
  fixed();
});

onUnmounted(() => {
  reset();
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-global-3 full min-w-[375px] flex bg-black/50"
    @click.self="$emit('mask-close')"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
