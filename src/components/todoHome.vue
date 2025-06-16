<template>
  <div
    class="d-flex align-center justify-center fill-height"
    style="background-color: #a259ff; min-height: 100vh"
  >
    <div class="pa-6 rounded-xl" style="background-color: #1e1e2f; width: 100%; max-width: 400px">
      <h2 class="text-center text-white mb-6">Get Things Done!</h2>

      <div class="d-flex justify-center mb-6">
        <v-btn
          class="px-4 py-2"
          color="#a259ff"
          to="/task"
          style="text-decoration: none; color: white; font-size: 16px"
        >
          + New Task
        </v-btn>
      </div>

      <div
        v-for="task in tasks"
        :key="task"
        class="d-flex align-center justify-space-between mb-3 px-4 py-3 rounded"
        style="background-color: #a259ff; color: white"
      >
        <div class="d-flex align-center">
          <input type="checkbox" class="mr-3" />
          <span>{{ task }}</span>
        </div>
        <div class="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="white"
            style="cursor: pointer"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="white"
            style="cursor: pointer"
          >
            <path
              d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
            />
          </svg>
        </div>
      </div>
      <div class="d-flex justify-center mt-6">
        <button
          class="px-4 py-2 rounded"
          style="background-color: #ff4d4d; color: white; border: none"
        >
          Delete All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tasks = ["Go shopping", "eat lunch", "do laundry"];
</script>

<style scoped>
body {
  margin: 0;
}
</style>
