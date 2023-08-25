<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { computed, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { type FieldTypeMap, FieldTypes } from "@/types/fieldType";
import {
  FIELD_TYPE_OPERATORS_MAP,
  FILTER_OPERATORS_TEXT_MAP,
} from "@/class/Filter";
import {
  type FilterFields,
  type FilterSchemaParams,
  FilterFieldsName,
  createFilterSchema,
} from "@/validation/filterField";
import VerifyInput from "@/components/basic/VerifyInput.vue";
import VerifyInputNumber from "@/components/basic/VerifyInputNumber.vue";
import VerifySelect from "@/components/basic/VerifySelect.vue";
import VerifySelectMulti from "@/components/basic/VerifySelectMulti.vue";

const props = defineProps<FilterSchemaParams<T, TypeMap>>();

const { values, setFieldValue } = useForm<FilterFields<T, TypeMap>>({
  validationSchema: object({
    ...createFilterSchema<T, TypeMap>({
      targetTypeMap: props.targetTypeMap,
      targetTextMap: props.targetTextMap,
      targetSelectFieldOptionsMap: props.targetSelectFieldOptionsMap,
      targetMultiSelectFieldOptionsMap: props.targetMultiSelectFieldOptionsMap,
    }),
  }),
});

const fieldOptions = computed(() => {
  return Object.typedEntries(props.targetTextMap).map(([key, value]) => ({
    label: value as string,
    value: key as string,
  }));
});

const operatorOptions = computed(() => {
  return FIELD_TYPE_OPERATORS_MAP[values.type].map((operator) => {
    return {
      label: FILTER_OPERATORS_TEXT_MAP[operator],
      value: operator,
    };
  });
});

const selectTypeFieldOptions = computed(() => {
  if (values[FilterFieldsName.TYPE] === FieldTypes.SELECT) {
    return props.targetSelectFieldOptionsMap[values[FilterFieldsName.FIELD]];
  }
  return [];
});

const multiSelectTypeFieldOptions = computed(() => {
  if (values[FilterFieldsName.TYPE] === FieldTypes.MULTI_SELECT) {
    return props.targetMultiSelectFieldOptionsMap[
      values[FilterFieldsName.FIELD]
    ];
  }
  return [];
});

watch(
  () => values[FilterFieldsName.FIELD],
  (val) => {
    setFieldValue(FilterFieldsName.TYPE, props.targetTypeMap[val]);
    setFieldValue(FilterFieldsName.CONDITION, operatorOptions.value[0].value);
  }
);
</script>

<template>
  <div class="pt-2 pb-3 px-2 rounded bg-gray-800">
    <div class="mb-2">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ FilterFieldsName.FIELD }}
        </div>
      </label>
      <VerifySelect
        :field="FilterFieldsName.FIELD"
        :options="fieldOptions"
        :default-value="fieldOptions[0].value"
        placeholder="Choose Field to Filter"
      />
    </div>

    <div v-if="values[FilterFieldsName.TYPE]">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ FilterFieldsName.CONDITION }}
        </div>
      </label>
      <VerifySelect
        :field="FilterFieldsName.CONDITION"
        :options="operatorOptions"
        placeholder="Choose How to Compare"
      />

      <template v-if="values[FilterFieldsName.TYPE] === FieldTypes.STRING">
        <VerifyInput
          class="mt-2"
          :field="`${FilterFieldsName.VALUE}.${FieldTypes.STRING}`"
          type="text"
          placeholder="Type a Value"
        />
      </template>
      <template v-else-if="values[FilterFieldsName.TYPE] === FieldTypes.NUMBER">
        <VerifyInputNumber
          class="mt-2"
          :field="`${FilterFieldsName.VALUE}.${FieldTypes.NUMBER}`"
          type="number"
          placeholder="Type a Value"
        />
      </template>
      <template v-else-if="values[FilterFieldsName.TYPE] === FieldTypes.SELECT">
        <VerifySelect
          class="mt-2"
          :field="`${FilterFieldsName.VALUE}.${FieldTypes.SELECT}`"
          :options="selectTypeFieldOptions"
          :default-value="selectTypeFieldOptions[0].value"
          placeholder="Select one Option"
        />
      </template>
      <template
        v-else-if="values[FilterFieldsName.TYPE] === FieldTypes.MULTI_SELECT"
      >
        <VerifySelectMulti
          class="mt-2"
          :field="`${FilterFieldsName.VALUE}.${FieldTypes.MULTI_SELECT}`"
          :options="multiSelectTypeFieldOptions"
          placeholder="Select One or More Options"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
@/types/fieldType
