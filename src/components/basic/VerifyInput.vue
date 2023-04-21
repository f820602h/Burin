<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    type: string;
    field: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    defaultValue: "",
    type: "text",
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
  <div class="relative">
    <input
      :id="field"
      v-model="value"
      :name="field"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="{ isInvalid: errorMessage }"
    />
    <slot name="error" :error-message="errorMessage" :meta="meta">
      <div class="min-h-4 mt-1 text-xs text-right text-red-600">
        <template v-if="!!errorMessage">{{ errorMessage }}</template>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply block w-full h-9 px-2 border border-transparent rounded outline-none leading-9 bg-gray-700 duration-150 hover:border-violet-400 focus:border-violet-400;

  &.isInvalid {
    @apply border-red-500;
  }
}
</style>
