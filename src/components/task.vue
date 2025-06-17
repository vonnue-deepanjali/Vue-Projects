<template>
  <div class="task-container">
    <div class="task-box">
      <h2 class="title">Add New Task!</h2>
      <v-form @submit.prevent="saveForm" ref="formRef">
        <div class="input-group">
          <label for="task">Task:</label>
          <input id="task" v-model="task" type="text" class="custom-input" required />
        </div>
        <div class="input-group">
          <label for="taskId">ID:</label>
          <input id="taskId" v-model="taskId" type="text" class="custom-input" required />
        </div>
        <div class="button-group">
          <v-btn class="custom-btn cancel-btn" @click="cancelForm" type="button">Cancel</v-btn>
          <v-btn class="custom-btn save-btn" type="submit">Save</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const task = ref("");
const taskId = ref("");
const formRef = ref(null);

const cancelForm = () => {
  task.value = "";
  taskId.value = "";
};

const saveForm = async () => {
  const taskData = {
    id: taskId.value,
    name: task.value,
  };

  try {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    task.value = "";
    taskId.value = "";

    alert("Task saved!");
  } catch (err) {
    console.error("Error saving task:", err);
    alert("Failed to save task");
  }
};
</script>

<style scoped>
.task-container {
  background-color: #a259ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.task-box {
  background-color: #1e1e2f;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  color: white;
  border-radius: 16px;
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.input-group label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #ffffff;
}
.custom-input {
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background-color: #2e2e3f;
  color: white;
  font-size: 14px;
}
.custom-input:focus {
  outline: 2px solid #a259ff;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.custom-btn {
  min-width: 100px;
  color: white;
  text-transform: none;
  font-weight: 500;
}
.cancel-btn {
  background-color: #555;
}
.save-btn {
  background-color: #a259ff;
}
.title {
  text-align: center;
  color: white;
  margin-bottom: 24px;
}
</style>