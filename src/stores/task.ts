import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/type/home'

export const useTaskStore = defineStore('task', () => {
  const taskToEdit = ref<Task | null>(null)
  const tasks = ref<Task[]>([])

  // ✅ Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks")

      if (!res.ok) {
        throw new Error(`Failed to fetch tasks: HTTP ${res.status}`)
      }

      const data = await res.json()
      tasks.value = data.reverse()
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message)
    }
  }

  // ✅ Add a new task
  const addTask = async (data: { name: string; estimatedTime: string }) => {
    const taskData = {
      name: data.name,
      estimatedTime: data.estimatedTime,
      completed: false, // default for new tasks
    };

    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        throw new Error(`Failed to add task: HTTP ${res.status}`);
      }

      const createdTask = await res.json();

      // Add new task at the top for instant reactivity
      tasks.value = [createdTask, ...tasks.value];

      return true;
    } catch (error: any) {
      console.error("Error adding task:", error.message);
      return false;
    }
  };

  // ✅ Update a task's name and estimated time
  const updateTask = async (id: string, params: { name: string; estimatedTime: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: params.name,
          estimatedTime: params.estimatedTime,
        }),
      });

      if (!response.ok) {
        console.error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated task:", data);

      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Toggle task completion
  const updateCompleted = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: task.completed,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to update completion status with status: ${response.status}`);
      } else {
        await fetchTasks();
      }
    } catch (error: any) {
      console.error("Failed to update completion status:", error.message);
    }
  };

  // ✅ Delete a single task
  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: HTTP ${response.status}`);
      }

      tasks.value = tasks.value.filter((t) => t.id !== taskId);
    } catch (error: any) {
      console.error("Failed to delete task:", error.message);
    }
  };

  // ✅ Delete all tasks
  const deleteAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete all tasks: HTTP ${response.status}`);
      }

      tasks.value = [];
    } catch (error: any) {
      console.error("Failed to delete all tasks:", error.message);
    }
  };

  return {
    taskToEdit,
    tasks,
    fetchTasks,
    addTask,
    updateTask,
    updateCompleted,
    deleteTask,
    deleteAllTasks,
  };
});
