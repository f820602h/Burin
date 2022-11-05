<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useBodyScrollFixed } from "@/composables/useBodyScrollFixed";

const { fixed, reset } = useBodyScrollFixed();

onMounted(() => {
  fixed();
});

onUnmounted(() => {
  reset();
});
</script>

<template>
  <div class="fixed-layer bg-black/40 flex">
    <slot></slot>
  </div>
</template>

<style scoped></style>
