<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { type FieldTypeMap } from "@/types/fieldType";
import { Sorter, SORTER_DIRECTION_TEXT_MAP } from "@/class/Sorter";

defineProps<{
  sorter: Sorter<T, TypeMap>;
  formatField?: (config: Sorter<T, TypeMap>["config"]) => string;
  formatDirection?: (config: Sorter<T, TypeMap>["config"]) => string;
}>();
</script>

<template>
  <div class="flex flex-col mt-2 first:mt-0 p-1 rounded text-sm bg-gray-600">
    <div class="flex mb-1 px-1">
      <div class="font-bold">
        {{ formatField?.(sorter.config) || sorter.config.field }}
      </div>
    </div>

    <div class="flex-center-center py-[6px] px-2 rounded bg-black/30">
      <div class="text-base text-center truncate">
        {{
          formatDirection?.(sorter.config) ||
          SORTER_DIRECTION_TEXT_MAP[sorter.config.direction]
        }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
