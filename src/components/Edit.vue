<template>
 <TaskForm
  title="Edit Task!"
  :taskData="taskToEdit"
  @save="updateForm"
  @cancel="cancelForm"
/>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { useTaskStore } from "@/stores/task";
import TaskForm from "./TaskForm.vue";

const router = useRouter();
const taskStore = useTaskStore();
const taskToEdit = taskStore.taskToEdit;

const updateForm = async (data: { task: string; estimatedTime: string }) => {
  if (!taskStore.taskToEdit) {
    alert("No task selected for editing.");
    return;
  }

  const updatedTask = {
    ...taskStore.taskToEdit,
    name: data.task,
    estimatedTime: data.estimatedTime,
  };

  try {
    await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedTask.name,
        estimatedTime: updatedTask.estimatedTime,
      }),
    });

    alert("Task updated successfully");
    taskStore.taskToEdit = null;
    router.push("/");
  } catch (err) {
    console.error("Update failed:", err);
    alert("Something went wrong while updating the task");
  }
};

const cancelForm = () => {
  router.push("/");
};
</script>
