<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import TaskCategoryFolder from "@/components/common/TaskCategoryFolder.vue";
import TaskCard from "@/components/common/TaskCard.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";
import FolderCreator from "./FolderCreator.vue";
import BlurMask from "@/components/common/BlurMask.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const isFolderCreatorShow = ref<boolean>(false);

const taskStore = useTaskStore();
const selectedCategory = ref<TaskCategory>();
const editingCategory = ref<TaskCategory>();

const selectCategory: (category: TaskCategory) => void = (category) => {
  selectedCategory.value = category;
  taskStore._actFetchTaskList(category.id);
};

const editCategory: () => void = () => {
  if (!selectedCategory.value) return;
  editingCategory.value = selectedCategory.value;
  isFolderCreatorShow.value = true;
};

const deleteCategory: () => void = () => {
  if (!selectedCategory.value) return;
  taskStore._actDeleteTaskCategory(selectedCategory.value.id);
};

const setCurrentTask: (task: Task) => void = (task) => {
  taskStore._actUpdateCurrentTask(task);
  selectedCategory.value = undefined;
  emit("close");
};
</script>

<template>
  <div class="task-drawer">
    <div
      class="absolute top-5 right-0 pb-2 rounded-r-md bg-[#323238] shadow-md shadow-light translate-x-full"
    >
      <div
        class="px-2 py-[6px] border-4 border-l-0 border-zinc-700 rounded-r-md bg-zinc-700 shadow-inner-sm"
      >
        <ButtonNormal
          :width="32"
          theme="cancel"
          :circle="true"
          @press="[(selectedCategory = undefined), $emit('close')]"
        >
          <span class="icon-cancel text-white/75"></span>
        </ButtonNormal>
      </div>
    </div>

    <div class="task-drawer__drawer">
      <div class="folders">
        <template v-if="taskStore.categories.length">
          <TaskCategoryFolder
            v-for="(cate, index) in taskStore.categories"
            :key="index"
            :task-category="cate"
            class="-mt-[80px] first:mt-7"
            @click="selectCategory(cate)"
          />
        </template>
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

    <Transition name="tray-collapse">
      <div v-if="selectedCategory" class="task-drawer__tray">
        <div
          class="absolute top-[90px] right-0 pb-2 rounded-r-md bg-gray-400 shadow-md shadow-light translate-x-full"
        >
          <div
            class="px-2 py-[6px] border-4 border-l-0 border-gray-300 rounded-r-md bg-gray-300 shadow-inner-sm"
          >
            <ButtonNormal
              :width="32"
              theme="cancel"
              :circle="true"
              @press="selectedCategory = undefined"
            >
              <span class="icon-cancel text-white/75"></span>
            </ButtonNormal>
          </div>
        </div>

        <div class="cards">
          <div class="flex justify-evenly py-5">
            <ButtonNormal
              :width="90"
              theme="cancel"
              text="刪除群組"
              class="font-bold text-sm"
              @press="deleteCategory"
            />
            <ButtonNormal
              :width="90"
              theme="confirm"
              text="編輯群組"
              class="font-bold text-sm"
              @press="editCategory"
            />
          </div>

          <template v-if="taskStore.tasks.length">
            <TaskCard
              v-for="(task, index) in taskStore.tasks"
              :key="index"
              :task="task"
              class="mx-auto mb-3 cursor-pointer last:mb-0"
              @click="setCurrentTask(task)"
            />
          </template>
        </div>
        <div class="handle" />
      </div>
    </Transition>

    <teleport to="#app > .root">
      <Transition name="creator-fade">
        <BlurMask
          v-if="isFolderCreatorShow"
          class="justify-center items-center"
        >
          <FolderCreator
            :editing-category="editingCategory"
            @close="
              [(isFolderCreatorShow = false), (editingCategory = undefined)]
            "
          />
        </BlurMask>
      </Transition>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.task-drawer {
  @apply relative min-w-[260px] h-full;

  &__drawer {
    @apply relative flex flex-col h-full bg-zinc-700;

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
      @apply flex-1 pb-4 border-x-8 border-gray-300 bg-gray-400 shadow-inner-md shadow-dark overflow-auto scrollbar-hide;
    }

    .handle {
      @apply h-12 border-t-24 border-gray-300 bg-gray-300 rounded-b-md shadow-inner-lg;
    }
  }
}

.creator-fade-enter-active,
.creator-fade-leave-active {
  @apply transition-opacity duration-500;

  > * {
    @apply transition-transform duration-500;
  }
}

.creator-fade-enter-from,
.creator-fade-leave-to {
  @apply opacity-0;

  > * {
    @apply -translate-y-10;
  }
}

.tray-collapse-enter-active,
.tray-collapse-leave-active {
  @apply transition-transform duration-500;
}

.tray-collapse-enter-from,
.tray-collapse-leave-to {
  @apply -translate-y-full;
}
</style>
