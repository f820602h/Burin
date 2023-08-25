<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import { NInputNumber } from "naive-ui";

const props = withDefaults(
  defineProps<{
    defaultValue?: number;
    field: string;
    placeholder?: string;
    disabled?: boolean;
    max?: number;
    min?: number;
    showError?: boolean;
  }>(),
  {
    defaultValue: 0,
    type: "text",
    placeholder: "",
    disabled: false,
    max: undefined,
    min: undefined,
    showError: true,
  }
);

const field = toRef(props, "field");
const { value, errorMessage, meta } = useField(field, undefined, {
  initialValue: props.defaultValue,
});
</script>

<template>
  <div class="relative">
    <NInputNumber
      v-model:value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="!!errorMessage ? 'error' : undefined"
      :max="max"
      :min="min"
      type="number"
    />
    <slot
      v-if="showError"
      name="error"
      :error-message="errorMessage"
      :meta="meta"
    >
      <div class="min-h-4 mt-1 text-xs text-right text-red-600 empty:hidden">
        <template v-if="!!errorMessage">{{ errorMessage }}</template>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply block w-full h-9 px-2 border border-transparent rounded outline-none leading-9 bg-gray-700 duration-150 hover:border-primary-300 focus:border-primary-300;
}
</style>
