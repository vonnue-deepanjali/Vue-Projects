<!-- <template>
  <TaskForm :title="'Add Task'" @save="saveForm" @cancel="cancelForm" />

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="10000">
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

const router = useRouter();

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
});

const cancelForm = () => {
  router.push("/");
};

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

    if (res.ok) {
      snackbar.value = {
        show: true,
        message: "Task saved successfully!",
        color: "success",
      };
      setTimeout(() => router.push("/"), 1000);
    } else {
      const error = await res.json();
      snackbar.value = {
        show: true,
        message: error.message || "Failed to save task",
        color: "error",
      };
    }
  } catch (error: any) {
    snackbar.value = {
      show: true,
      message: `Error: ${error.message}`,
      color: "error",
    };
  }
};
</script> -->


<template>
  <TaskForm title="Add New Task!"  @save="saveForm" @cancel="cancelForm" />

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
import { useTaskStore } from "@/stores/task";      
import TaskForm from "./TaskForm.vue";
import type { Snackbar } from "@/type/snackbar";

const router = useRouter();
const taskStore = useTaskStore();                 

const snackbar = ref<Snackbar>({
  show: false,
  message: "",
  color: "success",
});


const saveForm = async (data: { name: string; estimatedTime: string }) => {
  const isSuccess = await taskStore.addTask(data);

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

