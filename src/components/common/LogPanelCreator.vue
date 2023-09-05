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
import {
  type LogPanelFields,
  LogPanelFieldsName,
  logPanelFieldsValidation,
} from "@/validation/logPanelField";
import { FieldTypes } from "@/types/fieldType";
import { FILTER_OPERATORS_TEXT_MAP, FilterOperator } from "@/class/Filter";
import { useCategoryStore } from "@/stores/category";
import ModelBasic from "@/components/basic/ModelBasic.vue";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import FilterForm from "@/components/common/FilterForm.vue";
import SortForm from "@/components/common/SortForm.vue";
import CollapseVTransition from "@/components/common/transition/CollapseVTransition.vue";

const emit = defineEmits<{ (e: "close"): void }>();
const props = defineProps<{ show?: boolean }>();

const categoryStore = useCategoryStore();
const isFilterFormShow = ref<boolean>(false);
const isSortFormShow = ref<boolean>(false);

const { values, resetForm } = useForm<LogPanelFields>({
  validationSchema: object({ ...logPanelFieldsValidation }),
  initialValues: {
    [LogPanelFieldsName.TITLE]: "",
    [LogPanelFieldsName.FILTERS]: [],
    [LogPanelFieldsName.SORTERS]: [],
  },
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

const startHandler = () => {
  console.log("start");
};

watch(
  () => props.show,
  () => resetForm()
);
</script>

<template>
  <ModelBasic
    :show="props.show"
    :title="'New Panel'"
    :right-button-text="'ADD'"
    :right-button-handler="startHandler"
    :show-body-mask="isFilterFormShow || isSortFormShow"
    @close="emit('close')"
  >
    <template #body>
      <form @keypress.enter.prevent>
        <fieldset class="min-w-0">
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

          <div class="relative mb-3" :class="{ 'z-10': !isSortFormShow }">
            <div class="flex-between-center">
              <label class="block mb-1 text-gray-500 text-xs font-bold">
                <div class="first-letter:text-base uppercase">
                  {{ LogPanelFieldsName.FILTERS }}
                </div>
              </label>

              <ButtonLinkLike
                size="sm"
                text="+ Add Filter"
                @click="isFilterFormShow = !isFilterFormShow"
              />
            </div>

            <div class="w-full py-2 px-2 rounded bg-gray-800">
              <CollapseVTransition :duration="500">
                <template v-if="!isFilterFormShow">
                  <div
                    v-if="!values[LogPanelFieldsName.FILTERS].length"
                    class="py-1 rounded border-2 border-dashed border-gray-500 text-sm text-center text-gray-500"
                  >
                    No Filter
                  </div>

                  <div v-else>
                    <div
                      v-for="({ config }, i) in values[
                        LogPanelFieldsName.FILTERS
                      ]"
                      :key="i"
                      class="flex flex-col mt-2 first:mt-0 p-1 rounded text-sm bg-gray-600"
                    >
                      <div class="flex mb-1 px-1">
                        <div class="font-bold">
                          {{ LOG_FILTERABLE_FIELD_TEXT_MAP[config.field] }}
                        </div>

                        <div class="ml-2 text-gray-400">
                          {{ FILTER_OPERATORS_TEXT_MAP[config.condition] }}
                        </div>
                      </div>

                      <div class="flex-center-center p-2 rounded bg-black/30">
                        <div class="px-1 border-b text-center truncate">
                          <template v-if="config.type === FieldTypes.STRING">
                            {{ config.value[config.type] }}
                          </template>
                          <template v-if="config.type === FieldTypes.NUMBER">
                            {{ config.value[config.type] }}
                          </template>
                          <template v-if="config.type === FieldTypes.DURATION">
                            {{
                              config.value[config.type]
                                .map((n) => String(n).padStart(2, "0"))
                                .join(":")
                            }}
                          </template>
                          <template v-if="config.type === FieldTypes.TIME">
                            <template
                              v-if="config.condition === FilterOperator.BETWEEN"
                            >
                              {{
                                config.value[config.type][config.condition]
                                  .map((time) =>
                                    time
                                      .map((n) => String(n).padStart(2, "0"))
                                      .join(":")
                                  )
                                  .join(" ~ ")
                              }}
                            </template>
                            <template
                              v-if="config.condition === FilterOperator.AFTER"
                            >
                              {{
                                config.value[config.type][config.condition]
                                  .map((n) => String(n).padStart(2, "0"))
                                  .join(":")
                              }}
                            </template>
                            <template
                              v-if="config.condition === FilterOperator.BEFORE"
                            >
                              {{
                                config.value[config.type][config.condition]
                                  .map((n) => String(n).padStart(2, "0"))
                                  .join(":")
                              }}
                            </template>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <FilterForm
                  v-else-if="isFilterFormShow"
                  v-model:filters="values[LogPanelFieldsName.FILTERS]"
                  :target-type-map="LOG_FIELD_TYPE_MAP"
                  :target-text-map="LOG_FILTERABLE_FIELD_TEXT_MAP"
                  :target-select-field-options-map="
                    LOG_SELECT_FIELD_OPTIONS_MAP
                  "
                  :target-multi-select-field-options-map="
                    LOG_MULTI_SELECT_FIELD_OPTIONS_MAP
                  "
                  @close="isFilterFormShow = false"
                />
              </CollapseVTransition>
            </div>
          </div>

          <div class="relative mb-3" :class="{ 'z-10': !isFilterFormShow }">
            <div class="flex-between-center">
              <label class="block mb-1 text-gray-500 text-xs font-bold">
                <div class="first-letter:text-base uppercase">
                  {{ LogPanelFieldsName.SORTERS }}
                </div>
              </label>

              <ButtonLinkLike
                size="sm"
                text="+ Add Sorter"
                @click="isSortFormShow = !isSortFormShow"
              />
            </div>

            <div class="py-2 px-2 rounded bg-gray-800">
              <CollapseVTransition>
                <div
                  v-if="!isSortFormShow"
                  class="py-1 rounded border-2 border-dashed border-gray-500 text-sm text-center text-gray-500"
                >
                  No Sorter
                </div>

                <SortForm
                  v-else-if="isSortFormShow"
                  :target-type-map="LOG_FIELD_TYPE_MAP"
                  :target-text-map="LOG_SORTABLE_FIELD_TEXT_MAP"
                  @close="isSortFormShow = false"
                />
              </CollapseVTransition>
            </div>
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
