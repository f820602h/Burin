<script setup lang="ts">
import type { Task } from "@/class/Task";
import { dateFormatter } from "@/helper/dateFormatter";
import { spendTimeFormatter } from "@/helper/spendTimeFormatter";
import { computed } from "vue";

const props = defineProps<{
  task: Task;
}>();

const lastUseDateText = computed(() => {
  return dateFormatter(props.task.lastUseDate, {
    year: undefined,
    hour12: false,
    second: undefined,
  });
});

const lastUseSpendTimeText = computed(() => {
  return spendTimeFormatter(props.task.lastUseSpendTime);
});
</script>

<template>
  <div
    class="task-card flex flex-col w-[200px] h-[200px] rounded-md px-3 pt-2 pb-3 shadow-md shadow-black/30"
    :style="{ background: task.category.color.styleText }"
  >
    <div class="task-card__header">
      <p class="font-bold text-white pb-[3px] border-b border-white/50">
        {{ task.category.name }}
      </p>
    </div>
    <div class="pt-2 pb-2">
      <div class="flex justify-between text-white/80 text-xs mb-1">
        <span>上次開始時間：</span><span>{{ lastUseDateText }}</span>
      </div>
      <div class="flex justify-between text-white/80 text-xs">
        <span>上次花費時間：</span><span>{{ lastUseSpendTimeText }}</span>
      </div>
    </div>
    <div class="flex-1">
      <div
        class="flex flex-col justify-center items-center h-full bg-white rounded-md p-3"
      >
        <div class="text-xl font-bold text-center">{{ task.task }}</div>
        <div class="text-xs text-center mt-2">{{ task.addition.content }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
