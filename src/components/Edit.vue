<template>
 <TaskForm
  title="Edit Task!"
  :taskData="taskStore.taskToEdit"
  :isEdit="true"
  @save="updateForm"
  @cancel="cancelForm"
/>

</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import { useRouter } from 'vue-router'

import TaskForm from "./TaskForm.vue";


const taskStore = useTaskStore()
const router = useRouter()


const updateForm = async (task: { name: string; estimatedTime: string }) => {
  const id = taskStore.taskToEdit?.id;
  if (!id) {
    return false;
  }

  const success = await taskStore.updateTask(id, {
    name: task.name,
    estimatedTime: task.estimatedTime,
  });

  if (success) {
    router.push("/"); 
  }

  return success; 
};


  


const cancelForm = () => {
  router.push("/");
};
</script>


