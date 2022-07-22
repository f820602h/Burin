import { createRouter, createWebHistory } from "vue-router";
import PunchCardView from "@/views/PunchCardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PunchCardView,
    },
  ],
});

export default router;
