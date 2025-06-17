import { createRouter, createWebHistory } from "vue-router";
import Homeview from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Homeview,
    },
    {
      path: "/task",
      name: "task",
      component: TaskView,
    },
  ],
});
export default router;
