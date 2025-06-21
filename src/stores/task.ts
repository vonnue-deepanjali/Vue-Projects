import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/type/home'

export const useTaskStore = defineStore('task', () => {
  const taskToEdit = ref<Task | null>(null)

  return {
    taskToEdit
  }
})
