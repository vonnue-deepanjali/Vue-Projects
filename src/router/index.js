import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import EditView from "../views/EditView.vue"

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
    {
      path: "/edit",
      name: "edit",
      component: EditView,
    },
  ],
});
export default router;
