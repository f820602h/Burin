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
  <form
    class="new-work-launcher relative w-full max-w-[500px] mt-[160px] mx-2"
    @keypress.enter.prevent
  >
    <fieldset class="min-w-0 border-2 border-gray-400 rounded-lg">
      <legend
        class="relative -top-2 px-2 text-center text-3xl text-gray-300 font-bold"
      >
        New Work
      </legend>

      <div class="px-3 py-4">
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

        <div class="mt-5 text-center">
          <button
            class="btn w-full h-9 rounded text-lg font-bold"
            @click="startHandler"
            v-text="'START'"
          />
        </div>
      </div>
    </fieldset>

    <div
      class="absolute top-2 -right-2 w-8 h-8 rounded-full flex-center-center text-white bg-black text-lg cursor-pointer"
      @click="emit('close')"
    >
      <div class="icon-cancel" />
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/scss/animation.scss";
.new-work-launcher {
  &::before {
    @apply absolute -inset-2 top-2 -z-1 rounded-xl bg-black/100;
    content: "";
  }
}
</style>
