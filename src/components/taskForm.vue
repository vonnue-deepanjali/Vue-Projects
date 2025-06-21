<template>
  <div class="task-form-page__card">
    <h2 class="task-form-page__card-title">{{ title }}</h2>
    <v-form @submit.prevent="onSubmit" ref="formRef">
      <div class="task-form-page__card-input">
        <label for="task">Task:</label>
        <input
          id="task"
          v-model="localTask"
          type="text"
          class="task-form-page__card-custom-input"
          required
        />
      </div>
      <div class="task-form-page__card-input">
        <label for="estimatedTime">Estimate Time:</label>
        <input
          id="estimatedTime"
          v-model="localEstimatedTime"
          type="text"
          class="task-form-page__card-custom-input"
          required
        />
      </div>
      <div class="task-form-page__card-button">
        <v-btn
          class="task-form-page__card-custom-button task-form-page__card-cancel-button"
          @click="onCancel"
          type="button"
        >
          Cancel
        </v-btn>
        <v-btn
          class="task-form-page__card-custom-button task-form-page__card-save-button"
          type="submit"
        >
          Save
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Task } from "@/type/home";

const props = defineProps<{
  title: string;
  taskData?: Task | null;
}>();

const emit = defineEmits<{
  (e: "save", data: Task): void;
  (e: "cancel"): void;
}>();

const localTask = ref<string>(props.taskData?.name || "");
const localEstimatedTime = ref<string>(props.taskData?.estimatedTime || "");

watch(
  () => props.taskData,
  (task) => {
    if (task) {
      localTask.value = task.name;
      localEstimatedTime.value = task.estimatedTime;
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  emit("save", {
    name: localTask.value,
    estimatedTime: localEstimatedTime.value,
  });
};

const onCancel = () => emit("cancel");
</script>

<style lang="scss" scoped>
.task-form-page__card {
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

    &label {
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
</style>
