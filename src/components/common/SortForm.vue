<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { computed, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { FieldTypes, type FieldTypeMap } from "@/types/fieldType";
import { SORTER_DIRECTION_TEXT_MAP } from "@/class/Sorter";
import {
  type SortFields,
  type SortSchemaParams,
  SortFieldsName,
  createSortSchema,
} from "@/validation/sortField";
import VerifySelect from "@/components/basic/VerifySelect.vue";

const props = defineProps<SortSchemaParams<T, TypeMap>>();

const { values, setFieldValue } = useForm<
  SortFields<T, typeof props.targetTypeMap>
>({
  validationSchema: object({
    ...createSortSchema<T, TypeMap>({
      targetTypeMap: props.targetTypeMap,
      targetTextMap: props.targetTextMap,
    }),
  }),
});

const fieldOptions = computed(() => {
  return Object.typedEntries(props.targetTextMap).map(([key, value]) => ({
    label: value as string,
    value: key as string,
  }));
});

const directionOptions = computed(() => {
  return Object.typedEntries(SORTER_DIRECTION_TEXT_MAP).map(([key, value]) => ({
    label: value,
    value: key,
  }));
});

watch(
  () => values[SortFieldsName.FIELD],
  (val) => {
    const type = props.targetTypeMap[val];
    if (
      !type ||
      type === FieldTypes.SELECT ||
      type === FieldTypes.MULTI_SELECT
    ) {
      throw new Error("Invalid Field");
    }
    setFieldValue(SortFieldsName.TYPE, type);
    setFieldValue(SortFieldsName.DIRECTION, directionOptions.value[0].value);
  }
);
</script>

<template>
  <div class="pt-2 pb-3 px-2 rounded bg-gray-800">
    <div class="mb-2">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ SortFieldsName.FIELD }}
        </div>
      </label>
      <VerifySelect
        :field="SortFieldsName.FIELD"
        :options="fieldOptions"
        :default-value="fieldOptions[0].value"
        placeholder="Choose Field to Filter"
      />
    </div>

    <div v-if="values[SortFieldsName.TYPE]">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ SortFieldsName.DIRECTION }}
        </div>
      </label>
      <VerifySelect
        :field="SortFieldsName.DIRECTION"
        :options="directionOptions"
        placeholder="Choose Sort Direction"
      />
    </div>
  </div>
</template>

<style scoped></style>
