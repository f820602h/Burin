import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import MainView from "@/views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: RootView,
      children: [
        {
          path: "/",
          name: "main",
          component: MainView,
        },
      ],
    },
  ],
});

export default router;
