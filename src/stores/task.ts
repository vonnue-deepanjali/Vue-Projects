import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/type/home'

export const useTaskStore = defineStore('task', () => {
  const taskToEdit = ref<Task | null>(null)

  
  const updateTask = async (id: string, params: { name: string; estimatedTime: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: params.name,
          estimatedTime: params.estimatedTime,
        }),
      });
  
      if (!response.ok) {
        console.error(`Failed with status: ${response.status}`);
        return false;
      }
  
      const data = await response.json();
      console.log("Updated task:", data);
  
      return true;
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  };
  
  
  

  return {
    taskToEdit,
    updateTask,
  }
})
