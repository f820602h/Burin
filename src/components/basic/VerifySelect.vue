<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    defaultValue?: SelectOption["value"][];
    field?: string;
    placeholder?: string;
    disabled?: boolean;
    options: SelectOption[];
    selectClassDefault?: string;
    selectClassInvalid?: string;
    selectClassSuccess?: string;
    optionClassDefault?: string;
    optionClassActive?: string;
  }>(),
  {
    defaultValue: undefined,
    type: "",
    field: "",
    placeholder: "",
    disabled: false,
    selectClassDefault: "",
    selectClassInvalid: "",
    selectClassSuccess: "",
    optionClassDefault: "",
    optionClassActive: "",
  }
);

const field = toRef(props, "field");
const { value, errorMessage, meta, handleChange, handleBlur } = useField(
  field,
  undefined,
  { initialValue: props.defaultValue || [] }
);

// const selectClass = computed<string>(() => {
//   if (errorMessage.value && !!props.selectClassInvalid) {
//     return props.selectClassInvalid;
//   } else if (meta.valid && !!props.selectClassSuccess) {
//     return props.selectClassSuccess;
//   } else {
//     return props.selectClassDefault;
//   }
// });
</script>

<template>
  <div class="vee-field relative">
    <div></div>
    <div v-for="selected in value" :key="selected">{{ selected }}</div>
    <select
      :id="field"
      :name="field"
      class="block w-full bg-transparent outline-none"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :multiple="true"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <slot name="error" :error-message="errorMessage" :meta="meta">
      <div class="min-h-4 mt-1 text-xs text-right text-red-600">
        <template v-if="!!errorMessage && (meta.dirty || meta.touched)">
          {{ errorMessage }}
        </template>
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
