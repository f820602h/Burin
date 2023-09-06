<script setup lang="ts">
import { toRef, computed } from "vue";
import { useField } from "vee-validate";
import { NTimePicker } from "naive-ui";

const props = withDefaults(
  defineProps<{
    defaultValue?: [number, number];
    field: string;
    placeholder?: string;
    disabled?: boolean;
    showError?: boolean;
  }>(),
  {
    defaultValue: () => [0, 0],
    placeholder: "",
    disabled: false,
    showError: true,
  },
);

const field = toRef(props, "field");
const {
  value: hour,
  errorMessage: hourErrorMessage,
  meta: hourMeta,
  handleChange: hourHandleChange,
} = useField(`${field.value}[0]`, undefined, {
  initialValue: props.defaultValue?.[0],
});
const {
  value: minute,
  errorMessage: minuteErrorMessage,
  meta: minuteMeta,
  handleChange: minuteHandleChange,
} = useField(`${field.value}[1]`, undefined, {
  initialValue: props.defaultValue?.[1],
});

const anyError = computed<boolean>(() => {
  return !!hourErrorMessage.value || !!minuteErrorMessage.value;
});

const formattedValue = computed<string>(() => {
  const hourText = String(hour.value).padStart(2, "0");
  const minuteText = String(minute.value).padStart(2, "0");
  return `${hourText}:${minuteText}`;
});

function onUpdate(value: number | null, formattedValue: string | null): void {
  hourHandleChange(Number(formattedValue?.split(":")[0]));
  minuteHandleChange(Number(formattedValue?.split(":")[1]));
}
</script>

<template>
  <div class="relative">
    <NTimePicker
      :formatted-value="formattedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="!!anyError ? 'error' : undefined"
      :input-readonly="true"
      :format="'HH:mm'"
      :value-format="'HH:mm'"
      :time-zone="Intl.DateTimeFormat().resolvedOptions().timeZone"
      :on-update:value="onUpdate"
    />
    <slot
      v-if="showError"
      name="error"
      :hour-error-message="hourErrorMessage"
      :hour-meta="hourMeta"
      :minute-error-message="minuteErrorMessage"
      :minute-meta="minuteMeta"
    >
      <div class="min-h-4 mt-1 text-xs text-right text-red-600 empty:hidden">
        <template v-if="!!hourErrorMessage">
          {{ hourErrorMessage }}
        </template>
        <template v-else-if="!!minuteErrorMessage">
          {{ minuteErrorMessage }}
        </template>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply block w-full h-9 px-2 border border-transparent rounded outline-none leading-9 bg-gray-700 duration-150 hover:border-primary-300 focus:border-primary-300;
}
</style>
