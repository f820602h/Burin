import "vue-router";
import { RouteLocationNormalized } from "vue-router";
import { Middleware } from "@/router/middleware/types";

declare module "vue-router" {
  interface RouteMeta {
    title?: string | ((route: RouteLocationNormalized) => string);
    middleware: Middleware[];
  }
}
