import { ref } from "vue";
import { defineStore } from "pinia";
import { Task } from "@/type/home";

export const useTaskStore = defineStore("task", () => {
  const taskToEdit = ref<Task | null>(null);
  const tasks = ref<Task[]>([])

  function getTasks(task: Task) {
    taskToEdit.value = task;
    try{
      const res =''
tasks.value = res.data
    }catch{
      //
    }
  }

  function updateTask(taskId) {
    try{
      
    }
  }

  return {
    taskToEdit,
    setTaskToEdit,
  };
});
