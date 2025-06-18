<template>
  <div class="add-task-page">
    <div class="add-task-page__card">
      <h2 class="add-task-page__card-title">Add New Task!</h2>
      <v-form @submit.prevent="saveForm" ref="formRef">
        <div class="add-task-page__card-input">
          <label for="task">Task:</label>
          <input
            id="task"
            v-model="task"
            type="text"
            class="add-task-page__card-custom-input"
            required
          />
        </div>
        <div class="add-task-page__card-input">
          <label for="estimatedTime">Estimate Time:</label>
          <input
            id="estimatedTime"
            v-model="estimatedTime"
            type="text"
            class="add-task-page__card-custom-input"
            required
          />
        </div>
        <div class="add-task-page__card-button">
          <v-btn
            class="add-task-page__card-custom-button add-task-page__card-cancel-button"
            @click="cancelForm"
            type="button"
            >Cancel</v-btn
          >
          <v-btn
            class="add-task-page__card-custom-button add-task-page__card-save-button"
            type="submit"
            >Save</v-btn
          >
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TaskData from "@/type/task";

const task = ref<string>("");
const estimatedTime = ref<string>("");
const formRef = ref<HTMLFormElement | null>(null);

const cancelForm = (): void => {
  task.value = "";
  estimatedTime.value = "";
};

const saveForm = async (): Promise<void> => {
  const taskData: TaskData = {
    name: task.value,
    estimatedTime: estimatedTime.value,
  };

  try {
    const res = await fetch("http://localhost:7000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (res.ok) {
      alert("Task saved successfully");
      cancelForm();
    } else {
      const error = await res.json();
      alert(error.message || "Failed to save task");
    }
  } catch (error: any) {
    alert(`Error saving task: ${error.message}`);
  }
};
</script>

<style lang="scss" scoped>
.add-task-page {
  background-color: #a259ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    background-color: #1e1e2f;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    color: white;
    border-radius: 16px;

    &-title {
      text-align: center;
      color: white;
      margin-bottom: 24px;
    }

    &-input {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      &label{
        margin-bottom: 6px;
        font-size: 14px;
        color: #ffffff;
      }
    }

    &-custom-input {
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      background-color: #2e2e3f;
      color: white;
      font-size: 14px;

      &:focus {
        outline: 2px solid #a259ff;
      }
    }

    &-button {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    &-custom-button {
      min-width: 100px;
      color: white;
      text-transform: none;
      font-weight: 500;
    }

    &-cancel-button {
      background-color: #555;
    }

    &-save-button {
      background-color: #a259ff;
    }
  }
}
</style>
