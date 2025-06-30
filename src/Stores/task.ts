import { ref } from "vue";
import { defineStore } from "pinia";
import type { Task } from "@/type/home";

export const useTaskStore = defineStore("task", () => {
  const taskToEdit = ref<Task | null>(null);

  const updateTask = async (id: string, params: { name: string; estimatedTime: string }) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: params.name,
          estimatedTime: params.estimatedTime,
        }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateCompleted = async (task: Task) => {
    try {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: task.completed,
        }),
      });
    } catch (error: any) {
      console.error("Failed to update completion status:", error.message);
    }
  };

  return {
    taskToEdit,
    updateTask,
    updateCompleted,
  };
});
