import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Homeview.vue";
import TaskView from "../views/TaskView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/task",
      name: "task",
      component: TaskView,
    },
  ],
});
export default router;
