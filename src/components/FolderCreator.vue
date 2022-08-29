<script setup lang="ts">
import { computed } from "vue";
import { object } from "yup";
import { useField, useForm } from "vee-validate";
import { taskCategoryColors } from "@/system/taskCategoryColors";
import { taskCategoryFieldValidation } from "@/system/fieldValidation";
import { Task } from "@/class/Task";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import TaskCard from "./common/TaskCard.vue";
import { NColorPicker } from "naive-ui";
import { TaskCategory } from "@/class/TaskCategory";
import { Color } from "@/class/Color";

withDefaults(defineProps<{ show?: boolean }>(), { show: false });
defineEmits<{ (e: "close"): void }>();

const validationSchema = object({
  name: taskCategoryFieldValidation.name,
  colorStart: taskCategoryFieldValidation.colorStart,
  colorEnd: taskCategoryFieldValidation.colorEnd,
});

const { values: formValue } = useForm({ validationSchema });
const { value: colorStart } = useField("colorStart", undefined, {
  initialValue: taskCategoryColors.red.start,
});
const { value: colorEnd } = useField("colorEnd", undefined, {
  initialValue: taskCategoryColors.red.end,
});

const colors = computed(() => {
  return Object.values(taskCategoryColors).map((colors) => {
    return new Color([colors.start, colors.end]);
  });
});

const demoCategory = computed<TaskCategory>(
  () =>
    new TaskCategory({
      id: 0,
      name: formValue.name || "樣本",
      startColor: colorStart.value,
      endColor: colorEnd.value,
      createTimestamp: 0,
      updateTimestamp: 0,
    })
);

const demoTask = new Task({
  id: 0,
  categoryId: 0,
  title: "樣本",
  additionContent: "樣本",
  additionUrl: "",
  lastStartTimestamp: 0,
  lastEndTimestamp: 0,
  createTimestamp: 0,
  updateTimestamp: 0,
});

const selectSystemColor: (color: Color) => void = (color) => {
  colorStart.value = color.hexStringList[0];
  colorEnd.value = color.hexStringList[1];
};
const isSystemColorSelected: (color: Color) => boolean = (color) => {
  return (
    colorStart.value === color.hexStringList[0] &&
    colorEnd.value === color.hexStringList[1]
  );
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed-layer flex-center-center bg-black/30 backdrop-blur-[2px]"
    >
      <div class="pb-1 rounded-md bg-stone-700 shadow-xl">
        <div class="clipboard">
          <div class="iron-sheet">
            <div class="flex-between-center h-full px-5">
              <div class="screw"></div>
              <div class="screw"></div>
            </div>
          </div>

          <div class="paper px-10 py-4">
            <div class="text-center text-xl font-bold mb-4">
              任務群組創建申請
            </div>

            <div class="flex items-start mb-3">
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
              <label for="colorStart">顏色(一)：</label>
              <NColorPicker
                v-model:value="colorStart"
                :size="'small'"
                :modes="['hex']"
                :show-alpha="false"
              />
            </div>

            <div class="flex items-center mb-2">
              <label for="colorEnd">顏色(二)：</label>
              <NColorPicker
                v-model:value="colorEnd"
                :size="'small'"
                :modes="['hex']"
                :show-alpha="false"
              />
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

            <TaskCard
              class="mx-auto mt-3"
              :task="demoTask"
              :category="demoCategory"
            />
            <div class="text-xs text-light text-center mt-2">
              ＊為確保文字清晰，請避免淺色卡片
            </div>
          </div>

          <div class="clip" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.clipboard {
  @apply relative w-[350px] h-[500px] rounded-md bg-stone-600;
}

.iron-sheet {
  @apply relative -top-1 w-[150px] h-10 mx-auto border-4 border-slate-500 rounded-t-xl rounded-b-md bg-slate-500 shadow-inner-sm;
}

.screw {
  @apply w-4 h-4 rounded-full bg-slate-600;
}

.paper {
  @apply relative w-[320px] h-[460px] mx-auto -mt-5 rounded-bl-[25px] bg-stone-200 shadow-sm overflow-hidden;

  &::after {
    content: "";
    @apply absolute bottom-0 left-0 z-10 w-6 h-6 bg-stone-200 shadow-t-sm shadow-darker;
  }
}

label {
  @apply flex-shrink-0 text-sm font-bold w-[70px];
}

:deep(input) {
  @apply text-sm px-1 border-b-[1px] border-black bg-transparent focus-visible:outline-none;
}

.clip {
  @apply absolute top-1 left-1/2 w-[135px] h-8 border-4 border-t-0 rounded-b-lg border-slate-500 shadow-sm shadow-lighter -translate-x-1/2;
}
</style>
