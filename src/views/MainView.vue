<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskCard from "@/components/TaskCard.vue";
import PunchCardMachine from "@/components/PunchCardMachine.vue";
import AlarmMachine from "@/components/AlarmMachine.vue";
import MonitorPanel from "@/components/MonitorPanel.vue";

const taskStore = useTaskStore();
</script>

<template>
  <!-- :style="{ background: taskStore.tasks[0].category.color.styleText }" -->

  <aside class="fixed top-0 left-0 h-full px-4 py-5 bg-white/10 shadow-xl">
    <div
      v-for="(task, index) in taskStore.tasks"
      :key="index"
      class="mt-4 first:mt-0"
    >
      <TaskCard :task="task" @click="taskStore.setCurrentTask(task)" />
    </div>
  </aside>

  <main class="flex-center-center flex-col h-screen bg-gray-700">
    <PunchCardMachine />

    <div class="usb-cable relative z-10 flex-center-center flex-col -mt-4">
      <div class="usb-cable__head">
        <div class="usb-cable__head-inner full" />
      </div>
      <div class="usb-cable__line" />
    </div>

    <AlarmMachine />
  </main>

  <div class="fixed bottom-0 left-0 w-full">
    <MonitorPanel />
  </div>
</template>

<style lang="scss" scoped>
.usb-cable {
  &__head {
    @apply w-10;
    @apply h-12;
    @apply pb-3;
    @apply rounded-b-lg;
    @apply bg-gray-300;
    @apply shadow-xl;
  }

  &__head-inner {
    @apply rounded-b-lg;
    @apply bg-gray-100;
    @apply shadow-inner-sm;
  }

  &__line {
    @apply w-3;
    @apply h-15;
    @apply -mt-2;
    @apply border;
    @apply border-gray-400/60;
    @apply rounded-t-3xl;
    @apply bg-gray-100;
    @apply shadow-inner-md-lighter;
  }
}
</style>
