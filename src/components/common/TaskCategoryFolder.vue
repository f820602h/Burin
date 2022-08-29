<script setup lang="ts">
import type { TaskCategory } from "@/class/TaskCategory";

defineProps<{ taskCategory: TaskCategory }>();
</script>

<template>
  <div class="task-category-folder relative group cursor-pointer">
    <div class="task-category-folder__tag">
      {{ taskCategory.name }}
      <div class="absolute -bottom-[3px] left-0 w-full h-1 bg-inherit"></div>
    </div>

    <div class="task-category-folder__back">
      <div
        class="task-category-folder__middle"
        :style="{ background: taskCategory.getColor().styleString }"
      />
    </div>

    <div class="task-category-folder__front" />
  </div>
</template>

<style lang="scss" scoped>
.task-category-folder {
  &__tag {
    @apply absolute -top-7 left-0 font-bold text-white px-3 pt-1 rounded-t-md bg-gray-700 shadow-t-sm shadow-dark;
  }

  &__back {
    @apply w-[220px] h-[180px] pt-2 rounded-md rounded-tl-none bg-gray-700 shadow-t-sm shadow-dark overflow-hidden;
  }

  &__middle {
    @apply w-[200px] h-[200px] mx-auto rounded-t-md shadow-t-sm shadow-light transition-transform duration-200;
    @apply group-hover:rotate-3;
  }

  &__front {
    @apply absolute bottom-0 left-0 w-full h-[150px] -mt-3 rounded-md  shadow-t-md transition-transform duration-200;
    background: linear-gradient(
      160deg,
      theme("colors.gray.600") 30%,
      theme("colors.gray.800")
    );
    transform-origin: 50% 100%;
    transform: perspective(1000px) rotateX(-18deg);
  }

  &:hover {
    .task-category-folder__front {
      transform: perspective(1000px) rotateX(-25deg);
    }
  }
}
</style>
