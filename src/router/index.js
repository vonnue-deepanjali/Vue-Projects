import { createRouter, createWebHistory } from "vue-router";
import TaskView from "../views/TaskView.vue";
import HomeView from "../views/HomeView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
