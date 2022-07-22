<script setup lang="ts">
import ToggleBase from "./common/ToggleBase.vue";
</script>

<template>
  <div
    class="alarm-machine relative w-[264px] pb-5 rounded-3xl shadow-md shadow-black/50"
  >
    <div class="bg-white p-6 rounded-2xl overflow-hidden">
      <ToggleBase class="mb-3" />

      <div
        class="horn h-8 p-2 rounded-full shadow-inner shadow-black/10 overflow-hidden"
      >
        <div v-for="i in 3" :key="i" class="flex-center-center w-full mb-1">
          <div
            v-for="j in 1 - Math.abs(2 - i) + 16"
            :key="j"
            class="flex-shrink-0 w-1 h-1 mx-1 rounded-full bg-zinc-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alarm-machine {
  background: linear-gradient(
    to top,
    theme("colors.gray.300") 50px,
    theme("colors.white") 50px
  );
}

.horn {
  background: linear-gradient(
    to bottom,
    theme("colors.gray.200"),
    theme("colors.white")
  );
}
</style>
