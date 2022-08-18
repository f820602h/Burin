<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useTaskStore } from "@/stores/task";
import type { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import TaskCategoryFolder from "@/components/common/TaskCategoryFolder.vue";
import TaskCard from "@/components/common/TaskCard.vue";

withDefaults(defineProps<{ show?: boolean }>(), {
  show: false,
});

const emit = defineEmits<{ (e: "close"): void }>();

const taskStore = useTaskStore();
const selectedCategory = ref<TaskCategory>();

onBeforeMount(() => {
  taskStore._actFetchTaskCategoryData();
  taskStore._actFetchTaskData();
});

const setCurrentTask: (task: Task) => void = (task) => {
  taskStore._actUpdateCurrentTask(task);
  selectedCategory.value = undefined;
  emit("close");
};
</script>

<template>
  <Transition name="collapse">
    <div v-if="show" class="fixed-layer flex bg-black/30 backdrop-blur-[2px]">
      <div class="task-drawer">
        <div class="task-drawer__drawer">
          <div class="folders">
            <TaskCategoryFolder
              v-for="(cate, index) in taskStore.categories"
              :key="index"
              :task-category="cate"
              class="-mt-[80px] first:mt-7"
              @click="selectedCategory = cate"
            />
          </div>
          <div class="task-drawer__door">
            <div class="tag">
              <div class="full bg-white shadow-inner-sm shadow-darkest" />
            </div>
            <div class="handle">
              <div class="w-full h-2 rounded-md bg-zinc-400 shadow-sm" />
            </div>
          </div>
        </div>

        <Transition name="collapse-tray">
          <div v-if="selectedCategory" class="task-drawer__tray">
            <div class="cards">
              <TaskCard
                v-for="(task, index) in taskStore.tasks"
                :key="index"
                :task="task"
                class="mx-auto mb-3 last:mb-0"
                @click="setCurrentTask(task)"
              />
            </div>
            <div class="handler" />
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.task-drawer {
  @apply relative h-full;

  &__drawer {
    @apply flex flex-col h-full bg-zinc-700;

    .folders {
      @apply flex-1 min-h-full md:min-h-0 -mb-[80px] pt-4 px-3 border-x-8 border-zinc-700 shadow-inner-md overflow-auto scrollbar-hide;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.25) 50px,
        rgba(0, 0, 0, 0.25) 160px,
        rgba(0, 0, 0, 0.4) 160px
      );
    }
  }

  &__door {
    @apply relative z-1 flex-shrink-0 w-full h-[170px] pt-7 border-8 border-transparent rounded-md bg-zinc-500 shadow-inner-sm;

    .tag {
      @apply w-[100px] h-10 mx-auto mb-9 border-[6px] border-zinc-400 rounded-md shadow-sm;
    }

    .handle {
      @apply relative w-[160px] px-5 py-2 mx-auto shadow-inner-md rounded-md bg-black/10;
    }
  }

  &__tray {
    height: calc(100% - 90px);
    @apply absolute top-0 left-1/2 flex flex-col w-[90%] -translate-x-1/2;
    @media (min-width: theme("screens.md")) {
      height: calc(100% - 180px);
    }

    .cards {
      @apply flex-1 py-4 border-x-8 border-gray-300 bg-gray-400 shadow-inner-md shadow-dark overflow-auto scrollbar-hide;
    }

    .handler {
      @apply h-12 border-t-24 border-gray-300 bg-gray-300 rounded-b-md shadow-inner-lg;
    }
  }
}

.collapse-enter-active,
.collapse-leave-active {
  @apply transition-opacity duration-500;

  :deep(.task-drawer) {
    @apply transition-transform duration-500;
  }
}

.collapse-enter-from,
.collapse-leave-to {
  @apply opacity-0;

  :deep(.task-drawer) {
    @apply -translate-y-full;
  }
}

.collapse-tray-enter-active,
.collapse-tray-leave-active {
  @apply transition-transform duration-500;
}

.collapse-tray-enter-from,
.collapse-tray-leave-to {
  @apply -translate-y-full;
}
</style>
