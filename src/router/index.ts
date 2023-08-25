import { createRouter, createWebHistory, type Router } from "vue-router";

import DailyView from "@/views/DailyView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ErrorPage404 from "@/views/error/ErrorPage404.vue";
import ErrorPage500 from "@/views/error/ErrorPage500.vue";

import { pipelineGuard } from "./middleware/index";
import { checkDailyStampMiddleware } from "./middleware/daily";
import { timestampCalculator } from "@/helper/timestampCalculator";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {
        name: "Today",
      },
      meta: {
        middleware: [],
      },
    },
    {
      path: "/today",
      name: "Today",
      redirect: {
        name: "Daily",
        params: { date: timestampCalculator("today") },
      },
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
      redirect: { name: "Error404" },
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
