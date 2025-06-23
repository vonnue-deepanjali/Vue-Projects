<template>
  <div class="home-page__card">
    <h2 class="home-page__card-title">Get Things Done!</h2>
    <div class="home-page__card-button-wrapper">
      <v-btn class="home-page__card-button" to="/task">+ New Task</v-btn>
    </div>
    <div v-for="task in tasks" :key="task.id" class="home-page__card-items">
      <div class="home-page__card-contents">
        <v-checkbox
          type="checkbox"
          class="home-page__card-checkbox"
          v-model="task.completed"
          @change="taskCompleted(task)"
        />
        <span :class="{ completed: task.completed }"
          >{{ task.name }} | {{ task.estimatedTime }}</span
        >
      </div>
      <div class="home-page__card-edit-delete-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="home-page__card-icon"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="home-page__card-icon"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
          />
        </svg>
      </div>
    </div>
    <div class="home-page__card-button-wrapper mt-6">
      <v-btn class="home-page__card-delete-button">Delete All</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Task from "../type/home";

const tasks = ref<Task[]>([]);
const taskStore = useTaskStore();

onMounted(async () => {
  const res = await fetch("http://localhost:7000/tasks");
  tasks.value = await res.json();
});

const taskCompleted = async (task: Task) => {
  await taskStore.updateCompleted(task);
};
</script>

<style lang="scss" scoped>
.home-page__card {
  background-color: #1e1e2f;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;

  &-title {
    text-align: center;
    color: white;
    margin-bottom: 24px;
  }

  &-button-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  &-button {
    background-color: #a259ff;
    color: white;
    font-size: 16px;
    text-decoration: none;
  }

  &-items {
    background-color: #a259ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 12px 16px;
    border-radius: 8px;
  }

  &-contents {
    display: flex;
    align-items: center;
  }

  &-checkbox {
    margin-right: 12px;
  }

  &-edit-delete-svg {
    display: flex;
  }

  &-icon {
    margin-left: 12px;
    cursor: pointer;
  }

  &-delete-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
  }
}
.completed {
  text-decoration: line-through;
}

::v-deep(.v-input__details) {
  grid-area: unset !important;
}

::v-deep(.v-checkbox .v-selection-control) {
  min-height: unset !important;
}
</style>
