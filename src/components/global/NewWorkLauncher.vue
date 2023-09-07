<script setup lang="ts">
import { computed, watch } from "vue";
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
const props = defineProps<{ show?: boolean }>();

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
  initialValues: {
    [WorkFieldsName.TITLE]: "",
    [WorkFieldsName.TAGS]: {
      [WorkTagsFieldsName.BINDING]: [],
      [WorkTagsFieldsName.ADDING]: "",
    },
  },
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
      emit("close");
      await logStore._actFetchCurrentLog();
    })
    .catch((err) => err);
});

watch(
  () => props.show,
  () => resetForm(),
);
</script>

<template>
  <ModelBasic
    :show="props.show"
    :title="'New Work'"
    :right-button-text="'START'"
    :right-button-handler="startHandler"
    @close="emit('close')"
  >
    <template #body>
      <form @keypress.enter.prevent>
        <fieldset>
          <div class="mb-3">
            <label
              :for="WorkFieldsName.TITLE"
              class="block mb-1 text-gray-500 text-xs font-bold"
            >
              <div class="first-letter:text-base uppercase">
                {{ WorkFieldsName.TITLE }}
              </div>
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
              <div class="first-letter:text-base uppercase">
                {{ WorkFieldsName.TAGS }}

                <span class="ml-1">{{ bindingTags.length }} / 5</span>
              </div>
            </label>
            <VerifySelectMulti
              :field="WorkFieldsName.TAGS"
              :options="categoryOptions"
              :option-prefix="'#'"
              :on-create-option="createCategory"
              placeholder="Select Tags or Type Text"
            />
          </div>
        </fieldset>
      </form>
    </template>
  </ModelBasic>
</template>

<style scoped lang="scss"></style>
