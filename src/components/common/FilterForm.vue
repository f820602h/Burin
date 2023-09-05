<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { computed, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { type FieldTypeMap, FieldTypes } from "@/types/fieldType";
import {
  FilterOperator,
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
import VerifyInputTime from "@/components/basic/VerifyInputTime.vue";
import VerifySelect from "@/components/basic/VerifySelect.vue";
import VerifySelectMulti from "@/components/basic/VerifySelectMulti.vue";
import { Filter } from "@/class/Filter";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update:filters", filters: Filter<T, TypeMap>[]): void;
}>();

const props = defineProps<
  { filters: Filter<T, TypeMap>[] } & FilterSchemaParams<T, TypeMap>
>();

const { handleSubmit, values, setFieldValue, errors } = useForm<
  FilterFields<T, TypeMap>
>({
  validationSchema: object({
    ...createFilterSchema<T, TypeMap>({
      targetTypeMap: props.targetTypeMap,
      targetTextMap: props.targetTextMap,
      targetSelectFieldOptionsMap: props.targetSelectFieldOptionsMap,
      targetMultiSelectFieldOptionsMap: props.targetMultiSelectFieldOptionsMap,
    }),
  }),
});

const addFilterHandler = handleSubmit((values) => {
  emit("update:filters", [...(props.filters || []), new Filter(values)]);
  emit("close");
});

const durationValueError = computed(() => {
  const error = Object.entries(errors.value).find(
    ([key]) =>
      key.indexOf(`${FilterFieldsName.VALUE}.${FieldTypes.DURATION}`) > -1
  );
  return error?.[1];
});

const timeValueError = computed(() => {
  const error = Object.entries(errors.value).find(
    ([key]) => key.indexOf(`${FilterFieldsName.VALUE}.${FieldTypes.TIME}`) > -1
  );
  return error?.[1];
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
    const type = props.targetTypeMap[val];
    if (!type) throw new Error("Invalid Field");
    setFieldValue(FilterFieldsName.TYPE, type);
    setFieldValue(FilterFieldsName.CONDITION, operatorOptions.value[0].value);
  }
);
</script>

<template>
  <form @keypress.enter.prevent>
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
      <template
        v-else-if="values[FilterFieldsName.TYPE] === FieldTypes.DURATION"
      >
        <div class="flex items-end mt-2 mb-1">
          <label class="w-full text-gray-500 text-xs font-bold">
            <div class="first-letter:text-base uppercase">hours</div>
          </label>
          <label class="w-full text-gray-500 text-xs font-bold mx-2">
            <div class="first-letter:text-base uppercase">minutes</div>
          </label>
          <label class="w-full text-gray-500 text-xs font-bold">
            <div class="first-letter:text-base uppercase">seconds</div>
          </label>
        </div>

        <div class="flex items-end">
          <VerifyInputNumber
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.DURATION}[0]`"
            :max="23"
            :min="0"
            :show-error="false"
            type="number"
            placeholder="0"
          />
          <VerifyInputNumber
            class="mx-2"
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.DURATION}[1]`"
            :max="59"
            :min="0"
            :show-error="false"
            type="number"
            placeholder="0"
          />
          <VerifyInputNumber
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.DURATION}[2]`"
            :max="59"
            :min="0"
            :show-error="false"
            type="number"
            placeholder="0"
          />
        </div>

        <div class="mt-1 text-xs text-right text-red-600 empty:hidden">
          {{ durationValueError }}
        </div>
      </template>

      <template v-else-if="values[FilterFieldsName.TYPE] === FieldTypes.TIME">
        <template
          v-if="values[FilterFieldsName.CONDITION] === FilterOperator.BETWEEN"
        >
          <VerifyInputTime
            class="mt-2"
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.TIME}.${FilterOperator.BETWEEN}[0]`"
            placeholder="Designate a Time"
          />
          <VerifyInputTime
            class="mt-2"
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.TIME}.${FilterOperator.BETWEEN}[1]`"
            placeholder="Designate a Time"
          />
        </template>

        <template v-else>
          <VerifyInputTime
            class="mt-2"
            :field="`${FilterFieldsName.VALUE}.${FieldTypes.TIME}.${
              values[FilterFieldsName.CONDITION]
            }`"
            placeholder="Designate a Time"
          />
        </template>

        <div class="mt-1 text-xs text-right text-red-600 empty:hidden">
          {{ timeValueError }}
        </div>
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

    <div class="flex mt-3">
      <ButtonBasic
        class="w-full mr-2"
        :theme="'primary-outline'"
        :text="'CANCEL'"
        @click="emit('close')"
      />
      <ButtonBasic class="w-full" :text="'ADD'" @click="addFilterHandler" />
    </div>
  </form>
</template>

<style scoped></style>
