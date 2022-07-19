<script setup lang="ts">
import type { Task } from "@/class/Task";
import TaskCard from "./TaskCard.vue";

defineProps<{
  task?: Task;
}>();
</script>

<template>
  <div
    class="punch-machine relative w-[264px] h-[350px] rounded-3xl bg-gray-300"
  >
    <TaskCard v-if="task" :task="task" class="absolute -top-5 left-8" />

    <div
      class="punch-machine__front relative z-10 flex justify-between flex-col full bg-slate-200 rounded-3xl overflow-hidden"
    >
      <div class="bg-gray-300 rounded-b-[20%] pb-8" />
      <div class="bg-gray-400 pb-6" />
    </div>

    <div
      class="punch-machine__shadow border-4 border-gray-200 rounded-xl shadow-inner shadow-black/50"
    />
  </div>
</template>

<style lang="scss" scoped>
.punch-machine {
  &__front {
    clip-path: polygon(
      0% 16px,
      0% 100%,
      44px 100%,
      44px 68px,
      220px 68px,
      220px 168px,
      44px 168px,
      44px 100%,
      100% 100%,
      100% 16px
    );
  }

  &__shadow {
    position: absolute;
    top: 64px;
    left: 40px;
    z-index: 10;
    width: 184px;
    height: 108px;
  }
}
</style>
