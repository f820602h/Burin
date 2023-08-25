import "vue-router";
import { RouteLocationNormalized } from "vue-router";
import { Middleware } from "@/router/middleware/types";

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>;
    typedValues<T>(obj: T): Array<T[keyof T]>;
    typedEntries<T>(obj: T): Array<[keyof T, T[keyof T]]>;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    title?: string | ((route: RouteLocationNormalized) => string);
    middleware: Middleware[];
  }
}
