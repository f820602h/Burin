<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import { NSelect, type SelectOption } from "naive-ui";

const props = withDefaults(
  defineProps<{
    defaultValue?: SelectOption["value"];
    options: SelectOption[];
    field: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    defaultValue: undefined,
    placeholder: "",
    disabled: false,
  }
);

const field = toRef(props, "field");
const { value, errorMessage, meta } = useField(field, undefined, {
  initialValue: props.defaultValue,
});
</script>

<template>
  <div class="vee-field relative">
    <NSelect
      v-model:value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="!!errorMessage ? 'error' : undefined"
      :options="options"
    />

    <slot name="error" :error-message="errorMessage" :meta="meta">
      <div class="min-h-4 mt-1 text-xs text-right text-red-600 empty:hidden">
        <template v-if="!!errorMessage">{{ errorMessage }}</template>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
select {
  @apply block w-full h-9 px-2 border border-transparent rounded outline-none leading-9 bg-gray-700 duration-150 hover:border-primary-300 focus:border-primary-300;
}
</style>
