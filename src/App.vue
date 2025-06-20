<template>
  <div class="back">
    <RouterView />
  </div>


</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
  .back{
    background-color: #a259ff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }
</style>