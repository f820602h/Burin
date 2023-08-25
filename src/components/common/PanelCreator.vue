<script setup lang="ts">
import { object } from "yup";
import { useForm } from "vee-validate";
import {
  LOG_STATUS_TEXT_MAP,
  LOG_FIELD_TYPE_MAP,
  LOG_FILTERABLE_FIELD_TEXT_MAP,
  LOG_SORTABLE_FIELD_TEXT_MAP,
} from "@/class/Log";
import {
  type LogPanelFields,
  LogPanelFieldsName,
  logPanelFieldsValidation,
} from "@/validation/logPanelField";
import { useCategoryStore } from "@/stores/category";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import FilterForm from "@/components/common/FilterForm.vue";
import SortForm from "@/components/common/SortForm.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const categoryStore = useCategoryStore();

const { values } = useForm<LogPanelFields>({
  validationSchema: object({ ...logPanelFieldsValidation }),
});

const LOG_SELECT_FIELD_OPTIONS_MAP = {
  status: Object.typedEntries(LOG_STATUS_TEXT_MAP).map(([key, value]) => {
    return { label: value, value: key };
  }),
};

const LOG_MULTI_SELECT_FIELD_OPTIONS_MAP = {
  categories: categoryStore.categories.map((category) => {
    return { label: category.category, value: category.id };
  }),
};

const startHandler = () => {
  console.log("start");
};
</script>

<template>
  <ModelBasic :title="'New Panel'" @close="emit('close')">
    <form class="flex flex-col px-3 py-4 min-h-full" @keypress.enter.prevent>
      <fieldset>
        <div class="mb-3">
          <label
            :for="LogPanelFieldsName.TITLE"
            class="mb-1 text-gray-500 text-xs font-bold"
          >
            <div class="first-letter:text-base uppercase">
              {{ LogPanelFieldsName.TITLE }}
            </div>
          </label>
          <VerifyInput
            v-model="values.title"
            :field="LogPanelFieldsName.TITLE"
            type="text"
            placeholder="Type Panel Title"
          />
        </div>

        <div class="mb-3">
          <label class="block mb-1 text-gray-500 text-xs font-bold">
            <div class="first-letter:text-base uppercase">
              {{ LogPanelFieldsName.FILTER }}
            </div>
          </label>
          <FilterForm
            :target-type-map="LOG_FIELD_TYPE_MAP"
            :target-text-map="LOG_FILTERABLE_FIELD_TEXT_MAP"
            :target-select-field-options-map="LOG_SELECT_FIELD_OPTIONS_MAP"
            :target-multi-select-field-options-map="
              LOG_MULTI_SELECT_FIELD_OPTIONS_MAP
            "
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-500 text-xs font-bold">
            <div class="first-letter:text-base uppercase">
              {{ LogPanelFieldsName.SORT }}
            </div>
          </label>
          <SortForm
            :target-type-map="LOG_FIELD_TYPE_MAP"
            :target-text-map="LOG_SORTABLE_FIELD_TEXT_MAP"
          />
        </div>
      </fieldset>

      <div class="mt-auto pt-5 text-center">
        <button
          class="btn w-full h-9 rounded text-lg font-bold"
          @click="startHandler"
          v-text="'ADD'"
        />
      </div>
    </form>
  </ModelBasic>
</template>

<style scoped lang="scss">
.panel-creator {
  &::before {
    @apply absolute -inset-2 top-2 -z-1 rounded-xl bg-black/100;
    content: "";
  }
}
</style>
@/class/Filter @/class/Sorter
