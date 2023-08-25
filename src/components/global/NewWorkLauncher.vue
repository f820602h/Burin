<script setup lang="ts">
import { computed } from "vue";
import { object } from "yup";
import { useLogStore } from "@/stores/log";
import { useCategoryStore } from "@/stores/category";
import { useForm } from "vee-validate";
import type { SelectOption } from "naive-ui";
import {
  type WorkFields,
  WorkFieldsName,
  WorkTagsFieldsName,
  workFieldsValidation,
} from "@/validation/workField";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import VerifySelectMulti from "@/components/basic/VerifySelectMulti.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const logStore = useLogStore();

const categoryStore = useCategoryStore();
const categoryOptions = computed<SelectOption[]>(() => {
  const copyCategories = [...categoryStore.categories];
  return copyCategories
    .sort((a, b) => b.updateTimestamp - a.updateTimestamp)
    .map((cate) => ({
      label: cate.category,
      value: cate.id,
    }));
});
async function createCategory(inputValue: string): Promise<number> {
  const newIds = await categoryStore._actCreateCategory({
    category: inputValue,
  });
  return newIds;
}

const { handleSubmit, values, resetForm } = useForm<WorkFields>({
  validationSchema: object({ ...workFieldsValidation }),
});
const bindingTags = computed(() => {
  return values[WorkFieldsName.TAGS][WorkTagsFieldsName.BINDING];
});
const startHandler = handleSubmit(async (values) => {
  return await logStore
    ._actPushLog({
      title: values[WorkFieldsName.TITLE],
      startTimestamp: new Date().getTime(),
      categories: bindingTags.value,
    })
    .then(async () => {
      resetForm();
      emit("close");
      await logStore._actFetchCurrentLog();
    })
    .catch((err) => err);
});
</script>

<template>
  <ModelBasic :title="'New Work'" @close="emit('close')">
    <form class="flex flex-col px-3 py-4 min-h-full" @keypress.enter.prevent>
      <fieldset>
        <div class="mb-3">
          <label
            :for="WorkFieldsName.TITLE"
            class="flex mb-1 text-gray-500 text-xs font-bold"
          >
            <div class="first-letter:text-base">WORK</div>
            <div class="ml-1 first-letter:text-base">TITLE</div>
          </label>
          <VerifyInput
            :field="WorkFieldsName.TITLE"
            type="text"
            placeholder="Type Work Title"
          />
        </div>

        <div>
          <label
            :for="WorkFieldsName.TAGS"
            class="flex-between-center mb-1 text-gray-500 text-xs font-bold"
          >
            <div class="first-letter:text-base">TAGS</div>
            <div v-if="values.tags">{{ bindingTags.length }} / 5</div>
          </label>
          <VerifySelectMulti
            :field="WorkFieldsName.TAGS"
            :options="categoryOptions"
            :on-create-option="createCategory"
            placeholder="Select Tags or Type Text"
          />
        </div>
      </fieldset>

      <div class="mt-auto pt-5 text-center">
        <button
          class="btn w-full h-9 rounded text-lg font-bold"
          @click="startHandler"
          v-text="'START'"
        />
      </div>
    </form>
  </ModelBasic>
</template>

<style scoped lang="scss">
@import "@/scss/animation.scss";
</style>
