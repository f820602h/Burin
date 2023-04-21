<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "@/class/Category";
import { useCategoryStore } from "@/stores/category";
import TagPill from "@/components/basic/TagPill.vue";

const props = defineProps<{
  categoryId?: Category["id"];
  category?: Category;
}>();

const categoryStore = useCategoryStore();

const category = computed<Category | undefined>(() => {
  return props.category
    ? props.category
    : categoryStore.categories.find((cate) => cate.id === props.categoryId);
});
</script>

<template>
  <div>
    <TagPill
      v-if="category"
      v-bind="$attrs"
      :label="'#' + category.category"
      :value="category.id"
    />
  </div>
</template>

<style scoped></style>
