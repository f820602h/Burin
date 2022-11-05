<script setup lang="ts">
import { ref, toRef, computed, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { taskCardFieldValidation } from "@/system/fieldValidation";
import { Task } from "@/class/Task";
import type { TaskCategory } from "@/class/TaskCategory";
import { useTaskStore } from "@/stores/task";
import TaskCard from "./common/TaskCard.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import ButtonNormal from "./basic/ButtonNormal.vue";

const props = withDefaults(
  defineProps<{ category: TaskCategory; editingTask?: Task }>(),
  { editingTask: undefined }
);
const emit = defineEmits<{ (e: "close"): void }>();

const isUrl = ref<boolean>(false);
watch(isUrl, (value) => {
  if (!value) formValue.additionUrl = "";
});

const refEditingTask = toRef(props, "editingTask");
const { values: formValue, handleSubmit } = useForm({
  validationSchema: object({
    title: taskCardFieldValidation.title,
    additionContent: taskCardFieldValidation.additionContent,
    additionUrl: taskCardFieldValidation.additionUrl,
  }),
  initialValues: {
    title: refEditingTask.value ? refEditingTask.value.title : "",
    additionContent: refEditingTask.value
      ? refEditingTask.value.additionContent
      : "",
    additionUrl: refEditingTask.value ? refEditingTask.value.additionUrl : "",
  },
});

const taskStore = useTaskStore();
const confirmHandler = handleSubmit(async (values) => {
  console.log(123);
  if (props.editingTask) {
    await taskStore._actUpdateTask({ ...props.editingTask, ...values });
  } else {
    await taskStore._actCreateTask({
      ...values,
      categoryId: props.category.id,
    });
  }
  emit("close");
});

const demoTask = computed<Task>(
  () =>
    new Task({
      id: 0,
      categoryId: props.category.id,
      title: formValue.title || "",
      additionContent: formValue.additionContent || "",
      additionUrl: formValue.additionUrl || "",
      lastStartTimestamp: 0,
      lastEndTimestamp: 0,
      createTimestamp: 0,
      updateTimestamp: 0,
    })
);
</script>

<template>
  <div>
    <div class="clipboard pb-1 rounded-md bg-stone-700 shadow-xl">
      <div class="relative px-4 pb-5 rounded-md bg-stone-600">
        <div class="iron-sheet">
          <div class="flex-between-center h-full px-5">
            <div class="screw"></div>
            <div class="screw"></div>
          </div>
        </div>
        <div class="clip" />

        <div class="paper">
          <div class="text-center text-xl font-bold mb-3">任務卡片申請</div>

          <div
            class="relative flex-center-center w-[220px] h-[220px] mx-auto mb-5 border-2 border-dark border-dashed rounded-md"
          >
            <div
              class="absolute -top-2 right-2 w-5 h-10 bg-white/50 -rotate-45"
            />
            <TaskCard :task="demoTask" :category="category" />
            <div
              class="absolute -bottom-2 left-2 w-5 h-10 bg-white/50 -rotate-45"
            />
          </div>

          <div class="flex items-start mb-1">
            <label for="title" class="term">任務標題：</label>
            <VerifyInput
              name="title"
              type="text"
              placeholder="請填寫"
              class="w-full mx-1"
            >
              <template #error="{ errorMessage, meta }">
                <div class="text-xs text-right text-red-600 min-h-4 mt-1">
                  <template v-if="errorMessage && meta.touched">
                    {{ errorMessage }}
                  </template>
                </div>
              </template>
            </VerifyInput>
          </div>

          <div class="flex items-start mb-1">
            <label for="additionContent" class="term">任務描述：</label>
            <VerifyInput
              name="additionContent"
              type="text"
              placeholder="請填寫"
              class="w-full mx-1"
            >
              <template #error="{ errorMessage, meta }">
                <div class="text-xs text-right text-red-600 min-h-4 mt-1">
                  <template v-if="errorMessage && meta.touched">
                    {{ errorMessage }}
                  </template>
                </div>
              </template>
            </VerifyInput>
          </div>

          <div class="flex items-start mb-1">
            <input
              v-model="isUrl"
              id="isUrl"
              type="checkbox"
              class="invisible w-0 h-0"
            />
            <label for="isUrl" class="url-checkbox"></label>

            <label
              for="additionUrl"
              class="term"
              :class="{ 'text-gray-500': !isUrl }"
            >
              任務連結：
            </label>
            <VerifyInput
              name="additionUrl"
              type="text"
              :placeholder="isUrl ? '請填寫' : '如需設定請先勾選'"
              :disabled="!isUrl"
              class="w-full mx-1"
            >
              <template #error="{ errorMessage, meta }">
                <div class="text-xs text-right text-red-600 min-h-4 mt-1">
                  <template v-if="errorMessage && meta.touched">
                    {{ errorMessage }}
                  </template>
                </div>
              </template>
            </VerifyInput>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex-center-center mt-2">
      <div class="mx-2 pb-2 rounded-md bg-zinc-400 shadow-md">
        <div class="p-2 pt-1 rounded-md bg-zinc-200">
          <ButtonNormal
            theme="cancel"
            text="取消"
            :width="100"
            :height="35"
            class="font-bold"
            @press="$emit('close')"
          />
          <ButtonNormal
            theme="confirm"
            :text="editingTask ? '更新' : '新增'"
            :width="100"
            :height="35"
            class="font-bold ml-3"
            @press="confirmHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iron-sheet {
  @apply relative -top-1 w-[150px] h-10 mx-auto border-4 border-slate-500 rounded-t-xl rounded-b-md bg-slate-500 shadow-inner-sm;

  .screw {
    @apply w-4 h-4 rounded-full bg-slate-600;
  }
}

.paper {
  @apply relative w-[322px] h-[465px] mx-auto -mt-5 px-10 pt-4 pb-15 rounded-bl-[25px] bg-stone-200 shadow-sm overflow-hidden;

  &::after {
    content: "";
    @apply absolute bottom-0 left-0 z-10 w-6 h-6 bg-stone-200 shadow-t-sm shadow-darker;
  }

  .term {
    @apply flex-shrink-0 text-sm font-bold w-[70px];
  }

  :deep(input) {
    @apply text-sm px-1 border-b-[1px] border-black bg-transparent focus-visible:outline-none;

    &:disabled {
      @apply border-gray-500;
    }
  }

  .url-checkbox {
    @apply relative flex-shrink-0 w-4 h-4 mr-1 mt-[2px] border border-gray-500 rounded-sm cursor-pointer;
  }

  input:checked {
    + .url-checkbox::after {
      @apply content-[""] absolute -top-[2px] left-0 w-4 h-2 border-b-2 border-l-2 border-black -rotate-45 -skew-y-12;
    }
  }
}

.clip {
  @apply absolute top-1 left-1/2 z-1 w-[135px] h-8 border-4 border-t-0 rounded-b-lg border-slate-500 shadow-sm shadow-lighter -translate-x-1/2;
}
</style>
