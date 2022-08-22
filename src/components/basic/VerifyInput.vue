<script setup lang="ts">
import { toRef, computed } from "vue";
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    value: string;
    type: string;
    name?: string;
    placeholder?: string;
  }>(),
  {
    value: "",
    type: "",
    name: "",
    placeholder: "",
  }
);

const name = toRef(props, "name");

const { value, errorMessage, meta, handleChange, handleBlur } = useField(
  name,
  undefined,
  {
    initialValue: props.value,
    validateOnValueUpdate: false,
  }
);

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleBlur,
      change: handleChange,
      input: (e: Event) => handleChange(e, false),
    };
  }
  return {
    blur: handleBlur,
    change: handleChange,
    input: handleChange,
  };
});
</script>

<template>
  <div
    class="vee-field relative"
    :class="{ invalid: !!errorMessage, success: meta.valid }"
  >
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      v-on="validationListeners"
    />
    <slot name="error" :errorMessage="errorMessage" :meta="meta"></slot>
  </div>
</template>

<style scoped></style>
