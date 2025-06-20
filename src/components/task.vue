<template>
  <TaskForm
    title="Add New Task!"
    @save="saveForm"
    @cancel="cancelForm"
  />
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TaskForm from './TaskForm.vue';
import type TaskData from '@/type/task';

const router = useRouter();

const task = ref('');
const estimatedTime = ref('');


const cancelForm = (): void => {
  task.value = '';
  estimatedTime.value = '';
  router.push('/');
};

const saveForm = async (data: { task: string; estimatedTime: string }): Promise<void> => {
  const taskData: TaskData = {
    name: data.task,
    estimatedTime: data.estimatedTime,
  };

  try {
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (res.ok) {
      alert('Task saved successfully');
      router.push('/');
      cancelForm();
    } else {
      const error = await res.json();
      alert(error.message || 'Failed to save task');
    }
  } catch (error: any) {
    alert(`Error saving task: ${error.message}`);
  }
};
</script>


