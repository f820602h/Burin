import { createRouter, createWebHistory, type Router } from "vue-router";
import { pipelineGuard } from "./middleware/index";
import ProgressView from "@/views/ProgressView.vue";
import DailyView from "@/views/DailyView.vue";

import ErrorView from "@/views/ErrorView.vue";
import ErrorPage404 from "@/views/error/ErrorPage404.vue";
import ErrorPage500 from "@/views/error/ErrorPage500.vue";

import { checkDailyStampMiddleware } from "./middleware/daily";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Progress",
      component: ProgressView,
      meta: {
        middleware: [],
      },
    },
    {
      path: "/daily/:date",
      name: "Daily",
      component: DailyView,
      meta: {
        middleware: [checkDailyStampMiddleware],
      },
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorView,
      meta: {
        middleware: [],
      },
      children: [
        {
          path: "404",
          name: "Error404",
          component: ErrorPage404,
          meta: {
            middleware: [],
          },
        },
        {
          path: "500",
          name: "Error500",
          component: ErrorPage500,
          meta: {
            middleware: [],
          },
        },
      ],
    },
    { path: "/:catchAll(.*)", redirect: { name: "Error404" } },
  ],
});

router.beforeEach(pipelineGuard);

export default router;
