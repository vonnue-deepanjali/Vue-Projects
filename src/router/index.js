import { createRouter, createWebHistory } from "vue-router";
import Homeview from "../views/HomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Homeview,
    },
  ],
});
export default router;
