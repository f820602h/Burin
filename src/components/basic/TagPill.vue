<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import isEqual from "lodash/isEqual";

type TagProps<T> = {
  label: string;
  value?: T;
  modelValue?: T | T[];
  clickable?: boolean;
  deletable?: boolean;
};

const props = withDefaults(defineProps<TagProps<any>>(), {
  label: "",
  value: undefined,
  modelValue: undefined,
  clickable: false,
  deletable: false,
});
const emit = defineEmits<{
  (e: "update:model-value", value: typeof props.value): void;
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
  if (!props.clickable) return;
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue, props.value];
    emit("update:model-value", newValue);
  } else {
    emit("update:model-value", props.value);
  }
}

function handleDelete(): void {
  if (!props.deletable) return;
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
    <span>{{ label }}</span>
    <span
      v-if="deletable"
      class="icon-cancel ml-1 cursor-pointer duration-150 hover:opacity-50"
      @click="handleDelete"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.tag-pill {
  font-size: 12px;
  color: white;
  background: #64748b;
}
</style>