<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import {
  LOG_STATUS_TEXT_MAP,
  LOG_FIELD_TYPE_MAP,
  LOG_FILTERABLE_FIELD_TEXT_MAP,
  LOG_SORTABLE_FIELD_TEXT_MAP,
} from "@/class/Log";
import { LogPanel } from "@/class/Panel";
import {
  type LogPanelFields,
  LogPanelFieldsName,
  createLogPanelSchema,
} from "@/validation/logPanelField";
import { FieldTypes } from "@/types/fieldType";
import { useCategoryStore } from "@/stores/category";
import { useLogPanelStore } from "@/stores/logPanel";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import FilterForm from "@/components/common/FilterForm.vue";
import SorterForm from "@/components/common/SorterForm.vue";
import CollapseVTransition from "@/components/common/transition/CollapseVTransition.vue";
import FilterCard from "@/components/common/FilterCard.vue";
import SorterCard from "@/components/common/SorterCard.vue";

const emit = defineEmits<{ (e: "close"): void }>();
const props = defineProps<{ show?: boolean; initialValues?: LogPanel }>();

const categoryStore = useCategoryStore();
const logPanelStore = useLogPanelStore();

const isFilterFormShow = ref<boolean>(false);
const isSortFormShow = ref<boolean>(false);

const filterMaxLength = ref(5);
const sorterMaxLength = ref(2);

const { handleSubmit, values, resetForm, setValues, setFieldValue } =
  useForm<LogPanelFields>({
    validationSchema: object({
      ...createLogPanelSchema(filterMaxLength.value, sorterMaxLength.value),
    }),
    initialValues: {
      [LogPanelFieldsName.TITLE]: "",
      [LogPanelFieldsName.FILTERS]: [],
      [LogPanelFieldsName.SORTERS]: [],
    },
  });

watch(
  () => props.initialValues,
  (val) => {
    setValues({
      [LogPanelFieldsName.TITLE]: val ? val.title : "",
      [LogPanelFieldsName.FILTERS]: val ? Array.from(val.filters) : [],
      [LogPanelFieldsName.SORTERS]: val ? Array.from(val.sorters) : [],
    });
  },
  { immediate: true, deep: true },
);

const addLogPanelHandler = handleSubmit(async (values) => {
  if (props.initialValues?.id) {
    await logPanelStore._actUpdateDailyPanel(props.initialValues.id, values);
  } else {
    await logPanelStore._actCreateDailyPanel(values);
  }
  emit("close");
});

const LOG_SELECT_FIELD_OPTIONS_MAP = computed(() => {
  return {
    status: Object.typedEntries(LOG_STATUS_TEXT_MAP).map(([key, value]) => {
      return { label: value, value: key };
    }),
  };
});

const LOG_MULTI_SELECT_FIELD_OPTIONS_MAP = computed(() => {
  return {
    categories: categoryStore.categories.map((category) => {
      return { label: category.category, value: category.id };
    }),
  };
});

function filterCardFieldFormatter(
  config: LogPanelFields[LogPanelFieldsName.FILTERS][number]["config"],
) {
  return LOG_FILTERABLE_FIELD_TEXT_MAP[config.field] || "";
}

function filterCardSelectValueFormatter(
  config: LogPanelFields[LogPanelFieldsName.FILTERS][number]["config"],
): string {
  const { field, type, value } = config;
  if (type !== FieldTypes.SELECT) return "";
  return (
    LOG_SELECT_FIELD_OPTIONS_MAP.value[field].find(
      (option) => option.value === value[type],
    )?.label || ""
  );
}

function filterCardMultiSelectValueFormatter(
  config: LogPanelFields[LogPanelFieldsName.FILTERS][number]["config"],
): string[] {
  const { field, type, value } = config;
  if (type !== FieldTypes.MULTI_SELECT) return [];
  return value[type].map((val) => {
    return (
      LOG_MULTI_SELECT_FIELD_OPTIONS_MAP.value[field].find(
        (option) => option.value === val,
      )?.label || ""
    );
  });
}

watch(
  () => props.show,
  () => {
    resetForm();
    isFilterFormShow.value = false;
    isSortFormShow.value = false;
  },
);

function deleteFilterHandler(index: number) {
  setFieldValue(
    LogPanelFieldsName.FILTERS,
    values[LogPanelFieldsName.FILTERS].filter((_, i) => i !== index),
  );
}

function deleteSorterHandler(index: number) {
  setFieldValue(
    LogPanelFieldsName.SORTERS,
    values[LogPanelFieldsName.SORTERS].filter((_, i) => i !== index),
  );
}
</script>

