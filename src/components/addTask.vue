<template>
  <TaskForm title="Add New Task!" @save="onSave" @cancel="cancelForm" />

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import TaskForm from "./TaskForm.vue";
import type TaskData from "@/type/task";
import type { Snackbar } from "@/type/snackbar";

const router = useRouter();

const snackbar = ref<Snackbar>({
  show: false,
  message: "",
  color: "success",
});

const saveForm = async (data: { name: string; estimatedTime: string }) => {
  const taskData: TaskData = {
    name: data.name,
    estimatedTime: data.estimatedTime,
  };

  try {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    return res.ok;
  } catch (error) {
    console.error("Error saving task:", error);
    return false;
  }
};

const onSave = async (data: { name: string; estimatedTime: string }) => {
  const isSuccess = await saveForm(data);

  if (isSuccess) {
    snackbar.value = {
      show: true,
      message: "Task saved successfully!",
      color: "success",
    };
    setTimeout(() => router.push("/"), 1000);
  } else {
    snackbar.value = {
      show: true,
      message: "Failed to save task",
      color: "error",
    };
  }
};

const cancelForm = () => {
  router.push("/");
};
</script>
