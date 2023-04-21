import { createRouter, createWebHistory, type Router } from "vue-router";
import { pipelineGuard } from "./middleware/index";
import ProgressView from "@/views/ProgressView.vue";

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
  ],
});

router.beforeEach(pipelineGuard);

export default router;
