<script setup lang="ts">
import { ref, toRef, computed } from "vue";
import { useField } from "vee-validate";
import type { Log } from "@/class/Log";
import type { Category } from "@/class/Category";
import { useCategoryStore } from "@/stores/category";
import CategoryTag from "@/components/common/CategoryTag.vue";

const props = withDefaults(
  defineProps<{
    defaultValue?: Log["categories"];
    field: string;
    placeholder?: string;
  }>(),
  { defaultValue: () => [], placeholder: "" }
);

const categoryStore = useCategoryStore();
const addingInput = ref<HTMLElement | null>(null);
const option = ref<HTMLElement[] | null>(null);
const newOption = ref<HTMLElement | null>(null);
const isFocused = ref<boolean>(false);
const hoverOptionIndex = ref<number>(0);
const newOptionIndex = ref<number>(-1);

const field = toRef(props, "field");

const {
  value: binding,
  errorMessage: bindingErrorMessage,
  meta: bindingMeta,
} = useField(`${field.value}.binding`, undefined, {
  initialValue: props.defaultValue,
});
const {
  value: adding,
  errorMessage: addingErrorMessage,
  meta: addingMeta,
} = useField(`${field.value}.adding`, undefined, {
  initialValue: "",
});

const hitCategory = computed<Category | undefined>(() => {
  return categoryStore.categories.find(
    (cate) => cate.category === adding.value
  );
});

const optionsFirstIndex = computed<number>(() => {
  return adding.value && !hitCategory.value ? newOptionIndex.value : 0;
});

// watch(hoverOptionIndex, (index) => {
//   optionScrollIntoView(index);
// });

function switchTag(cateId: Category["id"]): void {
  if (binding.value.includes(cateId)) {
    binding.value = binding.value.filter((id) => id !== cateId);
  } else {
    binding.value = [...binding.value, cateId];
  }
  adding.value = "";
}

function optionScrollIntoView(index: number) {
  if (option.value?.[index]) {
    option.value[index].scrollIntoView({ block: "nearest" });
  } else if (newOption.value && index === newOptionIndex.value) {
    newOption.value.scrollIntoView({ block: "nearest" });
  }
}

async function addingTag(): Promise<void> {
  if (!hitCategory.value && !!adding.value.trim()) {
    await categoryStore._actCreateCategory({ category: adding.value });
  }
  if (hitCategory.value) {
    switchTag(hitCategory.value.id);
  }
}

function keyboardControl(e: KeyboardEvent): void {
  if (!categoryStore.categories.length || !option.value) return;
  switch (e.code) {
    case "Enter":
      if (hoverOptionIndex.value >= 0) {
        switchTag(categoryStore.categories[hoverOptionIndex.value].id);
      } else if (hoverOptionIndex.value === newOptionIndex.value) {
        addingTag();
      }
      break;

    case "ArrowUp":
      hoverOptionIndex.value =
        hoverOptionIndex.value <= optionsFirstIndex.value
          ? categoryStore.categories.length - 1
          : hoverOptionIndex.value - 1;
      optionScrollIntoView(hoverOptionIndex.value);
      break;

    case "ArrowDown":
      hoverOptionIndex.value =
        hoverOptionIndex.value >= categoryStore.categories.length - 1
          ? optionsFirstIndex.value
          : hoverOptionIndex.value + 1;
      optionScrollIntoView(hoverOptionIndex.value);
      break;

    default:
      break;
  }
}

function handleInput(): void {
  hoverOptionIndex.value = hitCategory.value
    ? categoryStore.categories.findIndex((cate) => cate === hitCategory.value)
    : newOptionIndex.value;
  optionScrollIntoView(hoverOptionIndex.value);
}

function handleFocus(): void {
  isFocused.value = true;
  hoverOptionIndex.value = optionsFirstIndex.value;
  optionScrollIntoView(hoverOptionIndex.value);
}

function handleBlur(): void {
  isFocused.value = false;
}
</script>

<template>
  <div>
    <div
      :id="field"
      :name="field"
      class="tag-selector"
      :class="{ isFocused, isInvalid: bindingErrorMessage }"
      tabindex="0"
      @focus="addingInput?.focus()"
      @click="addingInput?.focus()"
    >
      <template v-if="!isFocused && !binding.length && placeholder">
        <div class="text-gray-400">{{ placeholder }}</div>
      </template>

      <div v-for="cateId in binding" :key="cateId" class="mr-2 my-1">
        <CategoryTag
          v-model="binding"
          :category-id="cateId"
          :deletable="true"
          @click.stop
        />
      </div>

      <input
        ref="addingInput"
        v-model.trim="adding"
        type="text"
        class="bg-transparent outline-none"
        :class="{ 'w-0': !isFocused }"
        @keydown="keyboardControl"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div
        v-if="isFocused && categoryStore.categories.length"
        class="tag-selector__dropdown"
      >
        <div
          v-if="adding && !hitCategory && !addingErrorMessage"
          ref="newOption"
          class="tag-selector__option flex-between-center"
          :class="{ isHovered: hoverOptionIndex === newOptionIndex }"
          @mousedown.prevent
          @mouseenter="hoverOptionIndex = newOptionIndex"
          @click="addingTag"
        >
          <div>{{ adding }}</div>
          <div class="px-1 py-[2px] text-xs font-bold rounded bg-green-600">
            NEW
          </div>
        </div>
        <div
          v-for="(cate, index) in categoryStore.categories"
          ref="option"
          :key="cate.id"
          class="tag-selector__option"
          :class="{
            isSelected: binding.includes(cate.id),
            isHovered: hoverOptionIndex === index,
          }"
          @mousedown.prevent
          @mouseenter="hoverOptionIndex = index"
          @click="switchTag(cate.id)"
        >
          {{ cate.category }}
        </div>
      </div>
    </div>

    <slot
      name="error"
      :adding-error-message="addingErrorMessage"
      :adding-meta="addingMeta"
      :binding-error-message="bindingErrorMessage"
      :binding-meta="bindingMeta"
    >
      <div class="min-h-4 mt-1 text-xs text-right text-red-600">
        <template v-if="!!addingErrorMessage">
          {{ addingErrorMessage }}
        </template>
        <template v-else-if="!!bindingErrorMessage">
          {{ bindingErrorMessage }}
        </template>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.tag-selector {
  @apply relative flex items-center flex-wrap min-h-9 px-2 py-[2px] border border-transparent rounded outline-none bg-gray-700 duration-150 cursor-pointer hover:border-primary-300;

  &.isFocused {
    @apply border-primary-300;
  }

  &.isInvalid {
    @apply border-red-500;
  }

  &__dropdown {
    @apply absolute top-full left-0 w-full max-h-[140px] p-1 rounded bg-gray-600 overflow-auto translate-y-1;
  }

  &__option {
    @apply h-8 px-2 rounded leading-8 duration-150 cursor-pointer;

    &.isHovered {
      @apply bg-slate-500;
    }

    &.isSelected {
      @apply text-green-400;
    }
  }
}
</style>
