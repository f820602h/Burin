<script setup lang="ts" generic="T, TypeMap extends FieldTypeMap<T>">
import { type FieldTypeMap, FieldTypes } from "@/types/fieldType";
import {
  Filter,
  FilterOperator,
  FILTER_OPERATORS_TEXT_MAP,
} from "@/class/Filter";
import TagPill from "@/components/basic/TagPill.vue";

defineProps<{
  filter: Filter<T, TypeMap>;
  formatField?: (config: Filter<T, TypeMap>["config"]) => string;
  formatCondition?: (config: Filter<T, TypeMap>["config"]) => string;
  formatStringValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatNumberValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatDurationValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatTimeValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatTimeBetweenValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatSelectValue?: (config: Filter<T, TypeMap>["config"]) => string;
  formatMultiSelectValue?: (config: Filter<T, TypeMap>["config"]) => string[];
}>();
</script>

<template>
  <div class="flex flex-col mt-2 first:mt-0 p-1 rounded text-sm bg-gray-600">
    <div class="flex mb-1 px-1">
      <div class="font-bold">
        {{ formatField?.(filter.config) || filter.config.field }}
      </div>

      <div class="ml-2 text-gray-400">
        {{
          formatCondition?.(filter.config) ||
          FILTER_OPERATORS_TEXT_MAP[filter.config.condition]
        }}
      </div>
    </div>

    <div class="flex-center-center py-[6px] px-2 rounded bg-black/30">
      <div class="text-base text-center truncate">
        <template v-if="filter.config.type === FieldTypes.STRING">
          {{
            formatStringValue?.(filter.config) ||
            filter.config.value[filter.config.type]
          }}
        </template>
        <template v-if="filter.config.type === FieldTypes.NUMBER">
          {{
            formatNumberValue?.(filter.config) ||
            filter.config.value[filter.config.type]
          }}
        </template>
        <template v-if="filter.config.type === FieldTypes.DURATION">
          {{
            formatDurationValue?.(filter.config) ||
            filter.config.value[filter.config.type]
              .map((n) => String(n).padStart(2, "0"))
              .join(":")
          }}
        </template>
        <template v-if="filter.config.type === FieldTypes.TIME">
          <template v-if="filter.config.condition === FilterOperator.BETWEEN">
            {{
              formatTimeBetweenValue?.(filter.config) ||
              filter.config.value[filter.config.type][filter.config.condition]
                .map((time) =>
                  time.map((n) => String(n).padStart(2, "0")).join(":"),
                )
                .join(" ~ ")
            }}
          </template>
          <template v-if="filter.config.condition === FilterOperator.AFTER">
            {{
              formatTimeValue?.(filter.config) ||
              filter.config.value[filter.config.type][filter.config.condition]
                .map((n) => String(n).padStart(2, "0"))
                .join(":")
            }}
          </template>
          <template v-if="filter.config.condition === FilterOperator.BEFORE">
            {{
              formatTimeValue?.(filter.config) ||
              filter.config.value[filter.config.type][filter.config.condition]
                .map((n) => String(n).padStart(2, "0"))
                .join(":")
            }}
          </template>
        </template>

        <template v-if="filter.config.type === FieldTypes.SELECT">
          {{
            formatSelectValue?.(filter.config) ||
            filter.config.value[filter.config.type]
          }}
        </template>

        <template v-if="filter.config.type === FieldTypes.SELECT">
          {{
            formatSelectValue?.(filter.config) ||
            filter.config.value[filter.config.type]
          }}
        </template>

        <template v-if="filter.config.type === FieldTypes.MULTI_SELECT">
          <div class="flex flex-wrap">
            <TagPill
              v-for="(label, index) in formatMultiSelectValue?.(
                filter.config,
              ) || filter.config.value[filter.config.type]"
              :key="index"
              class="mx-1 my-[2px]"
              :prefix="'#'"
              :label="String(label)"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
