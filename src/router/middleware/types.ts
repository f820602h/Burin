import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

export interface Middleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
    done: () => void
  ): void;
}
