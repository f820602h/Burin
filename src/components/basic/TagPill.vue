<script setup lang="ts" generic="T">
import { computed } from "vue";
import isEqual from "lodash-es/isEqual";

const props = withDefaults(
  defineProps<{
    label: string;
    value?: T;
    modelValue?: T | T[];
    prefix?: string;
    clickable?: boolean;
    deletable?: boolean;
  }>(),
  {
    label: "",
    value: undefined,
    modelValue: undefined,
    prefix: "",
    clickable: false,
    deletable: false,
  },
);
const emit = defineEmits<{
  (e: "update:model-value", value: T | T[]): void;
}>();

const isActive = computed<boolean>(() => {
  if (!props.clickable) return false;
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some((v) => isEqual(v, props.value));
  } else {
    return isEqual(props.modelValue, props.value);
  }
});

function handleClick(): void {
  if (!props.clickable || !props.value) return;
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue, props.value];
    emit("update:model-value", newValue);
  } else {
    emit("update:model-value", props.value);
  }
}

function handleDelete(): void {
  if (!props.deletable || !props.value) return;
  if (Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter((v) => !isEqual(v, props.value));
    emit("update:model-value", newValue);
  } else {
    emit("update:model-value", props.value);
  }
}
</script>

<template>
  <div
    class="tag-pill flex items-center px-2 py-[2px] rounded-full"
    :class="{ isActive, 'cursor-pointer': clickable }"
    @click="handleClick"
  >
    <span class="truncate">{{ prefix + label }}</span>
    <span
      v-if="deletable"
      class="icon-cancel ml-1 cursor-pointer duration-150 hover:opacity-50"
      @click.stop="handleDelete"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.tag-pill {
  @apply text-xs text-white;
  background: #64748b;
}
</style>
