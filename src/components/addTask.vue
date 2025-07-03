<template>
  <TaskForm title="Add New Task!" @save="saveForm" @cancel="cancelForm" />
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
import { useTaskStore } from "@/stores/task";
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
