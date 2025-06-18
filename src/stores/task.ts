// stores/task.ts
import { defineStore } from 'pinia'
import type { Task } from '@/type/home'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    taskToEdit: null as Task | null
  }),
  actions: {
    setTaskToEdit(task: Task) {
      this.taskToEdit = task
    }
  }
})

