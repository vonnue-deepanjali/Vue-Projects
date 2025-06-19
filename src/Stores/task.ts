import { defineStore } from "pinia";
import type { Task } from "@/type/home";

export const useTaskStore = defineStore("task", {
  state: () => ({
    taskToEdit: null as Task | null,
  }),
  actions: {
    setTaskToEdit(task: Task) {
      this.taskToEdit = task;
    },
  },
});