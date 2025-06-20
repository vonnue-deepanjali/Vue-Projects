<template>
  <TaskForm
    title="Edit Task!"
    :task="taskToEdit?.name"
    :estimatedTime="taskToEdit?.estimatedTime"
    @save="updateForm"
    @cancel="cancelForm"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/task';
import TaskForm from './TaskForm.vue';

const router = useRouter();
const taskStore = useTaskStore();
const { taskToEdit } = storeToRefs(taskStore); 

const updateForm = async (data: { task: string; estimatedTime: string }) => {
  if (!taskToEdit.value) return;

  const updatedTask = {
    ...taskToEdit.value,
    name: data.task,
    estimatedTime: data.estimatedTime
  };

  const res = await fetch(`http://localhost:7000/tasks/${updatedTask.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask)
  });

  if (res.ok) {
    alert('Task updated successfully');
    router.push('/');
  } else {
    alert('Failed to update task');
  }
};

const cancelForm = () => {
  router.push('/');
};
</script>