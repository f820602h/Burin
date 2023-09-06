<script setup lang="ts">
import { toRef, computed, h, type VNodeChild } from "vue";
import { useField } from "vee-validate";
import { NSelect, type SelectOption } from "naive-ui";
import TagPill from "@/components/basic/TagPill.vue";

const props = withDefaults(
  defineProps<{
    defaultValue?: string[] | number[];
    options: SelectOption[];
    field: string;
    placeholder?: string;
    showError?: boolean;
    onCreateOption?: (
      inputValue: string,
    ) => string | number | Promise<string | number>;
  }>(),
  {
    defaultValue: () => [],
    placeholder: "",
    showError: true,
    onCreateOption: undefined,
  },
);

const field = toRef(props, "field");

const {
  value: binding,
  errorMessage: bindingErrorMessage,
  meta: bindingMeta,
  handleChange: bindingHandleChange,
} = useField(`${field.value}.binding`, undefined, {
  initialValue: props.defaultValue,
});
const {
  value: adding,
  errorMessage: addingErrorMessage,
  meta: addingMeta,
  handleChange: addingHandleChange,
  handleReset: addingHandleReset,
} = useField(`${field.value}.adding`, undefined, {
  initialValue: "",
});

const anyError = computed<boolean>(() => {
  return !!addingErrorMessage.value || !!bindingErrorMessage.value;
});

function createTag({ option }: { option: SelectOption }): VNodeChild {
  return h("div", { class: "my-[2px]" }, [
    h(h(TagPill), {
      modelValue: binding.value,
      label: option.label,
      value: option.value,
      deletable: true,
      "onUpdate:modelValue": bindingHandleChange,
    }),
  ]);
}

function createLabel(option: SelectOption): VNodeChild {
  const isNew = String(option.value)?.startsWith("new-tag:");
  const newLabel = h(
    "div",
    { class: "flex mr-2 px-1 py-[2px] rounded bg-green-600" },
    [h("span", { class: "text-xs font-bold text-white" }, "NEW")],
  );
  return h("div", { class: "flex items-center" }, [
    isNew ? newLabel : undefined,
    `${option.label}`,
  ]);
}

async function createOption(): Promise<void> {
  if (!props.onCreateOption) return;
  const newValue = await props.onCreateOption(adding.value);
  bindingHandleChange([...binding.value, newValue]);
}
</script>

<template>
  <div class="tag-selector">
    <NSelect
      v-model:value="binding"
      multiple
      filterable
      :input-props="{ value: adding }"
      :options="options"
      :placeholder="placeholder"
      :status="anyError ? 'error' : undefined"
      :show-arrow="false"
      :render-tag="createTag"
      :render-label="createLabel"
      :on-search="addingHandleChange"
      :on-blur="addingHandleReset"
    >
      <template v-if="anyError" #action>
        <div class="min-h-4 mt-1 text-xs text-right text-red-600">
          <template v-if="!!addingErrorMessage">
            {{ addingErrorMessage }}
          </template>
          <template v-else-if="!!bindingErrorMessage">
            {{ bindingErrorMessage }}
          </template>
        </div>
      </template>

      <template #empty>
        <template v-if="!props.onCreateOption">
          <div class="text-sm">There is no corresponding option</div>
        </template>

        <template v-else>
          <div class="flex items-center w-full">
            <div
              class="flex items-center flex-1 p-1 rounded bg-white/10 truncate"
            >
              <div class="flex mr-2 px-1 py-[2px] rounded bg-green-600">
                <span class="text-xs font-bold text-white">NEW</span>
              </div>
              <div class="text-sm truncate">{{ adding }}</div>
            </div>

            <ButtonBasic
              class="flex-shrink-0 ml-1"
              :size="'sm'"
              :text="'+ Add'"
              :disabled="anyError"
              @click="createOption"
            />
          </div>
        </template>
      </template>
    </NSelect>

    <slot
      v-if="showError"
      name="error"
      :adding-error-message="addingErrorMessage"
      :adding-meta="addingMeta"
      :binding-error-message="bindingErrorMessage"
      :binding-meta="bindingMeta"
    >
      <div class="min-h-4 mt-1 text-xs text-right text-red-600 empty:hidden">
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

<style lang="scss">
.n-base-select-menu__empty {
  padding: 12px !important;
}
</style>

<style scoped lang="scss"></style>
