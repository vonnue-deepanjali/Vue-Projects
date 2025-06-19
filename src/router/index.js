import { createRouter, createWebHistory } from "vue-router";
import TaskView from "../views/TaskView.vue";
import HomeView from "../views/HomeView.vue";
import EditView from "../views/EditView.vue";
import Test from "../components/Test.vue";

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
    { path: "/test", name: "test", component: Test },
  ],
});
export default router;
