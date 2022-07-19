<script setup lang="ts">
import { BackgroundColor } from "@/class/BackgroundColor";
import { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import { onMounted } from "vue";
import TaskCard from "@/components/TaskCard.vue";
import PunchMachine from "../components/PunchMachine.vue";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.addTask({
    id: "123",
    category: new TaskCategory({
      name: "工作",
      color: new BackgroundColor("#355C7D", "#6C5B7B", "#C06C84"),
    }),
    task: "功能開發",
    addition: {
      content: "不具有初始化函式並且之前的列舉成員是常數",
      isLink: false,
    },
    lastUseDate: new Date().getTime(),
    lastUseSpendTime: 1000 * 60 * 59,
  });
});
</script>

<template>
  <!-- :style="{ background: taskStore.tasks[0].category.color.styleText }" -->
  <div class="home-view flex h-screen bg-gray-800">
    <aside class="h-full bg-white/10 shadow-xl px-4 py-5">
      <div v-for="(task, index) in taskStore.tasks" :key="index">
        <TaskCard :task="task" />
      </div>
    </aside>
    <main class="flex-1 flex justify-center items-center">
      <PunchMachine :task="taskStore.tasks[0]" />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
