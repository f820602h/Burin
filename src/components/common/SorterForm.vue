<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { computed, watch } from "vue";
import { object } from "yup";
import { useForm } from "vee-validate";
import { type FieldTypeMap, FieldTypes } from "@/types/fieldType";
import { Sorter, SORTER_DIRECTION_TEXT_MAP } from "@/class/Sorter";
import {
  type SorterFields,
  type SorterSchemaParams,
  SorterFieldsName,
  createSorterSchema,
} from "@/validation/sorterField";
import VerifySelect from "@/components/basic/VerifySelect.vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update:sorters", sorters: Sorter<T, TypeMap>[]): void;
}>();

const props = defineProps<
  { sorters: Sorter<T, TypeMap>[] } & SorterSchemaParams<T, TypeMap>
>();

const { handleSubmit, values, setFieldValue } = useForm<
  SorterFields<T, TypeMap>
>({
  validationSchema: object({
    ...createSorterSchema<T, TypeMap>({
      targetTypeMap: props.targetTypeMap,
      targetTextMap: props.targetTextMap,
    }),
  }),
});

const addSorterHandler = handleSubmit((values) => {
  emit("update:sorters", [...(props.sorters || []), new Sorter(values)]);
  emit("close");
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
  () => values[SorterFieldsName.FIELD],
  (val) => {
    const type = props.targetTypeMap[val];
    if (
      !type ||
      type === FieldTypes.SELECT ||
      type === FieldTypes.MULTI_SELECT
    ) {
      throw new Error("Invalid Field");
    }
    setFieldValue(SorterFieldsName.TYPE, type);
    setFieldValue(SorterFieldsName.DIRECTION, directionOptions.value[0].value);
  },
);
</script>

<template>
  <form @keypress.enter.prevent>
    <div class="mb-2">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ SorterFieldsName.FIELD }}
        </div>
      </label>
      <VerifySelect
        :field="SorterFieldsName.FIELD"
        :options="fieldOptions"
        :default-value="fieldOptions[0].value"
        placeholder="Choose Field to Filter"
      />
    </div>

    <div v-if="values[SorterFieldsName.TYPE]">
      <label class="block mb-1 text-gray-500 text-xs font-bold">
        <div class="first-letter:text-base uppercase">
          {{ SorterFieldsName.DIRECTION }}
        </div>
      </label>
      <VerifySelect
        :field="SorterFieldsName.DIRECTION"
        :options="directionOptions"
        :default-value="directionOptions[0].value"
        placeholder="Choose Sort Direction"
      />
    </div>

    <div class="flex mt-3">
      <ButtonBasic
        class="w-full mr-2"
        :theme="'primary-outline'"
        :text="'CANCEL'"
        @click="emit('close')"
      />
      <ButtonBasic class="w-full" :text="'ADD'" @click="addSorterHandler" />
    </div>
  </form>
</template>

<style scoped></style>
