import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/type/home'

export const useTaskStore = defineStore('task', () => {
  const taskToEdit = ref<Task | null>(null)
  const tasks = ref<Task[]>([])

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

  const updateTask = async (id: string, params: { name: string; estimatedTime: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: params.name,
          estimatedTime: params.estimatedTime,
        }),
      })

      if (!response.ok) {
        console.error(`Failed with status: ${response.status}`)
        return false
      }

      const data = await response.json()
      console.log("Updated task:", data)

      await fetchTasks()
      return true
    } catch (error) {
      console.error("Error updating task:", error)
      return false
    }
  }

  const updateCompleted = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: task.completed,
        }),
      })

      if (!response.ok) {
        console.error(`Failed to update completion status with status: ${response.status}`)
      } else {
        await fetchTasks()
      }
    } catch (error: any) {
      console.error("Failed to update completion status:", error.message)
    }
  }

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
    updateTask,
    updateCompleted,
    deleteTask,          
    deleteAllTasks,      
  }
})
