<template>
  <div class="task-list">
    <Task v-for="task in tasks" :key="task.id" :task="task" 
      @toggle="toggleTask" />
  </div>
</template>

<script setup lang="ts">
import Task from './Task.vue';
import { useTask } from '~/composables/useTask';

const { tasks, toggleTask } = useTask();

</script>

<style>
.task-list {
  display: flex;
  flex-direction: row;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

button {
  background-color: #ef4444 !important;
  color: white !important;
  padding: 0.5rem 1rem !important;
  border: none !important;
  border-radius: 0.375rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: background-color 0.2s !important;
}

button:hover {
  background-color: #dc2626 !important;
}
</style>
