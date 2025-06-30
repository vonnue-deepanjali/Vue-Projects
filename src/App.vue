<template>
  <div class="todo-app_container">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.todo-app_container{
  background-color: #a259ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
