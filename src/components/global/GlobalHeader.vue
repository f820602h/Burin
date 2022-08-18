<script setup lang="ts">
defineEmits<{ (e: "open-logger"): void }>();
</script>

<template>
  <header
    ref="header"
    class="h-[55px] pt-2 pb-1 bg-[#131417] shadow-lg shadow-darkest"
  >
    <div class="flex-between-center h-full px-4">
      <span></span>
      <div class="text-white/75 text-[32px] cursor-pointer hover:text-white">
        <span class="icon-avatar" @click="$emit('open-logger')" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
