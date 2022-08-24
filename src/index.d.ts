import "vue-router";
import { Middleware } from "@/router/middleware/types";

export {};

declare module "vue-router" {
  interface RouteMeta {
    middleware: Middleware[];
  }
}
