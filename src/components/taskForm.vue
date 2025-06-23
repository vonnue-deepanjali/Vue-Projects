<template>
  <div class="task-form-page__card">
    <h2 class="task-form-page__card-title">{{ title }}</h2>
    <v-form @submit.prevent="onSubmit" ref="formRef" autocomplete="off">
      <div class="task-form-page__card-input">
        <label for="task">Task:</label>
        <input
          id="task"
          v-model="task"
          type="text"
          class="task-form-page__card-custom-input"
          required
        />
      </div>
      <div class="task-form-page__card-input">
        <label for="estimatedTime">Estimate Time:</label>
        <input
          id="estimatedTime"
          v-model="taskEstimatedTime"
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
          :disabled="props.isEdit && !isModified"
        >
          Save
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Task } from "@/type/home";

const props = defineProps<{
  title: string;
  taskData?: Task | null;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: "save", data: Task): void;
  (e: "cancel"): void;
}>();

const task = ref<string>(props.taskData?.name || "");
const taskEstimatedTime = ref<string>(props.taskData?.estimatedTime || "");

const actualName = ref(props.taskData?.name || "");
const actualTime = ref(props.taskData?.estimatedTime || "");

watch(
  () => props.taskData,
  (task) => {
    if (task) {
      task.value = task.name;
      taskEstimatedTime.value = task.estimatedTime;
      actualName.value = task.name;
      actualTime.value = task.estimatedTime;
    }
  },
  { immediate: true }
);

const isModified = computed(() => {
  return task.value !== actualName.value || taskEstimatedTime.value !== actualTime.value;
});

const onSubmit = () => {
  emit("save", {
    name: task.value,
    estimatedTime: taskEstimatedTime.value,
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
