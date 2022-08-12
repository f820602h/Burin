<script setup lang="ts">
import GlobalHeader from "../components/global/GlobalHeader.vue";
</script>

<template>
  <div class="root flex flex-col w-full min-h-screen">
    <div class="header-container flex-shrink-0">
      <GlobalHeader />
    </div>
    <div class="view-container relative flex-1 flex">
      <div class="view-wrapper w-full">
        <router-view />
      </div>
    </div>
    <div class="footer-container"></div>
  </div>
</template>

<style scoped></style>
