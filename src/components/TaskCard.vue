<script setup lang="ts">
import type { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import { computed } from "vue";

const props = defineProps<{
  task: Task;
}>();

const taskStore = useTaskStore();
const category = computed<TaskCategory>(() => {
  return (
    taskStore.categories.find((cate) => cate.id === props.task.categoryId) ||
    taskStore.defaultCategory
  );
});
</script>

<template>
  <div
    class="task-card"
    :style="{ background: category.getColor().styleString }"
  >
    <div class="task-card__header">
      <p class="font-bold text-white pb-[3px] border-b border-white/50">
        {{ category.name }}
      </p>
    </div>
    <div class="pt-2 pb-2">
      <div class="flex justify-between text-white/80 text-xs mb-1">
        <span>上次插卡時間：</span><span>{{ task.getLastUseDateText() }}</span>
      </div>
      <div class="flex justify-between text-white/80 text-xs">
        <span>上次花費時間：</span
        ><span>{{ task.getLastDurationTimeText() }}</span>
      </div>
    </div>
    <div class="flex-1">
      <div
        class="flex flex-col justify-center items-center h-full bg-white rounded-md p-3"
      >
        <div class="text-xl font-bold text-center">{{ task.title }}</div>
        <div class="text-xs text-center mt-2">{{ task.addition.content }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  @apply flex flex-col w-[200px] h-[200px] px-3 pt-2 pb-3 rounded-md shadow-md shadow-light cursor-pointer;
}
</style>
