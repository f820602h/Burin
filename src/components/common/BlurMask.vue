<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useBodyScrollFixed } from "@/composables/useBodyScrollFixed";

withDefaults(defineProps<{ justifyContent?: string; alignItems?: string }>(), {
  justifyContent: "center",
  alignItems: "center",
});
const { fixed, reset } = useBodyScrollFixed();

onMounted(() => {
  fixed();
});

onUnmounted(() => {
  reset();
});
</script>

<template>
  <div class="fixed-layer bg-black/30 backdrop-blur-[2px] flex">
    <slot></slot>
  </div>
</template>

<style scoped></style>
