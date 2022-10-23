<script setup lang="ts"></script>

<template>
  <div class="task-category-folder relative group cursor-pointer">
    <div class="task-category-folder__tag">
      新增任務群組
      <div class="absolute -bottom-[3px] left-0 w-full h-1 bg-inherit"></div>
    </div>

    <div class="task-category-folder__back">
      <div class="task-category-folder__middle" />
    </div>

    <div class="task-category-folder__front" />
  </div>
</template>

<style lang="scss" scoped>
.task-category-folder {
  &__tag {
    @apply absolute -top-7 left-0 font-bold text-white px-3 pt-1 rounded-t-md bg-green-600 shadow-t-sm shadow-dark;
  }

  &__back {
    @apply w-[220px] h-[180px] pt-2 rounded-md rounded-tl-none bg-green-600 shadow-t-sm shadow-dark overflow-hidden;
  }

  &__middle {
    @apply w-[200px] h-[200px] mx-auto rounded-t-md border-2 border-white border-dashed transition-transform duration-200;
    @apply group-hover:rotate-3 bg-white/25;
  }

  &__front {
    @apply absolute bottom-0 left-0 w-full h-[150px] -mt-3 rounded-md bg-gray-300/50 shadow-t-md transition-transform duration-200;
    background: linear-gradient(
      160deg,
      theme("colors.green.600") 30%,
      theme("colors.green.800")
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
