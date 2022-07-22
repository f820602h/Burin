<script setup lang="ts">
import type { Task } from "@/class/Task";

defineProps<{
  task: Task;
}>();
</script>

<template>
  <div
    class="task-card flex flex-col w-[200px] h-[200px] px-3 pt-2 pb-3 rounded-md shadow-md shadow-black/30"
    :style="{ background: task.category.color.styleText }"
  >
    <div class="task-card__header">
      <p class="font-bold text-white pb-[3px] border-b border-white/50">
        {{ task.category.name }}
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

<style lang="scss" scoped></style>
