<template>
  <div class="app-container">
    <div class="task-box">
      <h2 class="title">Get Things Done!</h2>

      <div class="btn-wrapper">
        <v-btn class="new-task-btn" to="/task"> + New Task </v-btn>
      </div>

      <div v-for="task in tasks" :key="task" class="task-item">
        <div class="task-content">
          <input type="checkbox" class="task-checkbox" />
          <span>{{ task }}</span>
        </div>
        <div class="task-actions">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
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
            class="icon"
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

      <div class="btn-wrapper mt-6">
        <button class="delete-all-btn">Delete All</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tasks = ["Go shopping", "Eat lunch", "Do laundry"];
</script>

<style scoped>
.app-container {
  background-color: #a259ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-box {
  background-color: #1e1e2f;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  color: white;
  margin-bottom: 24px;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.new-task-btn {
  background-color: #a259ff;
  color: white;
  font-size: 16px;
  text-decoration: none;
}

.task-item {
  background-color: #a259ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 12px 16px;
  border-radius: 8px;
}

.task-content {
  display: flex;
  align-items: center;
}

.task-checkbox {
  margin-right: 12px;
}

.task-actions {
  display: flex;
}

.icon {
  margin-left: 12px;
  cursor: pointer;
}

.delete-all-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
}
</style>
