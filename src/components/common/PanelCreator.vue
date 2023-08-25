<script setup lang="ts">
import { computed } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import {
  LOG_STATUS_TEXT_MAP,
  LOG_FIELD_TYPE_MAP,
  LOG_FIELD_TEXT_MAP,
} from "@/class/Log";
import { SORTER_DIRECTION_TEXT_MAP } from "@/class/Sorter";
import {
  type LogPanelFields,
  LogPanelFieldsName,
  logPanelFieldsValidation,
} from "@/validation/logPanelField";
import { useCategoryStore } from "@/stores/category";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import VerifySelect from "@/components/basic/VerifySelect.vue";
import FilterForm from "@/components/common/FilterForm.vue";

const emit = defineEmits<{ (e: "close"): void }>();

const categoryStore = useCategoryStore();

const { values } = useForm<LogPanelFields>({
  validationSchema: object({ ...logPanelFieldsValidation }),
});

const LOG_SELECT_FIELD_OPTIONS_MAP = {
  status: Object.entries(LOG_STATUS_TEXT_MAP).map(([key, value]) => {
    return { label: value, value: key };
  }),
};

const LOG_MULTI_SELECT_FIELD_OPTIONS_MAP = {
  categories: categoryStore.categories.map((category) => {
    return { label: category.category, value: category.id };
  }),
};

const logFieldOptions = computed(() => {
  return Object.entries(LOG_FIELD_TEXT_MAP).map(([key, value]) => ({
    label: value,
    value: key,
  }));
});

const sorterDirectionOptions = computed(() => {
  return Object.entries(SORTER_DIRECTION_TEXT_MAP).map(([key, value]) => ({
    label: value,
    value: key,
  }));
});

const startHandler = () => {
  console.log("start");
};
</script>

<template>
  <form
    class="panel-creator relative w-full max-w-[500px] mt-[160px] mx-2"
    @keypress.enter.prevent
  >
    <fieldset class="border-2 border-gray-400 rounded-lg">
      <legend
        class="relative -top-2 px-2 text-center text-3xl text-gray-300 font-bold"
      >
        New Panel
      </legend>

      <div class="px-3 py-4">
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
            :target-text-map="LOG_FIELD_TEXT_MAP"
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
          <div class="flex p-1 rounded bg-gray-800">
            <VerifySelect
              class="flex-1 mr-1"
              :field="'sort-field'"
              :options="logFieldOptions"
              placeholder="Input Panel Title"
            />
            <VerifySelect
              class="flex-1"
              :field="'sort-field'"
              :options="sorterDirectionOptions"
              placeholder="Input Panel Title"
            />
          </div>
        </div>

        <div class="mt-5 text-center">
          <button
            class="btn w-full h-9 rounded text-lg font-bold"
            @click="startHandler"
            v-text="'ADD'"
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
.panel-creator {
  &::before {
    @apply absolute -inset-2 top-2 -z-1 rounded-xl bg-black/100;
    content: "";
  }
}
</style>
@/class/Filter @/class/Sorter
