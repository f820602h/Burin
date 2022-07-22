<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskCard from "@/components/TaskCard.vue";
import PunchCardMachine from "../components/PunchCardMachine.vue";
import AlarmMachine from "../components/AlarmMachine.vue";

const taskStore = useTaskStore();
</script>

<template>
  <!-- :style="{ background: taskStore.tasks[0].category.color.styleText }" -->
  <div class="home-view flex h-screen bg-gray-700">
    <aside class="h-full bg-white/10 shadow-xl px-4 py-5">
      <div
        v-for="(task, index) in taskStore.tasks"
        :key="index"
        class="mt-4 first:mt-0"
      >
        <TaskCard :task="task" @click="taskStore.setCurrentTask(task)" />
      </div>
    </aside>
    <main class="flex-1 flex justify-center items-center">
      <div>
        <PunchCardMachine class="mx-auto" />
        <AlarmMachine class="mt-8" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
