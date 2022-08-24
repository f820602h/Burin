import { createRouter, createWebHistory, type Router } from "vue-router";
import { pipelineGuard } from "./middleware/index";
import MainView from "@/views/MainView.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
      meta: {
        middleware: [],
      },
    },
  ],
});

router.beforeEach(pipelineGuard);

export default router;
