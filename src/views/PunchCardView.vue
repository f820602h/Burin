<script setup lang="ts">
import { useTaskStore } from "@/stores/task";
import TaskCard from "@/components/TaskCard.vue";
import PunchCardMachine from "@/components/PunchCardMachine.vue";
import AlarmMachine from "@/components/AlarmMachine.vue";

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
        <div class="relative z-10">
          <div
            class="w-10 h-12 -mt-4 mx-auto pb-3 rounded-b-lg bg-gray-300 shadow-md"
          >
            <div
              class="full rounded-b-lg bg-gray-100 shadow-inner-sm shadow-black/30"
            />
          </div>
          <div
            class="w-3 h-15 -mt-2 mx-auto border border-gray-400/60 rounded-t-3xl bg-gray-100 shadow-inner-md shadow-gray-300"
          />
        </div>
        <AlarmMachine />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
