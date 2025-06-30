<template>
  <TaskForm
    title="Edit Task!"
    :taskData="taskStore.taskToEdit"
    :isEdit="true"
    @save="editSaveForm"
    @cancel="navigateCancelForm"
  />

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from vue
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task";
import TaskForm from "./TaskForm.vue";
import type { Snackbar } from '@/type/snackbar';

const taskStore = useTaskStore();
const router = useRouter();

const snackbar = ref<Snackbar>({
  show: false,
  message: '',
  color: 'success',
});

const editSaveForm = async (task: { name: string; estimatedTime: string }) => {
  const id = taskStore.taskToEdit?.id;
  if (!id) return;

  const success = await taskStore.updateTask(id, task);

  if (success){
    snackbar.value = {
      show: true,
      message: 'Task updated successfully!',
      color: 'success'
    };
    setTimeout(() => router.push('/'), 1000)
  }else{
    snackbar.value = {
      show: true,
      message: 'Failed to update task',
      color: 'error'
    };
  }
};

const navigateCancelForm = () => {
  router.push("/");
};
</script>
