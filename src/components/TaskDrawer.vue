<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import TaskCategoryFolder from "@/components/common/TaskCategoryFolder.vue";
import TaskCategoryFolderNew from "@/components/common/TaskCategoryFolderNew.vue";
import TaskCard from "@/components/common/TaskCard.vue";
import ButtonNormal from "@/components/basic/ButtonNormal.vue";
import TaskFolderCreator from "@/components/TaskFolderCreator.vue";
import TaskCardCreator from "@/components/TaskCardCreator.vue";
import BlurMask from "@/components/common/BlurMask.vue";
import DialogModal from "./basic/DialogModal.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const taskStore = useTaskStore();
const selectedCategory = ref<TaskCategory>();
const editingCategory = ref<TaskCategory>();
const editingTask = ref<Task>();

const selectCategory: (category: TaskCategory) => void = (category) => {
  selectedCategory.value = category;
  taskStore._actFetchTaskList(category.id);
};

const isFolderCreatorShow = ref<boolean>(false);
const addNewCategory: () => void = () => {
  editingCategory.value = undefined;
  isFolderCreatorShow.value = true;
};
const editCategory: () => void = () => {
  if (!selectedCategory.value) return;
  editingCategory.value = selectedCategory.value;
  isFolderCreatorShow.value = true;
};

const isDeleteCheckDialogShow = ref<boolean>(false);
const deleteCategory: () => void = async () => {
  if (!selectedCategory.value) return;
  await taskStore._actDeleteTaskCategory(selectedCategory.value.id);
  isDeleteCheckDialogShow.value = false;
  selectedCategory.value = undefined;
};

const isCardCreatorShow = ref<boolean>(false);
const addNewTask: () => void = () => {
  editingTask.value = undefined;
  isCardCreatorShow.value = true;
};
// const editTask: () => void = () => {
//   if (!selectedCategory.value) return;
//   editingTask.value = selectedCategory.value;
//   isFolderCreatorShow.value = true;
// };

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
        <TaskCategoryFolderNew class="first:mt-7" @click="addNewCategory" />
        <template v-if="taskStore.categories.length">
          <TaskCategoryFolder
            v-for="(cate, index) in taskStore.categories"
            :key="index"
            :task-category="cate"
            class="-mt-[90px]"
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

    <Transition name="collapse-down">
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
          <div class="flex justify-between pt-5 px-3">
            <ButtonNormal
              :width="90"
              :height="25"
              theme="darker"
              class="font-bold text-sm"
              @press="isDeleteCheckDialogShow = true"
            >
              <span class="text-xs text-white">刪除群組</span>
            </ButtonNormal>
            <ButtonNormal
              :width="90"
              :height="25"
              theme="normal"
              class="font-bold text-sm"
              @press="editCategory"
            >
              <span class="text-xs text-darker">編輯群組</span>
            </ButtonNormal>
          </div>
          <div class="pt-2 pb-5 px-3">
            <ButtonNormal
              :width="194"
              :height="35"
              theme="confirm"
              class="font-bold text-sm"
              @press="addNewTask"
            >
              <span class="text-lg">新增任務</span>
            </ButtonNormal>
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
      <Transition name="fade">
        <BlurMask
          v-if="isFolderCreatorShow"
          class="justify-center items-center"
        >
          <TaskFolderCreator
            :editing-category="editingCategory"
            @close="
              [(isFolderCreatorShow = false), (editingCategory = undefined)]
            "
          />
        </BlurMask>
      </Transition>

      <Transition name="fade">
        <BlurMask
          v-if="selectedCategory && isCardCreatorShow"
          class="justify-center items-center"
        >
          <TaskCardCreator
            :category="selectedCategory"
            :editing-task="editingTask"
            @close="[(isCardCreatorShow = false), (editingTask = undefined)]"
          />
        </BlurMask>
      </Transition>
    </teleport>

    <DialogModal
      :show="isDeleteCheckDialogShow"
      title="確定刪除任務群組？"
      :theme="'warning'"
      content="注意：任務群組中的任務卡片均會一併刪除。"
      rightBtnType="negative"
      rightBtnText="刪除"
      leftBtnType="normal"
      leftBtnText="取消"
      @right="deleteCategory"
      @left="isDeleteCheckDialogShow = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/animation.scss";
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
</style>