<template>
  <ModelBasic
    :show="props.show"
    :title="'New Panel'"
    :right-button-text="props.initialValues?.id ? 'UPDATE' : 'ADD'"
    :right-button-handler="addLogPanelHandler"
    :show-body-mask="isFilterFormShow || isSortFormShow"
    @close="emit('close')"
  >
    <template #body>
      <form @keypress.enter.prevent>
        <fieldset class="min-w-0">
          <div class="mb-3">
            <label
              :for="LogPanelFieldsName.TITLE"
              class="block mb-1 text-gray-500 text-xs font-bold"
            >
              <div class="first-letter:text-base uppercase">
                {{ LogPanelFieldsName.TITLE }}
              </div>
            </label>
            <VerifyInput
              :field="LogPanelFieldsName.TITLE"
              type="text"
              placeholder="Type Panel Title"
              :default-value="values[LogPanelFieldsName.TITLE]"
            />
          </div>

          <div class="relative mb-3" :class="{ 'z-10': !isSortFormShow }">
            <div class="flex-between-center">
              <label class="block mb-1 text-gray-500 text-xs font-bold">
                <div class="first-letter:text-base uppercase">
                  {{ LogPanelFieldsName.FILTERS }}

                  <span class="ml-1">
                    {{ values[LogPanelFieldsName.FILTERS].length }} /
                    {{ filterMaxLength }}
                  </span>
                </div>
              </label>

              <ButtonLinkLike
                class="text-sm"
                text="+ Add Filter"
                :disabled="
                  values[LogPanelFieldsName.FILTERS].length === filterMaxLength
                "
                @click="isFilterFormShow = !isFilterFormShow"
              />
            </div>

            <div class="p-2 rounded bg-gray-800">
              <CollapseVTransition :duration="500">
                <template v-if="!isFilterFormShow">
                  <div
                    v-if="!values[LogPanelFieldsName.FILTERS].length"
                    class="py-1 rounded border-2 border-dashed border-gray-500 text-sm text-center text-gray-500"
                  >
                    No Filter
                  </div>

                  <div v-else>
                    <FilterCard
                      v-for="(filter, i) in values[LogPanelFieldsName.FILTERS]"
                      :key="i"
                      :filter="filter"
                      :format-field="filterCardFieldFormatter"
                      :format-select-value="filterCardSelectValueFormatter"
                      :format-multi-select-value="
                        filterCardMultiSelectValueFormatter
                      "
                      @delete="deleteFilterHandler(i)"
                    />
                  </div>
                </template>

                <FilterForm
                  v-else-if="isFilterFormShow"
                  :filters="values[LogPanelFieldsName.FILTERS]"
                  :target-type-map="LOG_FIELD_TYPE_MAP"
                  :target-text-map="LOG_FILTERABLE_FIELD_TEXT_MAP"
                  :target-select-field-options-map="
                    LOG_SELECT_FIELD_OPTIONS_MAP
                  "
                  :target-multi-select-field-options-map="
                    LOG_MULTI_SELECT_FIELD_OPTIONS_MAP
                  "
                  @update:filters="
                    (filters) =>
                      setFieldValue(LogPanelFieldsName.FILTERS, filters)
                  "
                  @close="isFilterFormShow = false"
                />
              </CollapseVTransition>
            </div>
            <p class="mt-1 text-xs text-right text-gray-600">
              filters will filter in order
            </p>
          </div>

          <div class="relative" :class="{ 'z-10': !isFilterFormShow }">
            <div class="flex-between-center">
              <label class="block mb-1 text-gray-500 text-xs font-bold">
                <div class="first-letter:text-base uppercase">
                  {{ LogPanelFieldsName.SORTERS }}

                  <span class="ml-1">
                    {{ values[LogPanelFieldsName.SORTERS].length }} /
                    {{ sorterMaxLength }}
                  </span>
                </div>
              </label>

              <ButtonLinkLike
                class="text-sm"
                text="+ Add Sorter"
                :disabled="
                  values[LogPanelFieldsName.SORTERS].length === sorterMaxLength
                "
                @click="isSortFormShow = !isSortFormShow"
              />
            </div>

            <div class="p-2 rounded bg-gray-800">
              <CollapseVTransition>
                <template v-if="!isSortFormShow">
                  <div
                    v-if="!values[LogPanelFieldsName.SORTERS].length"
                    class="py-1 rounded border-2 border-dashed border-gray-500 text-sm text-center text-gray-500"
                  >
                    No Sorter
                  </div>

                  <div v-else>
                    <SorterCard
                      v-for="(sorter, i) in values[LogPanelFieldsName.SORTERS]"
                      :key="i"
                      :sorter="sorter"
                      @delete="deleteSorterHandler(i)"
                    />
                  </div>
                </template>

                <SorterForm
                  v-else-if="isSortFormShow"
                  :sorters="values[LogPanelFieldsName.SORTERS]"
                  :target-type-map="LOG_FIELD_TYPE_MAP"
                  :target-text-map="LOG_SORTABLE_FIELD_TEXT_MAP"
                  @update:sorters="
                    (sorters) =>
                      setFieldValue(LogPanelFieldsName.SORTERS, sorters)
                  "
                  @close="isSortFormShow = false"
                />
              </CollapseVTransition>
            </div>
            <p class="mt-1 text-xs text-right text-gray-600">
              sorters will sort in order
            </p>
          </div>
        </fieldset>
      </form>
    </template>
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
