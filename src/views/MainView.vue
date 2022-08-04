<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useTaskStore } from "@/stores/task";
import TaskCard from "@/components/TaskCard.vue";
import PunchCardMachine from "@/components/PunchCardMachine.vue";
import AlarmMachine from "@/components/AlarmMachine.vue";
import MonitorPanel from "@/components/MonitorPanel.vue";

const taskStore = useTaskStore();

onBeforeMount(() => {
  taskStore._actFetchTaskCategoryData();
  taskStore._actFetchTaskData();
});
</script>

<template>
  <aside class="fixed top-0 left-0 h-full px-4 py-5 bg-white/10 shadow-xl">
    <div
      v-for="(task, index) in taskStore.tasks"
      :key="index"
      class="mt-4 first:mt-0"
    >
      <TaskCard :task="task" @click="taskStore._actUpdateCurrentTask(task)" />
    </div>
  </aside>

  <main
    class="flex-center-center flex-col h-screen bg-gray-700"
    :style="{ background: taskStore.currentTaskCategory.color.styleString }"
  >
    <PunchCardMachine />

    <div class="usb-cable relative z-10 flex-center-center flex-col -mt-4 sm">
      <div class="usb-cable__head">
        <div class="usb-cable__head-inner full" />
      </div>
      <div class="usb-cable__line" />
    </div>

    <AlarmMachine />
  </main>

  <MonitorPanel />
</template>

<style lang="scss" scoped>
.usb-cable {
  &__head {
    @apply w-10 h-12 pb-3 rounded-b-lg bg-gray-300 shadow-xl;
  }

  &__head-inner {
    @apply rounded-b-lg bg-gray-100 shadow-inner-sm;
  }

  &__line {
    @apply w-3 h-15 -mt-2 border border-gray-400/60 rounded-t-3xl bg-gray-100 shadow-inner-md-lighter;
  }
}
</style>
