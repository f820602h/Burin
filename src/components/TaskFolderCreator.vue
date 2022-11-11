<script setup lang="ts">
import { computed, toRef } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { taskCategoryColors } from "@/system/taskCategoryColors";
import { taskCategoryFieldValidation } from "@/system/fieldValidation";
import { Color } from "@/class/Color";
import { Task } from "@/class/Task";
import { TaskCategory } from "@/class/TaskCategory";
import {
  NColorPicker,
  NConfigProvider,
  type GlobalThemeOverrides,
} from "naive-ui";
import { useTaskStore } from "@/stores/task";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import TaskCard from "./common/TaskCard.vue";
import ButtonNormal from "./basic/ButtonNormal.vue";

const props = withDefaults(defineProps<{ editingCategory?: TaskCategory }>(), {
  editingCategory: undefined,
});
const emit = defineEmits<{ (e: "close"): void }>();

const refEditingCategory = toRef(props, "editingCategory");
const {
  values: formValue,
  handleSubmit,
  useFieldModel,
} = useForm({
  validationSchema: object({
    name: taskCategoryFieldValidation.name,
    startColor: taskCategoryFieldValidation.startColor,
    endColor: taskCategoryFieldValidation.endColor,
  }),
  initialValues: {
    name: refEditingCategory.value ? refEditingCategory.value.name : "",
    startColor: refEditingCategory.value
      ? refEditingCategory.value.startColor
      : taskCategoryColors.red.start,
    endColor: refEditingCategory.value
      ? refEditingCategory.value.endColor
      : taskCategoryColors.red.end,
  },
});
const [startColor, endColor] = useFieldModel(["startColor", "endColor"]);

const taskStore = useTaskStore();
const confirmHandler = handleSubmit(async (values) => {
  if (props.editingCategory) {
    const id = props.editingCategory.id;
    await taskStore._actUpdateTaskCategory({ id, ...values });
  } else {
    await taskStore._actCreateTaskCategory(values);
  }
  emit("close");
});

const colors = computed(() => {
  return Object.values(taskCategoryColors).map((colors) => {
    return new Color([colors.start, colors.end]);
  });
});
function selectSystemColor(color: Color): void {
  startColor.value = color.hexStringList[0];
  endColor.value = color.hexStringList[1];
}
function isSystemColorSelected(color: Color): boolean {
  return (
    startColor.value === color.hexStringList[0] &&
    endColor.value === color.hexStringList[1]
  );
}

const demoCategory = computed<TaskCategory>(
  () =>
    new TaskCategory({
      id: 0,
      name: formValue.name || "樣本",
      startColor: startColor.value,
      endColor: endColor.value,
      createTimestamp: 0,
      updateTimestamp: 0,
    })
);

const demoTask = new Task({
  id: 0,
  categoryId: 0,
  title: "任務卡樣本",
  additionContent: "未來在這個群組中的任務卡會長這樣",
  additionUrl: "",
  lastStartTimestamp: 0,
  lastEndTimestamp: 0,
  createTimestamp: 0,
  updateTimestamp: 0,
});

const colorPickerOverrides: GlobalThemeOverrides = {
  ColorPicker: {
    color: "#48484E",
    textColor: "#fff",
  },
};
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
          <div class="text-center text-xl font-bold mb-4">
            任務群組{{ editingCategory ? "修改" : "創建" }}申請
          </div>

          <div class="flex items-start mb-2">
            <div
              v-for="(color, index) in colors"
              :key="index"
              :style="{ backgroundImage: color.styleString }"
              class="w-[22px] h-[22px] mr-2 border-2 rounded-full cursor-pointer last:hidden"
              :class="{ 'border-black': isSystemColorSelected(color) }"
              @click="selectSystemColor(color)"
            />
          </div>

          <div class="flex items-center mb-1">
            <label for="startColor">顏色(一)：</label>
            <NConfigProvider
              :preflight-style-disabled="true"
              :abstract="true"
              :theme-overrides="colorPickerOverrides"
            >
              <NColorPicker
                v-model:value="startColor"
                :size="'small'"
                :modes="['hex']"
                :show-alpha="false"
              />
            </NConfigProvider>
          </div>

          <div class="flex items-center mb-2">
            <label for="endColor">顏色(二)：</label>
            <NConfigProvider
              :preflight-style-disabled="true"
              :abstract="true"
              :theme-overrides="colorPickerOverrides"
            >
              <NColorPicker
                v-model:value="endColor"
                :size="'small'"
                :modes="['hex']"
                :show-alpha="false"
              />
            </NConfigProvider>
          </div>

          <div class="flex items-start mb-1">
            <label for="name">群組名稱：</label>
            <VerifyInput
              name="name"
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

          <div class="relative my-4">
            <div
              class="absolute -top-3 right-4 w-5 h-10 bg-white/50 -rotate-45"
            />
            <TaskCard
              class="mx-auto"
              :task="demoTask"
              :category="demoCategory"
            />
            <div
              class="absolute -bottom-3 left-4 w-5 h-10 bg-white/50 -rotate-45"
            />
          </div>

          <div class="text-xs text-dark text-center">
            ＊為確保文字清晰，請避免淺色卡片
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
            :text="editingCategory ? '更新' : '新增'"
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
  @apply relative w-[322px] h-[465px] mx-auto -mt-5 px-10 py-4 rounded-bl-[25px] bg-stone-200 shadow-sm overflow-hidden;

  &::after {
    content: "";
    @apply absolute bottom-0 left-0 z-10 w-6 h-6 bg-stone-200 shadow-t-sm shadow-darker;
  }

  label {
    @apply flex-shrink-0 text-sm font-bold w-[70px];
  }

  :deep(input) {
    @apply text-sm px-1 border-b-[1px] border-black bg-transparent focus-visible:outline-none;
  }
}

.clip {
  @apply absolute top-1 left-1/2 z-1 w-[135px] h-8 border-4 border-t-0 rounded-b-lg border-slate-500 shadow-sm shadow-lighter -translate-x-1/2;
}
</style>
