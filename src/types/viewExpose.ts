import type { Ref, VNode } from "vue";

export interface ViewExpose {
  title?: string | Ref<string>;
  subtitle?: string | Ref<string>;
  extra?: VNode[];
}
