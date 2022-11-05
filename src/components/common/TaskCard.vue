<script setup lang="ts">
import type { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import { computed } from "vue";

const props = defineProps<{ task: Task; category?: TaskCategory }>();

const taskStore = useTaskStore();
const category = computed<TaskCategory>(() => {
  return (
    props.category ||
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
    <div class="task-card__body flex-1">
      <div
        class="flex flex-col justify-center items-center h-full bg-white rounded-md p-3"
      >
        <div class="task-card__body__title">{{ task.title }}</div>
        <div class="task-card__body__content">
          <template v-if="!task.additionUrl">
            <span>{{ task.additionContent }}</span>
          </template>
          <template v-else>
            <a
              :href="task.additionUrl"
              target="_blank"
              class="text-blue-700 underline"
              @click.stop
            >
              {{ task.additionContent }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
.task-card {
  @apply flex flex-col w-[200px] h-[200px] px-3 pt-2 pb-3 rounded-md shadow-md shadow-light;

  &__body {
    &__title {
      @apply text-xl font-bold text-center;
      @include text-overflow(28, 1);
    }

    &__content {
      @apply text-xs text-center mt-2;
      @include text-overflow(32, 2);
    }
  }
}
</style>
